import React, {useState, useEffect} from 'react'
import { db } from "../../firebase";
import ReviewItem from './ReviewItem'

const Review = ({myId}) => {

      // firebaseに作成した項目を受け取るための変数＝useState
      const [evaluate, setEvaluate] = useState([
        {
            id: "",
            escort_id:"",
            volunteer_id: "",
            guest_id: "",
            evaluate: "",
            comment:"",
            created_at: null,
        },
        ]);
       // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
       useEffect(() => {
        const firebaseData = db
            .collection("evaluates")
            .where("volunteer_id", "==", myId)
            .orderBy("created_at", "asc")
            .onSnapshot((snapshot) =>
                setEvaluate(
                  snapshot.docs.map((doc) => ({
                    // firebaseから読み込んだデータをdocに入れて、
                    // 各プロパティに入れて、postを更新
                    id: doc.id,
                    escort_id:doc.data().escort_id,
                    volunteer_id:doc.data().volunteer_id,
                    guest_id:doc.data().guest_id,
                    evaluate:doc.data().evaluate,
                    comment:doc.data().comment,
                    created_at: doc.data().created_at,
                  }))
                )
              );
        //   クリーンアップ関数（前回の処理を削除する処理らしい）
        return () => {
            firebaseData();
            };
        }, []);

    return (
        <>
            {evaluate && 
                evaluate.map((item) => (
                <ReviewItem
                    key={item.id}
                    id={item.id}
                    evaluate={item.evaluate}
                    comment={item.comment}
                    created_at={item.created_at}
                />
                ))}   
        </>
    )
}

export default Review
