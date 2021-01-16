import React, {useState, useEffect} from 'react'
import Title from '../../common/Title'
import ProfileItem from './ProfileItem'
import Review from './Review'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { db } from "../../firebase";

// 自分の自己紹介を編集するページ。
// profilesの情報とevaluatesの情報を取得して表示させる
// style
const useStyles = makeStyles((theme) => ({
  reviewarea:{
      backgroundColor: "#f5f5f5",
      width: "100%",
  },
  box: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 500,
  },
}));

const Profile = ({myId, history}) => {
  const classes = useStyles();
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
        <div className={classes.reviewarea}>
          <div className={classes.box}>
            <Typography variant="subtitle1" display="block">
            ■レビュー
            </Typography>

            <Review
            myId={myId}
            /> 
          </div>
        </div>
    
        </>
    )
}

export default Profile
