import React from "react";
import ReactDOM from "react-dom";
import Router from "./common/Router";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

//全体テーマの設定
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f6685e',
      main: '#f44336',
      dark: '#aa2e25',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      dark: '#b28900',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router />
    </ThemeProvider>
, document.getElementById("root"));
