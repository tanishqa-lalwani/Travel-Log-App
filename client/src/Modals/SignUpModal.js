import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import Register from '../Register';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({setShowRegister}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setShowRegister(true)
    setOpen(true);
  };

  const handleClose = () => {
    setShowRegister(false)
    setOpen(false);
  };

  React.useEffect(() => {
    handleOpen()
  }, [])

  return (
    <div>
      {/* <Button variant="outlined" style={{borderRadius:'10px',textTransform:'capitalize',fontFamily:'Poppins, sans-serif',border:'1px solid #321E59',color:'#321E59'}} onClick={handleOpen}>
        Sign Up
      </Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
            backdropFilter: 'saturate(180%) blur(10px)',
        }}
      >
        <Fade in={open}>
            <Register setShowRegister={setShowRegister} close = {handleClose}/>
        </Fade>
      </Modal>
    </div>
  );
}