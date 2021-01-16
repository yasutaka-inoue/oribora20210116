import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import "../../style.css";

const useStyles = makeStyles((theme) => ({
      image: {
        width: "600",
        height: "100",
        paddingTop: 10,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      subtitle:{
        paddingTop: 8,
      },
      text:{
        margin: "0 auto",
        maxWidth: "600px",
      },
  }));
const Coverimage = ({title, text, src, alt, color}) => {
    const classes = useStyles();
    return (
        <>
        <div className={classes.text}>
        <Typography variant="h6" className={classes.subtitle}>{title}</Typography>
        <div className={color}></div>
        <Typography variant="body2" >{text}</Typography>
        </div>
        <div className={classes.image}>
            <img src={src} alt={alt} className={classes.img}/>
        </div>
        </>
    )
}

export default Coverimage

