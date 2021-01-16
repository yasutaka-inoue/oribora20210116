import React, {useState, useEffect} from 'react'
import Title from '../../common/Title'
import SelectItem from './SelectItem'
import { makeStyles } from '@material-ui/core/styles';
import { db } from "../../firebase";

// style
const useStyles = makeStyles((theme) => ({
    margin:{
        marginBottom: 70,
    },
  }));

const VolunteerSelect = (props) => {
    const classes = useStyles();
    // escort_idと立候補idを前ページから受け取る。
    const escortId = props.location.state.escortId;
    const rikkouho_id= props.location.state.rikkouho_id;
    const mynickname= props.location.state.mynickname;

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

    // 立候補idに入っているidを取得して、profilesからuser_idと一致するものの、nicknameとpictureを取得する。
    // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
        useEffect(() => {
          const firebaseData = db
              .collection("profiles")
              .where("user_id", "in", rikkouho_id)
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
            <Title title="ボランティア選択" history={props.history}/> 
            <div className={classes.margin}></div> 
            {profile &&
              profile.map((item) => (
                <SelectItem
                    key={item.id}
                    id={item.id}
                    picture={item.picture}
                    nickname={item.nickname}
                    user_id={item.user_id}
                    history={props.history}
                    escortId={escortId}
                    mynickname={mynickname}
                />
              ))}
        </div>
    )
}

export default VolunteerSelect
