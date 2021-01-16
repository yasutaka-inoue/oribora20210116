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

const Rikkouho = ({id, guest_id, myId, mynickname, mypic, rikkouho_id}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    //modal処理
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
      };

      let rikkouho ="";
      if(!rikkouho_id){
          rikkouho = [];
      }if(rikkouho_id){
          rikkouho =rikkouho_id;
      };  

    // 登録処理
    const onSubmit = () => {
        // ここに書く
        // (1)escortsのrikkouho_idの中の配列に（myid）を追加して更新
        rikkouho.push(myId);
        db.collection("escorts").doc(id).update({
            rikkouho_id: rikkouho,
          });
        
        // (2)guestのお知らせに「nicknameさんがボランティアに立候補しました」と追加される。
        db.collection("notices").add({
            escort_id: id,
            user_id: guest_id,
            icon: 0,
            notice:`${mynickname}さんがボランティアに立候補しました。`,
            already_read: 0,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          });
        setOpen(false);
    };
    
    return (
        <>
            <Button variant="contained" color="secondary" size="large" onClick={handleOpen} className={classes.button}>
                ボランティアに立候補する
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
                    title="ボランティア立候補"
                    text="このボランティアに立候補しますか？"
                    buttonText="立候補する"
                    handleClose={handleClose}
                    onSubmit={onSubmit}
                    />
            </Fade>
            </Modal>
        </>
    )
}

export default Rikkouho
