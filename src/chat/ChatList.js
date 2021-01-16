import React from 'react'
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

// チャットの一覧。
// chatsの中からescorts_idのデータを取得。日付順に並べて、nicknameとcommentと日付、アイコンを一緒に表示させる

// const chats =[
//     {
//      id: 0,
//      escorts_id: 1,
//      user_id: "aaa",
//      date: "2021/07/21 13:00",
//      already_read: 1,
//      comment:"Im so excited to see you, dude!",
//     },
//     {
//      id: 1,
//      escorts_id: 1,
//      user_id: "aaa",
//      date: "2021/07/21 13:00",
//      already_read: 0,
//      comment:"hahaha",
//     },
//     {
//      id: 2,
//      escorts_id: 3,
//      user_id: "aaa",
//      date: "2021/07/23",
//      already_read: 0,
//      comment:"Im so excited to see you, dude!aaaaaaaaaaaaaaaa",
//     },
//     {
//      id: 3,
//      escorts_id: 4,
//      user_id: "aaa",
//      date: "2021/07/24",
//      already_read: 0,
//      comment:"Ok see you later.",
//     },
//     {
//      id: 4,
//      escorts_id: 5,
//      user_id: "aaa",
//      date: "2021/07/25",
//      already_read: 0,
//      comment:"頑張ります！",
//     },
//     {
//      id: 5,
//      escorts_id: 3,
//      user_id: "bbb",
//      date: "2021/07/25",
//      already_read: 0,
//      comment:"Im so excited to see you, dude!",
//     },

// ];

// style
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: theme.palette.background.paper,
        margin: "0 auto",
      },
  }));

const ChatList = ({myId, history}) => {
    const classes = useStyles();

    // dbの中からuser_idがmyIdに一致するものを取得
    // const filtered = chats.filter((filtereditem) => (filtereditem.user_id === myId));

    return (
        <div>
        <List className={classes.root}>
            工事中
        {/* requestの中身をrequestItemに入れて表示処理 */}
        {/* {filtered.map((item) => (
            // requestItemコンポーネントに各プロパティを渡す
            <ChatItem
                key={item.id}
                id={item.id}
                escorts_id={item.escorts_id}
                notice={item.notice}
                date={item.date}
                already_read={item.already_read ===0 ? ("colored"):("")}
                icon={item.icon}
                history={props.history}
                myId={myId}
            />
            ))} */}
        </List> 
        </div>
    )
}

export default ChatList
