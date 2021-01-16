import React,{useState, useEffect} from "react";
import { withRouter } from 'react-router-dom';
import TitleOffline from './TitleOffline'
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, TextField} from '@material-ui/core';
import { auth } from "./firebase";


// style
const useStyles = makeStyles((theme) => ({
  margin:{
      marginBottom: 150,
  },
  button:{
    display: "block",
    margin: "0 auto",
    marginTop: 20,
    marginBottom: 10,
  },
  text:{
    textAlign: "center",
  },
  input:{
    display:"block",
    width: 260,
    margin: "0 auto",
    textAlign: "center",
  },
  link:{
    display: "block",
    width: 65,
    margin: "0 auto",
    marginTop: 20,
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const App = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  useEffect(() => {
    // 認証関係に対して何かしらの変更があったときに実行されるfirebaseの機能
    // onAuthStateChangedは→ログインしていたとか、ログアウトしたとかで呼び出される
    // userというパラメーターがあり、これには「ログインが成功したときに」データが全部格納される
    // userに何らかの情報がはいっていればログインに成功、入ってなければログイン失敗、ログインしていない
    const unSub = auth.onAuthStateChanged((user) => {
      // 判定の条件は何らかの情報が入っていた時→ルートの画面（App）に遷移させる(逆にuserにない場合は常にこの画面に止まり続ける)
      !user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

    // 新規登録へ遷移
    const gotoRegister=()=>{
        props.history.push({
            pathname: '/register',
        })
    }

  return (
    <>
      <TitleOffline title="ログイン"/>
      <div className={classes.margin}></div>
            <FormControl component="fieldset" className={classes.input}>
              <TextField
                label="メールアドレス"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
               
              />
            </FormControl><br/>
            <FormControl component="fieldset" className={classes.input}>
              <TextField
                label="パスワード"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                
              />
            </FormControl>   
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}
              onClick={
                async () => {
                  try{
                    await auth.signInWithEmailAndPassword(email, password);
                    props.history.push({
                      pathname: "/userflg",
                      state: { email: email,}
                    });
                  }catch(error){
                    // ログインに失敗したらエラー表示
                    alert(error.message);
                  }
                }
              }>
              ログイン</Button>

        <p className={classes.link} onClick={gotoRegister}>新規登録</p>
    </>
  );
};

export default withRouter(App);
