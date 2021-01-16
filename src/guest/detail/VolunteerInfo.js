import React, {useState, useEffect} from 'react'
import Title from '../../common/Title'
import VolunteerInfoItem from './VolunteerInfoItem'
import Review from '../../volunteer/profile/Review'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { db } from "../../firebase";

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

const VolunteerInfo = (props) => {
    const classes = useStyles();
    // volunteer_idを前ページから受け取る。
    const volunteerId = props.location.state.volunteerId;

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

    // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
    useEffect(() => {
      const firebaseData = db
          .collection("profiles")
          .where("user_id", "==", volunteerId)
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
            <Title title="ボランティアの自己紹介ページ" history={props.history}/>
            {/* guestinfoの中身をitemに入れて表示処理 */}
            {profile.map((item) => (
            // GuestInfoItemコンポーネントに各プロパティを渡す
            <VolunteerInfoItem
            key={item.id}
            id={item.id}
            nickname={item.nickname}
            picture={item.picture}
            account={item.account}
            description={item.description}
            created_at={item.created_at}
            updated_at={item.updated_at}
            />
            ))}
          <div className={classes.reviewarea}>
          <div className={classes.box}>
            <Typography variant="subtitle1" display="block">
            ■レビュー
            </Typography>
            <Review
            myId={volunteerId}
            /> 
          </div>
        </div>
        </div>
    )
}

export default VolunteerInfo
