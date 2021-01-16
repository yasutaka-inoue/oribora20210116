import React from 'react'
import Title from '../common/Title'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin:{
        marginBottom: 70,
    },
  }));

const ForumItem = (props) => {
    const classes = useStyles();
        // escort_idを前ページから受け取る。
        const escortId = props.location.state.escortId;
        const myId= props.location.state.myId;

        console.log(escortId);
        console.log(myId);
        
    return (
        <div>
            <Title title="掲示板" history={props.history}/>
            <div className={classes.margin}></div>
            ここに掲示板が表示される
        </div>
    )
}

export default ForumItem
