# 封装自定义请求头信息的axios-----myAxios.js


## 封装
axios.min.js  
sha1.min.js


## 用法

```js


var axios=myAxios(true); // true:添加自定义的请求头信息      false:不添加
axios(config),then(succ).catch(err); // 其他用法与axios无异

```

**示例**

```js

// 添加自定义的请求头信息
var axios=myAxios(true);
axios.get('./getRequset.php',{
	params:{id:"123"}
}).then(res=>{
	console.log(res.data);
}).catch(err=>{
	console.warn(err);
});

// 不添加自定义的请求头信息
var axios2=myAxios(false);
axios2.post('./getRequset.php',{
	id:"123"
}).then(res=>{
	console.log(res.data);
}).catch(err=>{
	console.warn(err);
});


```




