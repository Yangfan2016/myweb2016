# 封装自定义请求头信息的axios-----myAxios.js


## 封装
axios.min.js  
sha1.min.js


## 用法

```js


axios(config).then(succ).catch(err); // 其他用法与axios无异

```

**示例**

```js

axios.get('./getRequset.php',{
	params:{id:"123"}
}).then(res=>{
	console.log(res.data);
}).catch(err=>{
	console.warn(err);
});



```


## axios用法详情 [axios入门](https://github.com/Yangfan2016/myweb2016/blob/master/2017blog/Ajax/axios%E5%85%A5%E9%97%A8.md)

