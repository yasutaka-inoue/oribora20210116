import React,{useState, useEffect} from "react";
import { db } from "./firebase";

const Userflg = (props) => {
// ログイン時に取得したemailをもとに、user_idを取得
const email = props.location.state.email;
const [user, setUser] = useState([
    {
      id: "",
      user_flg:"",
    },
    ]);

       // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
       useEffect(() => {
        const firebaseData = db
            .collection("users")
            .where("email", "==", email)
            .onSnapshot((snapshot) =>
                setUser(
                  snapshot.docs.map((doc) => ({
                    // firebaseから読み込んだデータをdocに入れて、
                    // 各プロパティに入れて、postを更新
                    id: doc.id,
                    user_flg: doc.data().user_flg,
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
        {/* user_flgが0ならゲストページへ */}
        {user[0].user_flg === "0" && 
        props.history.push({
            pathname: "/guest",
            state: { myId : user[0].id,}
          })
        }

        {/* user_flgが1ならボランティアページへ */}         
        {user[0].user_flg === "1" && 
        props.history.push({
            pathname: "/volunteer",
            state: { myId : user[0].id,}
          })
        }        
        </>
    )
}

export default Userflg;
