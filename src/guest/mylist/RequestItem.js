import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Img from "../../img/noimage.jpg";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import "../../style.css";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 8,
      },
      paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
      },
      large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
      },
      avatar:{
        paddingRight:"10px",
      },
      list:{
        flexDirection: "column",
        padding: "0 0 0 0",
      },
      list2:{
        padding: "0 0 0 0",
        position:"relative",
        marginBottom: "0",
      },
      button:{
        boxShadow: "none",
        position: "absolute",
        right: "0",
        bottom: "0",
        pointerEvents: "none",
    },
      image: {
        width: "5rem",
        height: "5rem",
      },
      img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: "cover",
      },
      rikkouho: {
        marginBottom:35,
      },
  }));

  const RequestItem = ({myId, mynickname, mypic, history, id, picture, nickname, es_date, start_time, departure, destination, number, lan_1, lan_2, lan_3, status, status_2, rikkouho_id, emergency}) => {
    const classes = useStyles();

    // clickイベント
    const handleClick=()=>{
      history.push({
        // detailに遷移。idを渡す。
        pathname: '/guest/detail',
        state: { 
          escortId: id,
          myId: myId,
          mynickname: mynickname,
          mypic: mypic,
                }
      });
    }

    return (
        <>
        <div key={id} className={classes.root}>
  
            {/* 外枠 */}
            <Paper className={classes.paper}>
            <ListItem button className={classes.list} onClick={handleClick}>
              {/* 成立済ならボランティアの画像を出す */}
                {status==="成立済" &&  
                <ListItem className={classes.list2}>
                    <ListItemAvatar className={classes.avatar}>
                    { picture ? (
                    <>
                        <Avatar variant="rounded" src={picture} alt={`${nickname}のプロフィール画像`}  className={classes.large}/>
                    </>
                    ) : (
                    <>
                        <Avatar variant="rounded" src={Img} alt="画像はありません"  className={classes.large}/>
                    </>
                    )}
                    </ListItemAvatar>
                <ListItemText 
                className={classes.text}
                primary={`ボランティア：${nickname}さん`}
                secondary={
                    <>
                    <Typography component="span" variant="body2" display="block">
                    ■日時：{emergency===1 ? (`今すぐ`):(`${es_date} ${start_time}～`)}
                    </Typography>
                    </>
                }/>
                 </ListItem>                
                }
              <ListItem  className={classes.list2}>
              <ListItemText
              secondary={
                <>
                  <Typography component="span" variant="body2" display="block">
                  ■日時：{emergency===1 ? (`今すぐ`):(`${es_date} ${start_time}～`)}
                  </Typography>
                  <Typography component="span" variant="body2" display="block">
                  ■出発地：{departure} 
                  </Typography>
                  <Typography component="span" variant="body2" display="block">
                  ■目的地：{destination}
                  </Typography>
                  <Typography component="span" variant="body2" display="block">
                  ■言語：{lan_1}{ lan_2 && `、${lan_2}`}{ lan_3 && `、${lan_3}`}
                  </Typography>
                  <Typography component="span" variant="body2" display="block">
                  ■人数：{number}人
                  </Typography>
                </>
              }/>
              {/* 募集中なら立候補の数を出す */}
              {status==="募集中" &&
                <div>
                 <Typography component="span" variant="caption" display="block" align="center">
                  立候補
                  </Typography>
                    <Avatar variant="rounded" className={classes.rikkouho}>
                        {rikkouho_id && rikkouho_id.length}
                        {!rikkouho_id && 0}
                    </Avatar>
                </div>
                }               
              </ListItem>

                {/* 募集中なら募集中マーク。成立済なら状況に応じたマークに。 */}
              { status==="募集中" && 
                <>
                  <Button variant="contained" color="primary" className={classes.button} size="small">
                      {status}
                  </Button>
                </>
              }
              { status==="成立済" && status_2==="完了" &&
                <>
                <Button variant="outlined" color="primary" className={classes.button} size="small">
                {status_2}
                </Button>
                </>
              }
              { status==="成立済" && status_2==="待機中" &&
                <>
                <Button variant="outlined" color="primary" className={classes.button} size="small">
                {status_2}
                </Button>
                </>
              }
              { status==="成立済" && status_2==="到着" &&
                <>
                <Button variant="contained" color="secondary" className={classes.button} size="small">
                 進行中
                </Button>
                </>
              }
              { status==="成立済" && status_2==="完了報告" &&
                <>
                <Button variant="contained" color="secondary" className={classes.button} size="small">
                 進行中
                </Button>
                </>
              }              
            </ListItem>
            </Paper>
        </div>
        </>
    )
  }

export default withRouter(RequestItem)
