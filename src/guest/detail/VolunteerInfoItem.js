import React from 'react'
import Typography from '@material-ui/core/Typography';
import Img from "../../img/noimage.jpg";
import { makeStyles } from '@material-ui/core/styles';

// style
const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
      },
    image: {
        width: "8rem",
        height: "8rem",
        margin: "0 auto",
        marginBottom: "10px",
      },
    img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: "cover",
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

  }));

const VolunteerInfoItem = ({id, nickname, picture, account, description, created_at, updated_at}) => {
    const classes = useStyles();
    return (
        <div key={id}>
        <div className={classes.margin}></div>
        <div className={classes.box}>
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

            <Typography variant="subtitle1" display="block">
            ■ニックネーム：{nickname}
            </Typography>
            <Typography variant="subtitle1" display="block">
            ■SNSアカウント：
            </Typography>
            <a href={account}>{account}</a>

        <Typography variant="subtitle1" display="block">
            ■自己紹介：
        </Typography>
        {description}

        <Typography variant="body2" display="block" className={classes.update}>
        {updated_at &&
         <>更新日：{new Date(updated_at?.toDate()).toLocaleString()}</>}
        {!updated_at &&
         <>作成日：{new Date(created_at?.toDate()).toLocaleString()}</>}
        </Typography>
        </div>
        </div>
    )
}

export default VolunteerInfoItem

