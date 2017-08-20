/*
* @theme: 模板替换
*/

var timeHost=function (func) {
	var s=(new Date()).getTime();
	func && func();
	var e=(new Date()).getTime();
	return e-s;
};

function ReplaceHTML(el,option) {
	this.ele=document.querySelectorAll(el)[0];
	this.html=(this.ele).innerHTML; // 存储原来的字符串，只读
	this.option=option;
	this.replaceStr();
	return this;
}

ReplaceHTML.prototype.replaceStr = function() {
	var _this=this;
	var data=_this.option.data;
	var strNew="";
	var arr=[];
	var reg=/<[^>]+>(\{\{[^<|>]+\}\})<[^>]+>/g; // 替换规则
	var strOld=_this.html; // 临时存储  "<p>{{num}}</p><p>{{num+6}}</p>"

	// 生成变量
	for (key in data) {
		eval("var "+key+"=data[key]");
	}

	strNew=strOld.replace(reg,'$1'); // 留下 "{{num}} {{num+6}}"
	console.log(strNew);

	arr=strNew.split('}}'); // 分别存入数组  ["{{num","{{num+6",""]
	arr=arr.map(function (item) {
		return item.trim().replace("{{",""); // 去除 "{{" ->   ["num","num+6"]
	});



	var s=(new Date()).getTime();
	
	arr.forEach(function (item,index) {
		if (item.length>0) {
			strOld=strOld.replace("{{"+item+"}}",eval(item)); // 实时替换原字符串
		}
		
	});
	_this.ele.innerHTML=strOld; // 更新DOM

	var e=(new Date()).getTime();
	console.log('LEN: '+_this.html.length);
	console.log('TIME: '+(e-s)+'ms');
	console.log('SPEED/PER:'+((e-s)/(_this.html.length)).toFixed(3));
};
ReplaceHTML.prototype.getData = function(key) {
	return this.option.data[key] || this.option.data;
};
ReplaceHTML.prototype.setData = function(key,val) {
	this.option.data[key]=val;
	this.replaceStr();
};

function minus() {
	var n=rep.getData('num');
	rep.setData('num',n+1);
}

var init=()=>{
	var rep=new ReplaceHTML('#app',{
		data:{
			num:100,
			name:'Who am I'
		}
	});


	// test
	window.rep=rep;
};

window.addEventListener('load',init,false);