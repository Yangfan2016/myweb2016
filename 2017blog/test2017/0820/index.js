const fs=require('fs');
var str='';

// 文件大小
fs.stat('./XML-20141217.xml',function (err,stats) {
	// console.log(err);
	// console.log(stats);
	console.log(stats.size);
});
// 读取文件
// 设置编码，否则返回Buffer格式
fs.readFile('./XML-20141217.xml','UTF-8',function (err,data) {
	if (!err) {
		str=data;
		console.log(str.length);
		var s=timeStamp();
		str=str.replace(/(\n|\t|\r)+/g,'') // 去 \n \r \t
		.replace(/\>(\s+)\</g,'><') // 去 标签之间空格
		.replace(/\{(.+?)\}+/g,'$1'); // 替换 {...}   .? 非贪婪模式
		var e=timeStamp();
		console.log(str.length);
		console.log((e-s)+'ms');
		// 写入文件
		fs.writeFile('./XML-nodejs.xml',str,function (err) {
			console.log(err);
		});
	}
});

// 计算时间差
function timeStamp() {
	return (new Date()).getTime();
}