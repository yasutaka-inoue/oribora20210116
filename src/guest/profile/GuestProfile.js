import React, {useState, useEffect} from 'react'
import Title from '../../common/Title'
import ProfileItem from './ProfileItem'
import { db } from "../../firebase";

// 自分の自己紹介を編集するページ。
// profilesからmyidにuser_idが一致するものを取得

const GuestProfile = ({myId, history}) => {
    // firebaseに作成した項目を受け取るための変数＝useState
    const [profile, setProfile] = useState([
        {
            id: "",
            user_id: "",
            nickname:"",
            user_flg: "",
            picture: "",
            description: "",
            account: "",
            created_at: null,
            updated_at: null,
        },
        ]);

    // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
    useEffect(() => {
      const firebaseData = db
          .collection("profiles")
          .where("user_id", "==", myId)
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
                  account: doc.data().account,
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
      
        <>
        <Title title="自己紹介" history={history}/>

        {profile.map((item) => (
        <ProfileItem
            key={item.id}
            id={item.id}
            nickname={item.nickname}
            picture={item.picture}
            account={item.account}
            description={item.description}
            updated_at={item.updated_at}
            created_at={item.created_at}
            user_id={item.user_id}
            />
            ))}
        </>
    )
}

export default GuestProfile
