import React, { useState } from 'react'
import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
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
        marginBottom: 30,
    }
  }));

const Kanryou = ({id, guest_id, myId, mynickname, mypic}) => {
    const classes = useStyles();

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
        // (1)escortsのstatus_2を"完了報告"に更新
        db.collection("escorts").doc(id).update({
          status_2: "完了報告",
        });
        // (2)guestのお知らせに「nicknameさんがボランティアを完了しました」と追加される。
        db.collection("notices").add({
          escort_id: id,
          user_id: guest_id,
          icon: 3,
          notice:`${mynickname}さんがボランティアを完了しました。`,
          already_read: 0,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setOpen(false);
    };
    
    return (
        <>
            <Button variant="contained" color="secondary" size="large" onClick={handleOpen} className={classes.button}>
                ボランティアの完了を報告する
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
                    title="完了報告"
                    text="このボランティアの完了をゲストに報告しますか？"
                    buttonText="報告する"
                    handleClose={handleClose}
                    onSubmit={onSubmit}
                    />
                    
            </Fade>
            </Modal>
        </>
    )
}

export default Kanryou
