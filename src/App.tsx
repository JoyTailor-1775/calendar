import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import './App.scss';

import Modal from './components/Modal';
import uniqueId from './helpers/uniqueId';

import ModalMode from './interfaces/ModalMode';

interface BaseCalendarState {
  calendarEvents: EventInput[];
  showEventModal: boolean;
  modalMode: ModalMode;
}

interface ActiveEventState {
  activeEventId: number;
  activeEventTitle: string;
  activeEventStartTime: Date | string;
  activeEventDate: Date | string;
  activeEventEndTime: Date | string;
  activeEventColor: string;
}

interface CalendarState extends BaseCalendarState, ActiveEventState {}

const INITIAL_ACTIVE_EVENT_STATE: Readonly<ActiveEventState> = Object.freeze({
  activeEventId: 0,
  activeEventTitle: '',
  activeEventStartTime: new Date(),
  activeEventEndTime: new Date(),
  activeEventDate: new Date(),
  activeEventColor: '#3788d8',
});

export default class Calendar extends React.Component<{}, CalendarState> {
  calendarComponentRef = React.createRef<FullCalendar>();

  constructor(props: {}) {
    super(props);

    this.state = {
      calendarEvents: [],
      showEventModal: false,
      modalMode: ModalMode.CREATE,
      ...INITIAL_ACTIVE_EVENT_STATE,
    };
  }

  handleModalFieldChange = (val: string | Date, name: string) => {
    if (name === 'activeEventDate') {
      this.setState({ activeEventEndTime: val, activeEventStartTime: val });
    }
    this.setState((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  addEvent = () => {
    const evtObj = {
      id: uniqueId(),
      title: this.state.activeEventTitle,
      start: this.state.activeEventStartTime,
      end: this.state.activeEventEndTime,
      backgroundColor: this.state.activeEventColor,
    };
    this.setState({ calendarEvents: this.state.calendarEvents.concat(evtObj) });
  };

  deleteEvent = async () => {
    const evt = this.state.calendarEvents.find((el) => el.id === this.state.activeEventId);
    const newArr = this.state.calendarEvents.filter((el) => el.id !== evt!.id);
    await this.setState({ calendarEvents: newArr });
  };

  editEvent = async () => {
    const evtObj = {
      id: this.state.activeEventId,
      title: this.state.activeEventTitle,
      start: this.state.activeEventStartTime,
      end: this.state.activeEventEndTime,
      color: this.state.activeEventColor,
    };
    await this.deleteEvent();
    this.setState({ calendarEvents: this.state.calendarEvents.concat(evtObj) });
  };

  clearActiveEventState = () => {
    this.setState((prevState) => ({
      ...prevState,
      ...INITIAL_ACTIVE_EVENT_STATE,
    }));
  };

  closeModal = () => {
    this.setState({ showEventModal: false });
  };

  showModal = () => {
    this.setState({ showEventModal: true });
  };

  submitModal = () => {
    if (this.state.modalMode === ModalMode.EDIT) {
      this.editEvent();
      this.closeModal();
      this.clearActiveEventState();
      return;
    }
    this.addEvent();
    this.closeModal();
    this.clearActiveEventState();
  };

  submitDeleteModal = () => {
    this.closeModal();
    this.deleteEvent();
    this.clearActiveEventState();
  };

  handleDateClick = (arg: any) => {
    this.setState({
      modalMode: ModalMode.CREATE,
      activeEventDate: arg.date,
      activeEventStartTime: arg.date,
      activeEventEndTime: arg.date,
    });
    this.showModal();
  };

  handleEventClick = (evtObj: any) => {
    const { title, start, end, id, backgroundColor } = evtObj.event;
    this.setState({
      modalMode: ModalMode.EDIT,
      activeEventId: id,
      activeEventTitle: title,
      activeEventDate: start,
      activeEventStartTime: start,
      activeEventEndTime: end,
      activeEventColor: backgroundColor,
    });
    this.showModal();
  };

  render() {
    return (
      <main className="main">
        <FullCalendar
          defaultView="dayGridMonth"
          height={900}
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={this.calendarComponentRef}
          events={this.state.calendarEvents}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          editable={true}
        />
        <Modal
          mode={this.state.modalMode}
          showModal={this.state.showEventModal}
          title={this.state.activeEventTitle}
          startTime={this.state.activeEventStartTime}
          date={this.state.activeEventDate}
          endTime={this.state.activeEventEndTime}
          color={this.state.activeEventColor}
          onCloseModal={this.closeModal}
          onDelete={this.submitDeleteModal}
          onSuccess={this.submitModal}
          handleChangeModal={this.handleModalFieldChange}
        />
      </main>
    );
  }
}
