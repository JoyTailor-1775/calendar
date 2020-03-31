import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import Modal from './components/Modal';

import './App.scss';

interface BaseCalendarState {
  calendarEvents: EventInput[];
  showEventModal: boolean;
}

interface ActiveEventState {
  activeEventTitle: string;
  activeEventStartTime: string;
  activeEventDate: string;
  activeEventEndTime: string;
  activeEventColor: string;
}

interface CalendarState extends BaseCalendarState, ActiveEventState {}

const INITIAL_ACTIVE_EVENT_STATE: Readonly<ActiveEventState> = Object.freeze({
  activeEventTitle: '',
  activeEventStartTime: '',
  activeEventEndTime: '',
  activeEventDate: '',
  activeEventColor: '#3788d8',
});

export default class Calendar extends React.Component<{}, CalendarState> {
  calendarComponentRef = React.createRef<FullCalendar>();

  constructor(props: {}) {
    super(props);

    this.state = {
      calendarEvents: [
        // initial event data
        { title: 'Event Now', start: new Date() },
      ],
      showEventModal: false,
      activeEventTitle: '',
      activeEventStartTime: '',
      activeEventEndTime: '',
      activeEventDate: '',
      activeEventColor: '#3788d8',
    };
  }

  closeModal = () => {
    this.setState({ showEventModal: false });
  };

  showModal = () => {
    this.setState({ showEventModal: true });
  };

  handleModalFieldChange = (val: string, name: string) => {
    console.log({ val, name });
    this.setState((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  handleDateClick = (arg: any) => {
    console.log(arg);
    const time: string = arg.date.toTimeString();

    console.log({ time });
    this.showModal();
    // this.setState({
    //   // add new event data
    //   calendarEvents: this.state.calendarEvents.concat({
    //     // creates a new array
    //     title: 'New Event',
    //     start: arg.date,
    //     allDay: arg.allDay,
    //   }),
    // });
  };

  handleEventClick = () => {
    console.log('hello!');
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
        />
        <Modal
          showModal={this.state.showEventModal}
          title={this.state.activeEventTitle}
          startTime={this.state.activeEventStartTime}
          date={this.state.activeEventDate}
          endTime={this.state.activeEventEndTime}
          color={this.state.activeEventColor}
          onCloseModal={this.closeModal}
          onSuccessModal={this.closeModal}
          handleChangeModal={this.handleModalFieldChange}
        />
      </main>
    );
  }
}
