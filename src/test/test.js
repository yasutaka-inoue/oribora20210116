import React, { useState, useEffect }  from 'react'
import Typography from '@material-ui/core/Typography';
import RequestItem from './RequestItem';
import { makeStyles } from '@material-ui/core/styles';
import { db } from "./firebase";

// リアルタイムリクエストを取得するコンポーネント

// style
const useStyles = makeStyles((theme) => ({
  box: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    subtitle:{
      textAlign: "center",
      paddingBottom: 10,
      
    },
}));

const RealtimeRequest = (props) => {
  const classes = useStyles();
  
  // firebaseに作成した項目を受け取るための変数＝useState
  const [request, setRequest] = useState([
  {
    id:"",
    guest_id:"",
    es_date: "",
    start_time:"",
    end_time: "",
    departure: "",
    destination:"",
    number:"",
    lan_1:"",
    lan_2:"",
    lan_3:"",
    status: "",
    emergency:"",
    picture:"",
    nickname:"",
  },
]);

// firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
useEffect(() => {

  const firebaseData = db
        .collection("escorts")
        // emergencyが１だけ取得
        .where("emergency", "==", 1)
        // // 日付順（関係ないので削除）
        .orderBy("es_date", "asc")
        // 上から３つだけ取得
        .limit(3)
        .onSnapshot((snapshot) =>
            setRequest(
              snapshot.docs.map((doc) => ({
                // firebaseから読み込んだデータをdocに入れて、
                // 各プロパティに入れて、requestを更新
                id: doc.id,
                guest_id: doc.data().guest_id,
                es_date: doc.data().es_date,
                start_time: doc.data().start_time,
                end_time: doc.data().end_time,
                departure: doc.data().departure,
                destination:doc.data().destination,
                number:doc.data().number,
                lan_1:doc.data().lan_1,
                lan_2:doc.data().lan_2,
                lan_3:doc.data().lan_3,
                status:doc.data().status,
                emergency:doc.data().emergency,
              }))
            )
          );
      const firebaseData2 = db
          .collection("users")
          // emergencyが１だけ取得
          .doc(guest_id)
          .onSnapshot((snapshot) =>
              setRequest(
                snapshot.docs.map((doc) => ({
                  // firebaseから読み込んだデータをdocに入れて、
                  // 各プロパティに入れて、requestを更新
                  picture: doc.data().picture,
                  nickname: doc.data().nickname,
                }))
              )
            );
    //   クリーンアップ関数（前回の処理を削除する処理らしい）
    return () => {
        firebaseData();
        };
    }, 
    []);  
    console.log(request);
    
    return (
        <div className={classes.box}>
            <Typography variant="h6" className={classes.subtitle}>リアルタイムリクエスト</Typography>
                {/* requestが あったときだけ、表示処理をする*/}
                { request && (
                <>
                {/* requestの中身をrequestItemに入れて表示処理 */}
                {request.map((emergencyItem) => (
                    // requestItemコンポーネントに各プロパティを渡す
                    <RequestItem
                    key={emergencyItem.id}
                    id={emergencyItem.id}
                    picture={emergencyItem.picture}
                    nickname= {emergencyItem.nickname}
                    es_date= {emergencyItem.es_date}
                    start_time= {emergencyItem.start_time}
                    end_time= {emergencyItem.end_time}
                    departure= {emergencyItem.departure}
                    destination={emergencyItem.destination}
                    number={emergencyItem.number}
                    lan_1={emergencyItem.lan_1}
                    lan_2={emergencyItem.lan_2}
                    lan_3={emergencyItem.lan_3}
                    status= {emergencyItem.status}
                    emergency={emergencyItem.emergency}
                    history={props.history}
                    />
                ))}
                </>
            )}


        </div>
    )
}

export default RealtimeRequest
