import React, {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import Img from "../../img/noimage.jpg";
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Button,  FormControl, TextField} from "@material-ui/core";
import { storage, db } from "../../firebase";
import firebase from "firebase/app";

// style
const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
        position: "relative",
      },
    revise:{
        position: "absolute",
        top: 7,
        right: 5,
    },
    image: {
        width: "8rem",
        height: "8rem",
        marginBottom: "10px",
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        cursor: "pointer",
        position: "relative",
        verticalAlign: "middle",
        textAlign: "center",
        display: "table-cell",
        '&:hover': {backgroundColor:'rgba(128,128,128,0.3)'},
      },
    img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: "cover",
      },
    inputFile: {
        display: "none",
      },
    imgIcon:{
        position: "absolute",
        left: 50,
        top: 52,
        color: "white",
      },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    margin:{
        marginBottom: 70,
    },
    reviewarea:{
        backgroundColor: "#f5f5f5",
        width: "100%",
    },
    update:{
        textAlign: "right",
    },
    account:{
        minWidth: 300,
    },
    description:{
        minWidth: "100%",
    },
  }));

const ProfileItem = ({id, user_id, nickname, picture, account, description, updated_at, created_at }) => {
    const classes = useStyles();
    const [request, setRequest] = useState([
      {
        id: "",
      },
      ]);

// 全てを取得
useEffect(() => {
  const firebaseData = db
      .collection("escorts")
      .where("guest_id", "==", user_id)
      .onSnapshot((snapshot) =>
          setRequest(
            snapshot.docs.map((doc) => ({
              // firebaseから読み込んだデータをdocに入れる
              id: doc.id,
            }))
          )
        );
  //   クリーンアップ関数（前回の処理を削除する処理らしい）
  return () => {
      firebaseData();
      };
  }, []);
    // 各項目を監視
    const [newpicture, setNewpicture] = useState(null);
    const [newnickname, setNewnickname] = useState(nickname);
    const [newaccount, setNewaccount] = useState(account);
    const [newdescription, setNewdescription] = useState(description);
    // disableを管理
    const [disabled, setDisabled] = useState(true); 
    const onDisabled = () => {
        setDisabled(false);
      };
    const offDisabled = () => {
        setDisabled(true);
        setNewpicture(null);
        setNewnickname(nickname);
        setNewaccount(account);
        setNewdescription(description);
      };
    
    // 画像の処理
    const onChangeImageHandler = (e) => {
        if (e.target.files[0]) {
          setNewpicture(e.target.files[0]);
          // サムネイル表示処理
          const reader = new FileReader();
          reader.onload = function(e) {
            document.getElementById('thumbnail').setAttribute('src', e.target.result);
          };
          reader.readAsDataURL(e.target.files[0]);
        }
          e.target.value = "";        
      };
    // 登録処理
    const handleSubmit=(e) =>{
        e.preventDefault();
        if(!newaccount){
          setNewaccount(" ");
        }
        if(!newdescription){
          setNewdescription(" ");
        }

        // ここに登録処理を書く
        if(newpicture){
          // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
          // そのためにファイル名をランダムにする必要がある、それが下
          const S =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
          const N = 16; //16文字の文字列を作るという意味 生成したい文字数が１６の文字列になる
          const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
              .map((n) => S[n % S.length])
              .join("");
          const fileName = randomMoji + "_" + newpicture.name;
          // firebase storageに登録
          const uploadImg = storage.ref(`pictures/${fileName}`).put(newpicture);
          
          // firebase dbに登録
          uploadImg.on(
              firebase.storage.TaskEvent.STATE_CHANGED,
              () => {},  //進捗度合
              (err) => {  //エラーの時
                alert(err.message);
              },
              async () => { //成功の時
                await storage
                  .ref("pictures")
                  .child(fileName)
                  // storageのファイルURLにアクセスし、取得
                  .getDownloadURL()
                  .then(async (url) => {
                    await db.collection("profiles").doc(id).update({
                      nickname: newnickname,
                      description:newdescription,
                      picture:url,
                      account:newaccount,
                      updated_at:firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    // user_idがescortsの中にあるguest_idに一致するものの、guest_picとguest_nicknameを更新
                    request.map((item) => (
                      db.collection("escorts").doc(item.id).update({
                        guest_nickname: newnickname,
                        guest_pic:url,
                        })
                        ));
                  });
              }
            );
          } else {
              // テキストだけの処理
        db.collection("profiles").doc(id).update({
          nickname: newnickname,
          description:newdescription,
          account:newaccount,
          updated_at:firebase.firestore.FieldValue.serverTimestamp(),
        });
        // user_idがescortsの中にあるguest_idに一致するものの、guest_nicknameを更新
        request.map((item) => (
          db.collection("escorts").doc(item.id).update({
            guest_nickname: newnickname,
            })
            ));
      }
        setDisabled(true);
        setNewpicture(null);
        setNewnickname(newnickname);
        setNewaccount(newaccount);
        setNewdescription(newdescription);
    };

    
    return (
        <div key={id}>
        <div className={classes.margin}></div>
        <div className={classes.box}>
        {disabled===true &&
            <Button variant="contained" color="primary" className={classes.revise} onClick={onDisabled}>
                修正する
            </Button>}
        {disabled===false &&
            <Button variant="outlined" color="primary" className={classes.revise} onClick={offDisabled}>
                中断して元に戻す
            </Button>}
        <form onSubmit={handleSubmit}>
            <label>
            <div className={classes.image}>
                {/* 画像を選択したら、サムネイル表示 */}
                { newpicture &&
                    <img id="thumbnail" src="" alt="選択中の画像" className={classes.img} />
                } 
                {/* 既に入っている画像があれば表示するが、新しいのが入ったら表示しない */} 
                {!newpicture && picture &&  
                <img id="thumbnail" src={picture} alt="選択中の画像" className={classes.img}/>}
                {disabled===false &&
                    <AddAPhotoIcon className={classes.imgIcon}/>  }
                    {/* 画像を入れる時は、type=file */}
                    <input
                    type="file"
                    onChange={onChangeImageHandler}
                    className={classes.inputFile}
                    disabled={disabled}
                    /> 
            </div>
            </label>

            <Typography variant="subtitle1" display="block">
            ■ニックネーム
            </Typography>
            <FormControl>
                  <TextField
                    value={newnickname}
                    onChange={(e) => setNewnickname(e.target.value)}
                    disabled={disabled}
                    required
                  />
            </FormControl>
            <Typography variant="subtitle1" display="block">
            ■SNSアカウント
            </Typography>
            <FormControl className={classes.account}>
                  <TextField
                    value={newaccount}
                    onChange={(e) => setNewaccount(e.target.value)}
                    disabled={disabled}
                  />
            </FormControl>

            <Typography variant="subtitle1" display="block">
                ■その他（自由記述）
            </Typography>
            <FormControl className={classes.description}>
                    <TextField
                        value={newdescription}
                        multiline
                        rows={5}
                        variant="outlined"
                        margin="normal"
                        //  外だしせずにここで書く方法
                        onChange={(e) => setNewdescription(e.target.value)}
                        disabled={disabled}
                    />
                    </FormControl>

        <Typography variant="body2" display="block" className={classes.update}>
        {updated_at &&
         <>更新日：{new Date(updated_at?.toDate()).toLocaleString()}</>}
        {!updated_at &&
         <>作成日：{new Date(created_at?.toDate()).toLocaleString()}</>}
        </Typography>
        <Button variant="contained" color="primary" disabled={disabled} type="submit">修正登録</Button>

        </form>
        </div>
        </div>
    )
}

export default ProfileItem
