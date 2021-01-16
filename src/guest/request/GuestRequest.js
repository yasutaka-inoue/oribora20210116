import React , {useState, useEffect} from 'react'
import Title from '../../common/Title'
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Button, Fade, Modal, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';
import ModalItem from "../../common/ModalItem";
import { db } from "../../firebase";
import firebase from "firebase/app";

// style
const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
        position: "relative",
      },
    margin:{
        marginBottom: 70,
    },
    area:{
      marginBottom:20,
    },
    input:{
      display: "block",
      minWidth: 150,
    },
    select:{
      paddingLeft: 30,
      minWidth: 150,
    },
    labelarea:{
      backgroundColor: "#f5f5f5",
      width: "100%",
      lineHeight: "40px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  }));


const GuestRequest = ({myId, mynickname, mypic, history}) => {
    const classes = useStyles();
    // 日時ラジオボタンを監視
    const [esdate, setEsdate] = useState('');

    // 日セレクトボックスの中身を監視
    const [date, setDate] = useState('');
    // dbに入れるのはnewDateの方。
    const [newDate, setNewDate] = useState('');

    // 時間セレクトボックスの中身を監視
    const [time, setTime] = useState(''); 

    // 日時指定のdisableを管理
    const [disabled, setDisabled] = useState(false); 

    //人数を管理
    const [number, setNumber] = useState(''); 

    // 言語選択を管理
    const [language1, setLanguage1] = useState('');
    const [language2, setLanguage2] = useState('');
    const [language3, setLanguage3] = useState('');

    // 出発地点を管理
    const [departure, setDeparture] = useState(''); 

    // 出発地点を管理
    const [destination, setDestination] = useState(''); 

    // modal
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState([{id: "",},]);
    useEffect(() => {
      const firebaseData = db
          .collection("users")
          .where("user_flg", "==", "1")
          .onSnapshot((snapshot) =>
              setUser(
                snapshot.docs.map((doc) => ({
                  // firebaseから読み込んだデータをdocに入れて、
                  // 各プロパティに入れて、postを更新
                  id: doc.id,
                }))
              )
            );
      //   クリーンアップ関数（前回の処理を削除する処理らしい）
      return () => {
          firebaseData();
          };
      }, []);

  // 日セレクトの中身を取得
  const handleDateChange=(e)=>{
    // -を/に変える処理を入れる
    var str = e.target.value;
    var newstr = str.replace(/-/g, "/");
    setDate(e.target.value);
    setNewDate(newstr);
  };

  // 日時ラジオボックスの中身を取得
  const handleEsdate = (e) => {
    setEsdate(e.target.value);
    if(e.target.value === "今すぐ" )
    {setDisabled(true)};
    if(e.target.value !== "今すぐ" )
    {setDisabled(false)};
  };

  //登録処理
  const handleSubmit=()=>{
    // 送信した内容が届いているか確認
    // console.log(esdate, "日程");
    // console.log(newDate, "日にち");
    // console.log(time, "時間");
    // console.log(number, "人数");
    // console.log(language1, "言語1");
    // console.log(language2, "言語2");
    // console.log(language3, "言語3");
    // console.log(departure, "出発");
    // console.log(destination, "目的地");
    const id =db.collection('escorts').doc().id;
  // dbに入れる処理を書く
  if(esdate==="今すぐ"){
    db.collection("escorts").doc(id).set({
      guest_id: myId,
      es_date: esdate,
      departure: departure,
      destination: destination,
      number: number,
      lan_1: language1,
      lan_2: language2,
      lan_3: language3,
      status: "募集中",
      emergency: 1,
      guest_nickname: mynickname,
      guest_pic: mypic,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // 全てのvolのnoticesに入れる
      user.map((item) => (
          db.collection("notices").add({
              escort_id: id,
              user_id: item.id,
              icon: 4,
              notice: `${mynickname}さんがリアルタイムリクエストを出しました！`,
              already_read: 0,
              created_at: firebase.firestore.FieldValue.serverTimestamp(),
            })
            ));
      }
  if(esdate==="その他"){
    db.collection("escorts").doc(id).set({
      guest_id: myId,
      es_date: newDate,
      start_time: time,
      departure: departure,
      destination: destination,
      number: number,
      lan_1: language1,
      lan_2: language2,
      lan_3: language3,
      status: "募集中",
      emergency: 0,
      guest_nickname: mynickname,
      guest_pic: mypic,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  setEsdate("");
  setDate("");
  setNewDate("");
  setTime("");
  setNumber("");
  setDestination("");
  setDeparture("");
  setLanguage1("");
  setLanguage2("");
  setLanguage3("");
  setDisabled(false);
  setOpen(false);
  // 詳細に遷移させる
  history.push({
    // detailに遷移。idを渡す。
    pathname: '/guest/detail',
    state: { escortId: id ,
             myId: myId,
             mynickname: mynickname,
             mypic: mypic}
  });
};

const handleClose = () => {
  setOpen(false);
};
const handleOpen = (e) => {
  // 画面が遷移しないようにpreventDefault
  e.preventDefault();
  setOpen(true);
};

    return (
        <>
        <Title title="リクエスト" history={history}/>
        <div className={classes.margin}></div>
        <div className={classes.box}>
        <form onSubmit={handleOpen}>
          <div className={classes.area}>
          <Typography variant="subtitle1" display="block" className={classes.labelarea}>
           日時
          </Typography>
          <FormControl component="fieldset" className={classes.input}>
            <RadioGroup aria-label="time" name="time" value={esdate} onChange={handleEsdate}>
              <FormControlLabel value="今すぐ" control={<Radio color="primary"/>} label="今すぐリクエスト"/>
              <FormControlLabel value="その他" control={<Radio color="primary"/>} label="出発日時を指定してリクエスト" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.select}>
            <TextField 
                type="date"
                label="日程"
                value={date}
                onChange={handleDateChange}
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={disabled}
                />
              <TextField 
                type="time"
                label="時間"
                value={time}
                required
                margin="normal"
                onChange={e => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                disabled={disabled}
              />
          </FormControl>
          </div>

          <div className={classes.area}>
          <Typography variant="subtitle1" display="block" className={classes.labelarea}>
            基本情報
          </Typography>
            <FormControl component="fieldset" className={classes.input}>
              <TextField
                label="人数"
                type="number"
                required
                value={number}
                onChange={e => setNumber(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl component="fieldset" className={classes.input}>
              <InputLabel shrink id="language" required>
                言語1
              </InputLabel>
              <Select
                labelId="language1"
                id="language1"
                value={language1}
                onChange={e => setLanguage1(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>使える言語を選択してください</em>
                </MenuItem>
                <MenuItem value="英語">英語</MenuItem>
                <MenuItem value="中国語">中国語</MenuItem>
                <MenuItem value="フランス語">フランス語</MenuItem>
              </Select>
              </FormControl>
              <FormControl component="fieldset" className={classes.input}>
              <InputLabel shrink id="language2">
                言語2
              </InputLabel>
              <Select
                labelId="language2"
                id="language2"
                value={language2}
                onChange={e => setLanguage2(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>使える言語を選択してください</em>
                </MenuItem>
                <MenuItem value="英語">英語</MenuItem>
                <MenuItem value="中国語">中国語</MenuItem>
                <MenuItem value="フランス語">フランス語</MenuItem>
              </Select>
              </FormControl>
              <FormControl component="fieldset" className={classes.input}>
              <InputLabel shrink id="language3">
                言語3
              </InputLabel>
              <Select
                labelId="language3"
                id="language3"
                value={language3}
                onChange={e => setLanguage3(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>使える言語を選択してください</em>
                </MenuItem>
                <MenuItem value="英語">英語</MenuItem>
                <MenuItem value="中国語">中国語</MenuItem>
                <MenuItem value="フランス語">フランス語</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={classes.area}>
            <Typography variant="subtitle1" display="block" className={classes.labelarea}>
            出発地点
            </Typography>
            <FormControl component="fieldset" >
            <TextField
                label="出発地点"
                value={departure}
                onChange={e => setDeparture(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                />
          </FormControl>
          </div>

          <div className={classes.area}>
            <Typography variant="subtitle1" display="block" className={classes.labelarea}>
            目的地
            </Typography>
            <TextField
                label="目的地"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                />
          </div>

              <Button variant="contained" color="primary" className={classes.button} type="submit">リクエスト送信</Button>
              </form>        
        </div>

        {/* modal */}
        <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
              timeout: 500,
              }}
            >
        <Fade in={open}>
        <ModalItem
          title="リクエスト確認"
          text="この内容でリクエストしますか？"
          buttonText="リクエストする"
          handleClose={handleClose}
          onSubmit={handleSubmit}
          />
        </Fade>
        </Modal>
        </>

    )
}

export default GuestRequest
