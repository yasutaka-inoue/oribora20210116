import React, {useState, useEffect}from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import "../../style.css";
import Request from "../request/Request";
import Mylist from "../mylist/Mylist";
import ChatTop from "../../chat/ChatTop";
import Notice from "../notice/Notice";
import Profile from "../profile/Profile";
import ChatBudge from "./ChatBudge";
import NoticeBudge from "./NoticeBudge";
import { db } from "../../firebase";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        {...other}
      >
        {value === index && (
          <>
            {children}
          </>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        paddingTop: "10px",
      },
    label:{
        fontSize: "8px",
        marginTop: "0px",
    },
    tab:{
        padding: "6px 9px"
    },
    icon:{
      marginBottom: "0px",
    },
    margin:{
      bottom: 0,
      marginBottom: 80,
    }
  }));
  
  
const Nav = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const myId = props.location.state.myId;

  const [profile, setProfile] = useState([
    {
      id: "",
      nickname:"",
      picture:"",
    },
    ]);

       // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
       useEffect(() => {
        const firebaseData = db
            .collection("profiles")
            .where("user_id", "==", myId)
            .onSnapshot((snapshot) =>
                setProfile(
                  snapshot.docs.map((doc) => ({
                    // firebaseから読み込んだデータをdocに入れて、
                    // 各プロパティに入れて、postを更新
                    id: doc.id,
                    nickname: doc.data().nickname,
                    picture: doc.data().picture,
                  }))
                )
              );
        //   クリーンアップ関数（前回の処理を削除する処理らしい）
        return () => {
            firebaseData();
            };
        }, []);   

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
      <div className={classes.root}>
      <TabPanel value={value} index={0}>
        <Request 
          myId={myId}
          mynickname={profile[0].nickname}
          mypic={profile[0].picture} 
          history={props.history}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Mylist myId={myId} history={props.history}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChatTop myId={myId}
          mynickname={profile[0].nickname}
          mypic={profile[0].picture} 
          history={props.history}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Notice 
          myId={myId} 
          mynickname={profile[0].nickname}
          mypic={profile[0].picture} 
          history={props.history}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Profile myId={myId}
        history={props.history}/>
      </TabPanel>
      <div className={classes.margin}></div>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          textColor="primary"
        >
          <Tab icon={<PersonPinIcon />} 
           label={<p className={classes.label}>リクエスト</p>} 
           {...a11yProps(0)} 
           className={classes.tab}
          />
          <Tab 
           icon={<AssignmentIcon />} 
           label={<p className={classes.label}>マイリスト</p>} 
           {...a11yProps(1)} 
           className={classes.tab}
          />
          <Tab 
           icon={<ChatBudge myId={myId}/>} 
           label={<p className={classes.label}>チャット</p>} 
           {...a11yProps(2)} 
           className={classes.tab}
          />
          <Tab 
           icon={<NoticeBudge myId={myId}/>} 
           label={<p className={classes.label}>お知らせ</p>} 
           {...a11yProps(3)} 
           className={classes.tab}
          />
          <Tab 
           icon={<RecentActorsIcon />} 
           label={<p className={classes.label}>自己紹介</p>} 
           {...a11yProps(4)} 
           className={classes.tab}
           />
        </Tabs>
      </AppBar>
    </div>
    )
}

export default Nav
