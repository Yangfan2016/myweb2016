# axios 入门


## What is axios

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
