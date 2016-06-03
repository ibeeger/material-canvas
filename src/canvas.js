/*
* @Author: willclass
* @Date:   2016-06-03 16:24:12
* @Last Modified by:   willclass
* @Last Modified time: 2016-06-03 20:14:07
*/

'use strict';

import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';



const Button = {
	boxShadow:"none",
	display:"block"
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

	fetchData(){

		let base64 = encodeURI(this.cs.toDataURL("image/jpeg",0.7)).replace("data:image/jpeg;base64,","");
		let data = {
            	fromdevice:"pc",
            	clientip:"10.10.10.0",
            	detecttype:"LocateRecognize",
            	languagetype:"CHN_ENG",
            	imagetype:"1",
            	version:"v1",
            	sizetype:"small",
            	image:base64
            };
            console.log(data);
		 var opt = {
            url: 'http://apis.baidu.com/idl_baidu/baiduocrpay/idlocrpaid',
			// data: "fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&version=v1&sizetype=small&image="+base64,
            data:JSON.stringify(data),
            type: "POST",
            contentType: 'application/x-www-form-urlencoded',
            beforeSend: function(jqXHR, settings) {
                 jqXHR.setRequestHeader('apikey', 'd3ba4f86f237930d2abae2892b7d789d');
             },
            success: function (e) {
                 console.log(e);

            }
        }
         $.ajax(opt);
		 return true;
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
			  <p><RaisedButton style={Button} onTouchTap={this.fetchData} primary={true} label="识别" /></p>
			</div>
			)
	}
}



export default Canvas