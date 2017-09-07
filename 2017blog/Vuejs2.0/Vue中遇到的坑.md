# Vue中遇到的坑

## 兼容性

1. IE 浏览器  “Promise 未定义” 

  A：IE 浏览器  “Promise 未定义” ， IE 不支持ES6 语法 ，需要polyfill脚本
  Q：引入babel-polyfill文件，用babel来编译ES6
  
  
2. IE 浏览器 不支持 HTML5 template 标签

  A：IE 浏览器 不支持 template 标签，会把template里的内容显示出来
  Q：法一： 给 template 标签 隐藏 `dislay:none`
     法二： 用script标签代替template  `<script type="text/template"> ...   </script>`

## Vue自身

