import React, {useState, useEffect} from 'react'
import Title from '../../common/Title'
import GuestDetailItem from './GuestDetailItem'
import { db } from "../../firebase";

// detailのデータを取得するコンポーネント

const GuestDetail = (props) => {
    // idを前ページから受け取る。
    const myId = props.location.state.myId;
    const mynickname = props.location.state.mynickname;
    const mypic = props.location.state.mypic;
    const escortId = props.location.state.escortId;

    const [request, setRequest] = useState([
      {
        id: "",
        guest_id: "",
        volunteer_id: "",
        rikkouho_id: "",
        es_date: "",
        start_time: "",
        departure: "",
        destination:"",
        number:"",
        lan_1:"",
        lan_2:"",
        lan_3:"",
        status: "",
        status_2: "",
        emergency: "",
        picture: "",
        nickname: "",
      },
      ]);

    // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
    useEffect(() => {
      const firebaseData = db
          .collection("escorts")
          .doc(escortId)
          .onSnapshot((snapshot) =>
              setRequest(
                {
                  // firebaseから読み込んだデータをdocに入れて、
                  // 各プロパティに入れて、postを更新
                  id:snapshot.id,
                  guest_id: snapshot.data().guest_id,
                  volunteer_id: snapshot.data().volunteer_id,
                  rikkouho_id: snapshot.data().rikkouho_id,
                  es_date: snapshot.data().es_date,
                  start_time: snapshot.data().start_time,
                  departure: snapshot.data().departure,
                  destination:snapshot.data().destination,
                  number:snapshot.data().number,
                  lan_1:snapshot.data().lan_1,
                  lan_2:snapshot.data().lan_2,
                  lan_3:snapshot.data().lan_3,
                  status: snapshot.data().status,
                  status_2: snapshot.data().status_2,
                  emergency: snapshot.data().emergency,
                  picture: snapshot.data().volunteer_pic,
                  nickname: snapshot.data().volunteer_nickname,
                }
              )
            );
            console.log(request);
      //   クリーンアップ関数（前回の処理を削除する処理らしい）
      return () => {
          firebaseData();
          };
      }, []); 

    return (
        <>
        <Title title="詳細" history={props.history}/>        
            {/* // itemコンポーネントに各プロパティを渡す */}
            <GuestDetailItem
                key={request.id}
                id={request.id}
                picture={request.picture}
                nickname= {request.nickname}
                rikkouho_id={request.rikkouho_id}
                guest_id={request.guest_id}
                volunteer_id={request.volunteer_id}
                es_date= {request.es_date}
                start_time= {request.start_time}
                departure= {request.departure}
                departure_lat={request.departure_lat}
                departure_lon={request.departure_lon}
                destination={request.destination}
                destination_lat={request.destination_lat}
                destination_lon={request.destination_lon}
                number={request.number}                
                lan_1={request.lan_1}
                lan_2={request.lan_2}
                lan_3={request.lan_3}
                status= {request.status}
                status_2={request.status_2}
                emergency={request.emergency}
                history={props.history}
                myId={myId}
                mynickname={mynickname}
                mypic={mypic}
            />
            
        </>
    )
}

export default GuestDetail
