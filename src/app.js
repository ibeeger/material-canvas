/*
* @Author: willclass
* @Date:   2016-06-03 11:52:23
* @Last Modified by:   willclass
* @Last Modified time: 2016-06-03 18:06:12
*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from "react-router"
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()


const muiTheme = getMuiTheme({
  appBar: {
    height: 45,
  },
});


const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Main />
  </MuiThemeProvider>
);
 
ReactDOM.render(
  <App />,
  document.getElementById('main')
);