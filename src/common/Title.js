import React,{useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from "../firebase";

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

const Title = ({title, history}) => {
    const classes = useStyles();

    useEffect(() => {
        // onAuthStateChanged→何らかのユーザー認証変化があったら実行される
        // その際に[user]内に格納される＝空だったら何も起こらない→つまりログインされていない状態
        const unSub = auth.onAuthStateChanged((user) => {
          // !user = falseとなる、つまりユーザーがログインしていない状態の時はログインページに飛ばす
          !user && history.push("/");
        });
        return () => unSub();
      });    

    return (
        <>
        <div className={classes.root}>
        <AppBar position="fixed" color="primary" className={classes.title}>
        <Toolbar>
            <Typography variant="h6" className={classes.text}>
                 {title}
            </Typography>
            <IconButton color="inherit" edge="end" 
                onClick={async () => {
                    try {
                    await auth.signOut();
                    history.push("/");
                    } catch (error) {
                    alert(error.message);
                    }
                }}>
            <ExitToAppIcon />
            </IconButton>
        </Toolbar>
        </AppBar>
        </div>
        </>
    )
}

export default Title
