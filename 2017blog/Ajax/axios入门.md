# axios 入门


## 什么是axios

引用axios的介绍：

> Promise based HTTP client for the browser and node.js




就是一个基于ES6的Promise的网络请求库，其实说干净了就是一个打包好的XMLHttpRequests，也就是说，这个也是一个ajax库。


所以它一样可以实现：

- 在浏览器里建立XHR

- 通过nodejs进行http请求

甚至可以实现！

- 转换或者拦截请求数据或响应数据

- 支持Promise的API

- 可以取消请求

- 自动转换JSON

- 可以防御XSRF攻击！

浏览器支持问题也没什么问题，IE这种本时代异端都能支持到8+，这问题是不大了。（VUE支持到9+！）


## 怎么用

### 方法一  npm安装

1. npm下载

```
npm install axios

```
2. webpack之类的打包工具导入



### 方法二  script标签引入

```html

<script type="text/javascript" src="path/axios.min.js"></script>

```

## 用法及配置

### 简单的demo

** 一个简单的HTTP GET请求

```js

// 法一 请求参数写到url中

axios.get('http://getRes.php?id=123456&name=Yangfan').then(function (response) {
  // TODO
  // 返回HTTP请求成功的数据
}).catch(function (error) {
  // TODO
  // 返回HTTP请求失败的失败信息
});

// 法二 请求参数写到axios配置参数中

axios.get('http://getRes.php'，{
  params:{
    id:123456,
    name:"Yangfan"
  }
}).then(function (response) {
  // TODO
  // 返回HTTP请求成功的数据
}).catch(function (error) {
  // TODO
  // 返回HTTP请求失败的失败信息
});


```

** 一个简单的HTTP POST 请求

```js

axios.post('http://getRes.php',{
  id:123456,
  name:"Yangfan"
}).then(function (response) {
  // TODO
  // 返回HTTP请求成功的数据
}).catch(function (error) {
  // TODO
  // 返回HTTP请求失败的失败信息
});

```

** 自定义请求配置

```js

// 配置
var config={
  method: 'GET',  // 请求方法                                           
  url: 'http://getRes.php',  // 请求url                          
  headers: { 
    token: 'ftv1443qby6bdfa41t90sfvq89hg3h54u989m9imog79g4'   // 请求头                                              
  },
  data: {         // 需要传递的数据                                 
    id: 123456,
    name: 'Yangfan'
  }
};

axios(config).then(function (response) {
  // TODO
  // 返回HTTP请求成功的数据
}).catch(function (error) {
  // TODO
  // 返回HTTP请求失败的失败信息
});

```






