import React, { useState } from 'react'
import { Backdrop, Button, Fade, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core';
import ModalItem from "../../common/ModalItem";
import { makeStyles } from '@material-ui/core/styles';
import { db } from "../../firebase";
import firebase from "firebase/app";

// style
const useStyles = makeStyles((theme) => ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        display: "block",
        margin: "0 auto",
        marginBottom: 10,
        marginTop: 10,
    },
    input:{
      display: "block",
      minWidth: 150,
    },
  }));

// 日付
let now = new Date();            //日付取得準備（必須）！！
let year = now.getFullYear();    //年
let m = ("0"+(now.getMonth() + 1)).slice(-2);    //月（2桁表示）
let d =  ("0"+now.getDate()).slice(-2);  //日（2桁表示）
let date = year + "/" + m + "/" + d;

const Done = ({id, volunteer_id, myId, mynickname, mypic, es_date, disabled}) => {
    const classes = useStyles();

    const [evaluate, setEvaluate] = useState("");
    const [comment, setComment] = useState("");

    const [open, setOpen] = useState(false);
    //modal処理
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
      };
    
    // 登録処理
    const onSubmit = () => {
        // ここに書く
        // (1)escortsのstatus_2を"完了"に更新。今すぐなら、今の日付を入れる
        if(es_date === "今すぐ"){
          db.collection("escorts").doc(id).update({
            status_2: "完了",
            es_date: date,
          });
        }if(es_date !== "今すぐ"){
          db.collection("escorts").doc(id).update({
            status_2: "完了",
          });
        }
        // (2)volのお知らせに「nicknameさんがあなたの完了報告を確認しました」と追加される。
        db.collection("notices").add({
            escort_id: id,
            user_id: volunteer_id,
            icon: 3,
            notice:`${mynickname}さんがあなたの完了報告を確認しました。`,
            already_read: 0,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          });
        // (3)evaluatesに評価が入る
        db.collection("evaluates").add({
            escort_id: id,
            volunteer_id: volunteer_id,
            guest_id: myId,
            evaluate: evaluate,
            comment:comment,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          });
        setOpen(false);
    };
    
    return (
        <>
            <Button variant="contained" color="secondary" size="large" disabled={disabled} onClick={handleOpen} className={classes.button}>
                完了確認・評価
            </Button>

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
                    title="完了確認・評価"
                    text={
                        <div>
                            <Typography variant="subtitle1" display="block">
                            ■評価
                            </Typography>
                            <FormControl component="fieldset" className={classes.input}>
                            <Select
                              labelId="evaluate"
                              id="evaluate"
                              value={evaluate}
                              onChange={e => setEvaluate(e.target.value)}
                              displayEmpty
                              required
                            >
                              <MenuItem value="">
                                <em>評価</em>
                              </MenuItem>
                              <MenuItem value="1">1(最低)</MenuItem>
                              <MenuItem value="2">2</MenuItem>
                              <MenuItem value="3">3</MenuItem>
                              <MenuItem value="4">4</MenuItem>
                              <MenuItem value="5">5(最大)</MenuItem>
                            </Select>
                            </FormControl>
                            <Typography variant="subtitle1" display="block">
                            ■コメント
                            </Typography>
                            <FormControl>
                            <TextField
                                value={comment}
                                multiline
                                rows={5}
                                variant="outlined"
                                margin="normal"
                                //  外だしせずにここで書く方法
                                onChange={(e) => setComment(e.target.value)}
                            />
                            </FormControl>

                        </div>
                    }
                    buttonText="送信"
                    handleClose={handleClose}
                    onSubmit={onSubmit}
                    />
                    
            </Fade>
            </Modal>
        </>
    )
}

export default Done
