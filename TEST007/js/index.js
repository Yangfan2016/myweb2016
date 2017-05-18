/**
  * Author: ZHANGH
  * Theme: init
  * Note: 先加载地图，再加载主函数
  * 
  **/




// callback init
var init=function () {
	var nodeScript=document.createElement("script");
	nodeScript.type='text/javascript';
	nodeScript.src='./js/main.js';

	document.body.appendChild(nodeScript);
};

(function () {
	// TESIFY
	var isCan=false;
	const DOMAIN='yangfan.cf';
	isCan=document.location.hostname===DOMAIN?true:false;
	
	if (isCan) {
		// API
		const APIURL='http://webapi.amap.com/maps';
		const KEY='775d883c150c7e52827d0ba76ec13b11';
		const VERSION='1.3';

		var nodeScript=document.createElement("script");
		nodeScript.src=APIURL+'?v='+VERSION+'&key='+KEY+'&callback=init';

		document.head.appendChild(nodeScript);
	} else {
		document.body.innerHTML='<div style="margin:100px auto;text-align:center;font-size:72px;color:#f00;"><p>非法域名，禁止访问</p><p>Stop access,valid domain</p></div>';
		alert("VALID DOMAIN");
		console.warn("非法域名");
	}
}());
