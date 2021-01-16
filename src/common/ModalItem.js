import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
    //   border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
      position: "relative",
    },
    close:{
      color: "gray",
      position: "absolute",
      top: 10,
      right: 10,
    }
  }));

const ModalItem = ({title, text, buttonText, onSubmit, handleClose}) => {
    const classes = useStyles();
    return (
          <div className={classes.paper}>
            <h3 >{title}</h3>
            <p >{text}</p>
            <Button variant="contained" color="primary" size="large" onClick={onSubmit}>
                {buttonText}
            </Button>
            <HighlightOffIcon variant="outlined" size="large" onClick={handleClose} className={classes.close}/>
          </div>
    )
}
 
export default ModalItem
