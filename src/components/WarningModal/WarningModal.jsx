import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function Warning() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button 
      sx={{
        padding: '10px 30px',
        border: 'none' ,
        margin: '0 10px' ,
        borderadius: '15px' ,
        backgroundColor: '#fd7c06',
        color: 'white',
      }} 
      onClick={handleOpen}>Publish</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Warning: 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please double check the content before publishing
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}