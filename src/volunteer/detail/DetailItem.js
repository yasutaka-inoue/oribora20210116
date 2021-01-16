import React from 'react'
import Typography from '@material-ui/core/Typography';
import Img from "../../img/noimage.jpg";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Map from "./Map";
import { withRouter } from 'react-router-dom';
import Rikkouho from "./Rikkouho";
import RikkouhoCansel from "./RikkouhoCansel";
import Touchaku from "./Touchaku";
import Kanryou from "./Kanryou";

// detailで取得したデータを表示させるコンポーネント
// style
const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
        position: "relative",
      },
    button:{
        boxShadow: "none",
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        right: 5,
    },
    image: {
        width: "6rem",
        height: "6rem",
      },
    img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: "cover",
      },
    guestList:{
        display: "flex",
    },
    guestInfo:{
        paddingLeft: "10px",
    },
    guest:{
        paddingTop: 10,
        paddingBottom: 10,
    },
    button2:{
        marginLeft: 10,
    },
    margin:{
        marginBottom: 70,
    },
  }));

const DetailItem = ({
    id, picture, nickname, guest_id, rikkouho_id, es_date, start_time,
    departure, departure_lat, departure_lon, destination, destination_lat, destination_lon,               
    number, lan_1, lan_2, lan_3, status, status_2, emergency, history, myId, mynickname, mypic}) => {

    const classes = useStyles();
    
    //ゲスト紹介ページへ遷移
    const gotoGuest=()=>{
        history.push({
            // detailに遷移。idを渡す。
            pathname: '/volunteer/guestprofile',
            state: { guestId: guest_id }
        });
    }

    // 掲示板へ遷移
    const gotoForum=()=>{
        history.push({
            //forumに遷移。値を渡す。
            pathname: '/forum',
            state: {escortId: id,
                    myId: myId,
                    }
        })
    }

    //チャットへ遷移
    const gotoChat=()=>{
        history.push({
            //forumに遷移。値を渡す。
            pathname: '/chat',
            state: {escortId: id,
                    myId: myId,
                    }
        })
    }
    
    // rikkouho_idの中身を取得
    let rikkouho ="";
    if (rikkouho_id) {
        rikkouho = rikkouho_id.includes(myId);
    }if(!rikkouho_id){
        rikkouho = false;
    };

    return (
        <>
        <div className={classes.margin}></div>
        <div className={classes.box}>
            <Typography variant="h6" className={classes.title}>
                {nickname}さんのリクエスト
            </Typography>

            { status==="募集中" ? (
                <>
                  <Button variant="contained" color="primary" className={classes.button} size="large">
                      {status}
                  </Button>
                </>):(
                <>
                <Button variant="outlined" color="primary" className={classes.button} size="large">
                    {status}
                </Button>
                </>)}

            <Typography variant="subtitle2" display="block">
            ■日時：{emergency===1 ? (`今すぐ`):(`${es_date} ${start_time}～`)}
            </Typography>
             
            <Typography variant="subtitle2" display="block">
            ＜コース＞
            </Typography>
            <Typography variant="body2" display="block">
            ■出発地：{departure} 
            </Typography>
            <Typography variant="body2" display="block">
            ■目的地：{destination}
            </Typography>

            {/* mapコンポーネントを読み込み */}
            <Map
                departure_lat={departure_lat}
                departure_lon={departure_lon}
                destination_lat={destination_lat}
                destination_lon={destination_lon}
            />
            <div className={classes.guest}>
            <Typography variant="subtitle1" display="block">
            ＜ゲスト情報＞
            </Typography>
            <div className={classes.guestList}>
            <div>
            { picture ? (
                <>
                <div className={classes.image}>
                    <img src={picture} alt={`${nickname}のプロフィール画像`} className={classes.img}/>
                </div>
                </>
                ) : (
                <>
                <div className={classes.image}>
                    <img src={Img} alt="画像はありません" className={classes.img}/>
                </div>
                </>
                )
            }
            </div>
            <div className={classes.guestInfo}>
            <Typography variant="body2" display="block">
            ■ニックネーム：{nickname}
            </Typography>
            <Typography variant="body2" display="block">
            ■言語：{lan_1}{ lan_2 && `、${lan_2}`}{ lan_3 && `、${lan_3}`}
            </Typography>
            <Typography variant="body2" display="block">
            ■人数：{number}人
            </Typography>
            <Button variant="outlined" color="primary" size="small" onClick={gotoGuest}>
                紹介ページ
            </Button>
            {status === "募集中" &&
            <Button variant="contained" color="primary" size="small" onClick={gotoForum} className={classes.button2}>
                掲示板
            </Button>
            }
            {status === "成立済" &&
            <Button variant="contained" color="primary" size="small" onClick={gotoChat} className={classes.button2}>
                チャット
            </Button>
            }
            </div>
            </div>
            </div>

            {/* ボタンと登録等の処理はコンポーネントを分ける */}
            {/* まだ立候補していない時は、立候補できるボタンを表示 */}
            { status === "募集中" && rikkouho === false && 
            <Rikkouho 
                id={id} 
                guest_id={guest_id}
                myId={myId}
                mynickname={mynickname}
                mypic={mypic} 
                rikkouho_id={rikkouho_id}
                />
            }

            {/* 立候補済みの時は、キャンセルボタンに */}
            { status === "募集中" && rikkouho === true && 
            <RikkouhoCansel 
                id={id} 
                guest_id={guest_id}
                myId={myId}
                mynickname={mynickname}
                mypic={mypic}
                rikkouho_id={rikkouho_id} />
            }

            {/* 到着前の時は、到着報告ボタンに */}
            { status === "成立済" && status_2 === "待機中" &&
            <Touchaku 
                id={id} 
                guest_id={guest_id}
                myId={myId}
                mynickname={mynickname}
                mypic={mypic} />
            }

            {/* 到着後は、完了報告ボタンに */}
            { status === "成立済" && status_2 === "到着" &&
            <Kanryou 
                id={id} 
                guest_id={guest_id}
                myId={myId}
                mynickname={mynickname}
                mypic={mypic} />
            }
        </div>
        </>
    )
}

export default withRouter(DetailItem)
