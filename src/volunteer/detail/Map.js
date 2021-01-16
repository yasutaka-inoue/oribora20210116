import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    map: {
        maxWidth: 500,
        height:200,
        backgroundColor: "gray",
        color:"white",
        marginBottom: 20,
        marginTop: 10,
      },
  }));
const Map = ({departure_lat, departure_lon, destination_lat, destination_lon}) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.map}>
            ここにmapが入る予定
            </div>
        </>
    )
}

export default Map