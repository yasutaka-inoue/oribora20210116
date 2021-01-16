import React, {useState, useEffect} from 'react'
import Title from '../../common/Title'
import GuestInfoItem from './GuestInfoItem'
import { db } from "../../firebase";


const GuestInfo = (props) => {
    // guest_idを前ページから受け取る。
    const guestId = props.location.state.guestId;
    // profilesからデータ呼び出し

        // firebaseに作成した項目を受け取るための変数＝useState
        const [profile, setProfile] = useState([
          {
              id: "",
              user_id: "",
              nickname:"",
              user_flg: "",
              picture: "",
              description: "",
              accout: "",
              created_at: null,
              updated_at: null,
          },
          ]);

 // dbからguestIdに一致するuser_idの情報を取得
// firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
     useEffect(() => {
      const firebaseData = db
          .collection("profiles")
          .where("user_id", "==", guestId)
          .onSnapshot((snapshot) =>
              setProfile(
                snapshot.docs.map((doc) => ({
                  // firebaseから読み込んだデータをdocに入れて、
                  // 各プロパティに入れて、postを更新
                  id: doc.id,
                  user_id: doc.data().user_id,
                  nickname: doc.data().nickname,
                  user_flg: doc.data().user_flg,
                  picture: doc.data().picture,
                  description: doc.data().description,
                  accout: doc.data().accout,
                  created_at: doc.data().created_at,
                  updated_at: doc.data().updated_at,
                }))
              )
            );
      //   クリーンアップ関数（前回の処理を削除する処理らしい）
      return () => {
          firebaseData();
          };
      }, []);
    
    return (
        <div>
            <Title title="ゲストの自己紹介ページ" history={props.history}/>
            {/* guestinfoの中身をitemに入れて表示処理 */}
            {profile.map((item) => (
            // GuestInfoItemコンポーネントに各プロパティを渡す
            <GuestInfoItem
            key={item.id}
            nickname={item.nickname}
            picture={item.picture}
            account={item.account}
            description={item.description}
            />
            ))}
        </div>
    )
}

export default GuestInfo
