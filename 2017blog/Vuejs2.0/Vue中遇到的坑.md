# Vue中遇到的坑

## 兼容性

### 1. IE 浏览器  “Promise 未定义” 

  - A：IE 浏览器  “Promise 未定义” ， IE 不支持ES6 语法 ，需要polyfill脚本   
  - Q：引入babel-polyfill文件，用babel来编译ES6    
  
  
### 2. IE 浏览器 不支持 HTML5 template 标签  

  - A：IE 浏览器 不支持 template 标签，会把template里的内容显示出来  
  - Q：法一： 给 template 标签 隐藏 `dislay:none`  
       法二： 用script标签代替template  `<script type="x-template"> ...   </script>`  

```html

<template id="demo3" style="display:none">
    <h2 style="color:red">我是script标签模板</h2> 
</template>



<script type="x-template" id="demo3">
    <h2 style="color:red">我是script标签模板</h2>
</script>

```


## Vue自身

### 1. Vue 无法监听数组的变化 

  - A：Vue 无法监听数组的变化 `[1,2] -> [2,2] `    
  - Q：使用 `vm.$set(obj,key,value)`  由于js的限制 vue无法检测到数组的变化 ，用$set可以解决 [ https://segmentfault.com/q/1010000006058604]( https://segmentfault.com/q/1010000006058604)    


### 2. Vue 子组件的 使用 v-for 时 强烈建议 定义 key 属性

   ```html
   
   <template>
      <div v-for="(item,indx) in arr" v-bind:key="index"></div>
   </template>
   
   ```
   
