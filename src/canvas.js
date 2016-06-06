/*
* @Author: willclass
* @Date:   2016-06-03 16:24:12
* @Last Modified by:   ibeeger
* @Last Modified time: 2016-06-06 20:30:39
*/

'use strict';

import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

const Button = {
	boxShadow:"none",
	display:"inline-block",
	width:"46%",
	margin:"0 1%"
}

const center = {
	position:"absolute",
	left:"50%",
	top:"50%",
	height:"60px",
	width:"60px",
	marginLeft:"-30px",
	marginTop:"-30px"
}

const snak = {
	color:"#ffffff",
	backgroundColor:"rgba(0,0,0,0.6)"
}


const buttons={
	textAlign:"center",
}


class Canvas extends Component {
	constructor(props) {
	  super(props);
	  
	  this.state = {
	  	isdraw:false,
	  	loading:false
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
		this.ctx.clearRect(0,0,this.state.w,360);
		this.ctx.save();
	}

	fetchData(){
		let _this= this;
		_this.setState({
            errorOpen:false
		})
		let base64 =this.cs.toDataURL("image/jpeg",0.5).replace("data:image/jpeg;base64,","");
		let data = {
            	image:base64
            };
         this.setState({
         	loading:true
         })
		 var opt = {
            url: '/baidu/',
            data: JSON.stringify(data),
            type: "POST",
            contentType:"application/json; charset=utf8",
            success: function (e) {
            	_this.setState({
            		loading:false
            	})
            	if (e.length>0) {
            		_this.setState({
            			words:e
            		})
            	}else{
            		_this.setState({
            			error:e.msg,
            			errorOpen:true
            		})
            	};
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
		});
		this.ctx.save();
		this.ctx.moveTo((e.pageX-3),(e.pageY-this.state.top-5));
		this.ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#c00";
		ctx.lineJons = "round";
	}

	touchEnd(){
		this.setState({
			isdraw:false
		});
		this.ctx.closePath();
		this.ctx.save();
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

	renderRst(){
		let arr = <p className="tips">写下需要识别的文字</p>;
		if (this.state.words) {
			let _arr = [];
			for(var k=0; k<this.state.words.length; k++){
					_arr.push(<li>{this.state.words[k]["word"]}</li>)
			}
			
			arr = <ul className="wordlist">{_arr}</ul>
		};
		return arr;
	}

	render(){
		var loading = this.state.loading ? <CircularProgress style={center} /> : "";
		let tips = this.renderRst();
		return(
			<div className="canvasContent">
			   {tips}
			  <canvas id="canvas" width={this.state.w} height={360} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove} ></canvas>
			  <p style={buttons}><RaisedButton style={Button} onTouchTap={this.fetchData} primary={true} label="识别" /><RaisedButton style={Button} onTouchTap={this.cleanCanvas} primary={true} label="重写" /></p>
			   <Snackbar
		          open={this.state.errorOpen}
		          message={this.state.error}
		          autoHideDuration={3000}
		        />
				{loading}
			</div>
			)
	}
}



export default Canvas