import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { TimePicker, DatePicker } from '@material-ui/pickers';

enum ModalMode {
  'edit',
  'create',
}

interface ModalProps {
  onCloseModal: () => void;
  onSuccessModal: () => void;
  handleChangeModal: (value: any, name: string) => void;
  showModal: boolean;
  mode?: ModalMode;
  title?: string;
  startTime?: string;
  date?: string;
  endTime?: string;
  color?: string;
}

const Modal: React.SFC<ModalProps> = ({
  showModal,
  onCloseModal,
  onSuccessModal,
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
      <DialogTitle id="form-dialog-title">{title ? title : 'New Event'}</DialogTitle>
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
                handleChangeModal(e.target.value, 'activeEventTitle');
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
              value={startTime}
              onChange={(time) => {
                handleChangeModal(time, 'activeEventEndTime');
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSuccessModal} color="primary">
          Save
        </Button>
        <Button onClick={onCloseModal} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
