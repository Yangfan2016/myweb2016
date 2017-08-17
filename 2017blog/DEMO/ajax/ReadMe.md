# 封装自定义请求头信息的axios-----myAxios.js


## 封装
axios.min.js  
sha1.min.js


## 用法

```js

myAxios(config,succ,err);

// or 使用原生axios
var axios=myAxios();
axios(config),then(succ).catch(err);

```

**示例**

```js

myAxios({
    url:"./getRequset.php",
    method:"GET",
    params:{id:"123"}
},function (res) {
    console.log(res.data);
},function (err) {
    console.log(err);
});


// or使用原生的axios
var axios=myAxios();

axios.get('./getRequset.php',{
    params:{id:"123"}
}).then(res=>{
    console.log(res.data);
}).catch(err=>{
    console.warn(err);
});

```


## myAxios参数

@param  {[Object]} config [axios的配置参数]  
@param  {[Function]} then   [请求成功的回调]  
@param  {[Function]} catch2 [请求失败的回调]  
@return {[type]}        [返回值，不传参数时，返回axios函数]  

