import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateLobbyDialogButton({ onSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    onSubmit(title);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Create Lobby
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='create-lobby-dialog-title'>
        <DialogTitle id='create-lobby-dialog-title'>Create Lobby</DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            onChange={handleInputChange}
            autoFocus
            margin='dense'
            id='title'
            label='Lobby Title'
            type='title'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}