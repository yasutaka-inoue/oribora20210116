import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import RealtimeRequest from './RealtimeRequest';
import RecentRequest from './RecentRequest';
import AllRequest from './AllRequest';
import WantedRequest from './WantedRequest';
import Coverimage from './Coverimage';
import src1 from "../../img/realtime.jpg";
import src2 from "../../img/pretime.jpg";

// VolunteerのTab。

// タブ下の画面の表示処理
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  // valueとindexが一致したときに、中身が表示される仕組み。
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          // ここに表示させたいものを書く。childrenにはTabpanelの中身が表示される
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
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    tab: {
      bottom: 'auto',
      top: 55,
    },
    margin:{
        top: 55,
        marginBottom: 120,
    },
  }));
  
const RequestTab = ({myId, mynickname, mypic, history}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
    return (
      <>
     <div className={classes.margin}></div>
     <div className={classes.root}>
      <AppBar position="fixed" color="default" className={classes.tab}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="トップ" {...a11yProps(0)} />
          <Tab label="すべて" {...a11yProps(1)} />
          <Tab label="募集中" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Coverimage
            title="リアルタイムリクエスト"
            text="今すぐあなたを必要としているゲストさんがいます。早速リクエストを確認してみましょう！"
            src={src1}
            color="borderRed"
            alt="リアルタイムリクエストのカバー画像"/>
          <Box p={1}>
            <RealtimeRequest myId={myId} mynickname={mynickname} mypic={mypic} history={history}/>
          </Box>
          <Coverimage
            title="事前リクエスト"
            text="実施日が近づいている事前リクエストがあります。"
            src={src2}
            color="borderYellow"
            alt="事前リクエストのカバー画像"/>
            <Box p={1}>
              <RecentRequest myId={myId} mynickname={mynickname} mypic={mypic} history={history}/>
            </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box p={1}>
            <AllRequest myId={myId} mynickname={mynickname} mypic={mypic} history={history}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box p={1}>
            <WantedRequest myId={myId} mynickname={mynickname} mypic={mypic} history={history}/>
          </Box>
        </TabPanel>
      </SwipeableViews>
      </div>
      </>
    )
}

export default RequestTab
