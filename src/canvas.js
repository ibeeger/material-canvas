/*
* @Author: willclass
* @Date:   2016-06-03 16:24:12
* @Last Modified by:   ibeeger
* @Last Modified time: 2016-06-04 16:47:43
*/

'use strict';

import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


const Button = {
	boxShadow:"none",
	display:"inline-block",
	width:"46%",
	margin:"0 1%"
}

const buttons={
	textAlign:"center"
}


class Canvas extends Component {
	constructor(props) {
	  super(props);
	  
	  this.state = {
	  	isdraw:false
	  };
	  this.touchStart = this.touchStart.bind(this);
	  this.touchMove = this.touchMove.bind(this);
	  this.touchEnd = this.touchEnd.bind(this);
	  this.fetchData = this.fetchData.bind(this);
	  this.cleanCanvas = this.cleanCanvas.bind(this);
	}
	componentDidMount() {
		this.cs = document.getElementById('canvas');
		this.ctx = this.cs.getContext("2d");
		this.setState({
			top:this.cs.offsetTop,
			w:window.innerWidth,
			left:this.cs.offsetLeft
		})
	}


	cleanCanvas(){
		this.ctx.clearRect(0,0,this.state.w,360)
	}

	fetchData(){
		let _this= this;

		let base64 =this.cs.toDataURL("image/jpeg",0.5).replace("data:image/jpeg;base64,","");
		let data = {
            	image:base64
            };

		 var opt = {
            url: '/baidu/',
            data: JSON.stringify(data),
            type: "POST",
            contentType:"application/json; charset=utf8",
            success: function (e) {
            	console.log(e.length)
            	if (e.length>0) {
            		_this.props.updataData(e);	
            	}else{
            		_this.setState({
            			error:e.msg,
            			errorOpen:true
            		})
            	}
            }
        };

         $.ajax(opt);
		 return ;
	}

	touchStart(e){
		e.stopPropagation();
		e.preventDefault();
		e = e.touches[0];
		let ctx = this.ctx;
		this.setState({
			isdraw:true
		})
		this.ctx.moveTo((e.pageX-3),(e.pageY-this.state.top-5));
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#c00";
		ctx.lineJons = "round";
	}

	touchEnd(){
		this.setState({
			isdraw:false
		});
	}

	touchMove(e){
		e.stopPropagation();
		e = e.touches[0];
		let ctx = this.ctx;
		if (this.state.isdraw) {
			ctx.lineTo((e.pageX-3),(e.pageY-this.state.top-5));
			ctx.stroke();
		}
	}

	render(){
		return(
			<div className="canvasContent">
			  <canvas id="canvas" width={this.state.w} height={360} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove} ></canvas>
			  <p style={buttons}><RaisedButton style={Button} onTouchTap={this.fetchData} primary={true} label="识别" /><RaisedButton style={Button} onTouchTap={this.cleanCanvas} primary={true} label="重写" /></p>
			   <Snackbar
		          open={this.state.errorOpen}
		          message={this.state.error}
		          autoHideDuration={3000}
		        />
			</div>
			)
	}
}



export default Canvas