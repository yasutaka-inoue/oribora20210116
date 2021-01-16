import React from 'react'
import { Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';


// const notices =[
//     {
//      id: 0,
//      escorts_id: 1,
//      user_id: "aaa",
//      notice:"Tomさんがあなたをボランティアに選びました！",
//      date: "2021/07/25",
//      already_read: 0,
//      icon:0,
//     },
//     {
//      id: 1,
//      escorts_id: 2,
//      user_id: "aaa",
//      notice:"Bobさんのボランティアに選ばれませんでした。",
//      date: "2021/07/24",
//      already_read: 1,
//      icon:1,
//     },
// ];


const NoticeBudge = ({myId}) => {
    // const [invisibleNotice, setInvisibleNotice] = useState(true);

    // データ取得
    // noticesの中にあるuser_idがmyIdと一致するものの中で、already_readが0のものがある場合
    // const filtered = notices.filter((filtereditem) => (filtereditem.user_id === myId));
    // const unread = filtered.filter((item) => (item.already_read === 0));

    // budgeがつく条件を書く


    return (
        <>
            <Badge variant="dot" color="secondary" invisible >
                  <NotificationsIcon />
            </Badge>
        </>
    )
}

export default NoticeBudge
