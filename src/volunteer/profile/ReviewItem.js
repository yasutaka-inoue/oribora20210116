import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// style
const useStyles = makeStyles((theme) => ({
    line:{
        borderBottom: "solid 0.5px black",
    },
  }));
  

const ReviewItem = ({id, evaluate, comment, created_at}) => {
    const classes = useStyles();
    return (
        <div key={id}>
            <Typography variant="body2" display="block">
            評価：{evaluate}<br/>
            コメント：{comment}<br/>
            (投稿日：{new Date(created_at?.toDate()).toLocaleString()})
            </Typography>
            <div className={classes.line}></div>
        </div>
    )
}

export default ReviewItem
