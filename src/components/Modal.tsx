import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Modal.scss';

import { TimePicker, DatePicker } from '@material-ui/pickers';
import ModalMode from '../interfaces/ModalMode';

interface ModalProps {
  onCloseModal: () => void;
  onSuccess: () => void;
  onDelete: () => void;
  handleChangeModal: (value: any, name: string) => void;
  showModal: boolean;
  mode?: ModalMode;
  title?: string;
  startTime: Date | string;
  date: Date | string;
  endTime: Date | string;
  color: string;
}

const Modal: React.SFC<ModalProps> = ({
  showModal,
  onCloseModal,
  onDelete,
  onSuccess,
  mode,
  title,
  startTime,
  endTime,
  date,
  color,
  handleChangeModal,
}: ModalProps) => {
  return (
    <Dialog open={showModal} onClose={onCloseModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {mode && mode === ModalMode.EDIT ? 'Edit Event' : 'New Event'}
      </DialogTitle>
      <DialogContent style={{ width: 300 }}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Input
              autoFocus
              margin="dense"
              id="title"
              label="Event title"
              type="text"
              name="activeEventTitle"
              value={title}
              onChange={(e) => {
                handleChangeModal(e.target.value.slice(0, 30), 'activeEventTitle');
              }}
            />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              name="activeEventDate"
              value={date}
              onChange={(date) => {
                handleChangeModal(date, 'activeEventDate');
              }}
            />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <TimePicker
              margin="normal"
              id="time-picker=start"
              label="Event start"
              name="activeEventStartTime"
              value={startTime}
              onChange={(time) => {
                handleChangeModal(time, 'activeEventStartTime');
              }}
            />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <TimePicker
              margin="normal"
              id="time-picker-end"
              label="Event end"
              name="activeEventEndTime"
              value={endTime}
              onChange={(time) => {
                const checkedEndTime = time && time <= startTime ? startTime : time;
                handleChangeModal(checkedEndTime, 'activeEventEndTime');
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={3} container direction="row" alignItems="center">
            <label htmlFor="color-input" className="modal__input-label">
              Pick event's color
            </label>
            <input
              id="color-input"
              type="color"
              name="activeEventColor"
              value={color}
              onChange={(evt) => {
                handleChangeModal(evt.target.value, 'activeEventColor');
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSuccess} color="primary">
          Save
        </Button>
        <Button onClick={onDelete} color="secondary">
          Delete
        </Button>
        <Button onClick={onCloseModal} color="default">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
