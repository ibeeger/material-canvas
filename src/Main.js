/*
* @Author: willclass
* @Date:   2016-06-03 12:03:47
* @Last Modified by:   willclass
* @Last Modified time: 2016-06-03 18:03:25
*/

'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';


import Canvas from './Canvas.js';
 
class Main  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose(){
    	this.setState({open: false})
    }
    handleToggle(){
    	this.setState({open: !this.state.open})
    }

    render() {
    	return(<div className="main">
    			<AppBar title="标题" onLeftIconButtonTouchTap={this.handleToggle}  />
				<Canvas />

    			<Drawer
		          docked={false}
		          width={220}
		          open={this.state.open}
		          onRequestChange={(open) => this.setState({open})}
		        >
		          <MenuItem onTouchTap={this.handleClose}>继续识字</MenuItem>
		          <MenuItem onTouchTap={this.handleClose}>已认识的字</MenuItem>
		        </Drawer>
    		</div>);
    }
}



export default Main;