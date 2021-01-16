import React from 'react'
import Title from '../common/Title'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin:{
        marginBottom: 70,
    },
  }));

const ChatItem = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Title title="個別チャット" history={props.history}/>
            <div className={classes.margin}></div>
            ここにチャットが入る
        </div>
    )
}

export default ChatItem
