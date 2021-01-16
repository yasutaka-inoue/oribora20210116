import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

// style
const useStyles = makeStyles((theme) => ({
    title: {
        bottom: 'auto',
        top: 0,
        boxShadow: "none",
      },
      root: {
        flexGrow: 1,
      },
      text:{
        flexGrow: 1,
      },
  }));

const TitleOffline = ({title}) => {
    const classes = useStyles();

    return (
        <>
        <div className={classes.root}>
        <AppBar position="fixed" color="primary" className={classes.title}>
        <Toolbar>
            <Typography variant="h6" className={classes.text}>
                 {title}
            </Typography>
        </Toolbar>
        </AppBar>
        </div>
        </>
    )
}

export default TitleOffline
