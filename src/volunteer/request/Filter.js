import React, {useState}  from 'react'
import RequestItem from './RequestItem';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

// style
const useStyles = makeStyles((theme) => ({
    menu:{
      backgroundColor: "rgba(206, 17, 38, 0.05)",
      height: 150,
      paddingTop: 10,
      marginBottom: 10,
      maxWidth: "600px",
      margin: "0 auto",
    },
    menulist:{
      textAlign: "center",
    },
    buttonlist:{
      textAlign: "right",
      marginTop: 10,
      marginRight: 20,
    },
    button:{
      marginRight: 15,
      backgroundColor: "white",
    },
    button2:{
      backgroundColor: "white",
    },
    formControl: {
      marginLeft: 15,
      minWidth: 150,
    },
    formControl2: {
      minWidth: 150,
    },
    check:{
      marginLeft: 5,
    },
    checkzone:{
      width: "350px",
      margin: "0 auto",
    },
}));

const Filter = ({request, history, myId, mynickname, mypic}) => {
    const classes = useStyles();
    // dateValueはフォームの形式にあわせたもの
    const [dateValue, setDateValue] = useState('');
    // dbに入れるのはdateの方。
    const [date, setDate] = useState('');
    const [language, setLan] = useState('');
    const [checked, setChecked] = useState(false);
    // filterをかけたdataが入る
    const [filtered, setFiltered] = useState(request);
    console.log(request);

  //絞り込みの処理を書く（filterをかける）
  const filterOn = ()=>{ 
    setFiltered(
      request.filter( (item) =>{
        // checkedがtrueなら下を実行。（今すぐで絞り込み
        if(checked === true && item.emergency !== 1)
        {return false;}
        // dateValueに値が入ったら下を実行。（日付で絞り込み
        if(dateValue && item.es_date !== date)
        {return false;}
        // languageに値が入ったら下を実行。（言語で絞り込み
        if(language && item.lan_1  !== language)
        if(language && item.lan_2 !== language)
        if(language && item.lan_3 !== language)
        {return false;}
        return item;
      }
)
    ) 
  };

  
  // 解除ボタンで絞り込みfilterを外す
  const filterOff = ()=>{
    setChecked(false);
    setDateValue("");
    setLan("");
    // フィルターを外す
    setFiltered(request);
  }
  
  //チェックボックスの中身を取得 
  const checkhandleChange = (e) => {
    setChecked(e.target.checked);
  };
  // 日付セレクトの中身を取得
  const handleDateChange=(e)=>{
    // -を/に変える処理を入れる
    var str = e.target.value;
    var newstr = str.replace(/-/g, "/");
    setDateValue(e.target.value);
    setDate(newstr);
  };
  //言語セレクトの中身を取得
    const handleChange = (e) => {
      setLan(e.target.value);
    };
    return (
        <>
          {/* 絞り込み */}
          <div className={classes.menu}> 
          {/* checkbox */}
          <div className={classes.checkzone}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={checkhandleChange} color="primary"/>}
            label="リアルタイムリクエスト"
            className={classes.check}
          />
          </div>
          <div className={classes.menulist}>
          {/* セレクトボックス */}
            <FormControl>
              <TextField
                label="日付"
                type="date"
                value={dateValue}
                className={classes.formControl2}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                言語
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={language}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">
                  <em>なし</em>
                </MenuItem>
                <MenuItem value="英語">英語</MenuItem>
                <MenuItem value="中国語">中国語</MenuItem>
                <MenuItem value="フランス語">フランス語</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div className={classes.buttonlist}>
              <Button variant="outlined" color="primary" className={classes.button} onClick={filterOn}>絞り込む</Button>
              <Button variant="outlined" color="inherit" className={classes.button2} onClick={filterOff}>解除</Button>
            </div>
            </div>

                {/* requestがあるときだけ、表示処理をする*/}
                { filtered && (
                <>
                {/* requestの中身をrequestItemに入れて表示処理 */}
                {filtered.map((requestItem) => (
                    // requestItemコンポーネントに各プロパティを渡す
                    <RequestItem
                    key={requestItem.id}
                    id={requestItem.id}
                    picture={requestItem.guest_pic}
                    nickname= {requestItem.guest_nickname}
                    es_date= {requestItem.es_date}
                    start_time= {requestItem.start_time}
                    departure= {requestItem.departure}
                    destination={requestItem.destination}
                    number={requestItem.number}
                    lan_1={requestItem.lan_1}
                    lan_2={requestItem.lan_2}
                    lan_3={requestItem.lan_3}
                    status= {requestItem.status}
                    emergency={requestItem.emergency}
                    history={history}
                    myId={myId}
                    mynickname={mynickname} 
                    mypic={mypic}
                    />
                ))}
                </>
                )}
        </>            
    )
}

export default Filter
