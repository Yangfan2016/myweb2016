# SNS-小结






## Vue {{message}} 闪烁问题


传送门 [vue页面加载闪烁问题解决产生原因及解决方法](https://github.com/Yangfan2016/myweb2016/blob/master/2017blog/Vuejs2.0/vue%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E9%97%AA%E7%83%81%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3%E4%BA%A7%E7%94%9F%E5%8E%9F%E5%9B%A0%E5%8F%8A%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md)

### 解决方法1  使用v-cloak  

这个指令保持在元素上直到关联实例结束编译。 和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签(也就是{{message}})直到实例准备完毕

```html
<style>
[v-cloak] {
  display: none;
}
</style>

<!--div 不会显示，直到编译结束。--> 
<div v-cloak>
  {{ message }}
</div>


```

### 解决方法2 使用v-text替代{{}}

vue中我们会将数据包在两个大括号中，然后放到HTML里，但是在vue内部，所有的双括号会被编译成textNode的一个v-text指令

```html

<span v-text="msg"></span>
<!-- same as -->
<span>{{msg}}</span>

```


### 特例  v-text实在不能替换{{}} 的情况


```html

<div><h1>作者</h1>{{author}}</div>

<div v-text="author"></div>   // xxx 错误！！！  这样会把div里的原有的内容替换

<div v-cloak><h1>作者</h1>{{author}}</div> // 解决办法  给div 加个 v-cloak 使其隐藏 待vue 编译完成在显示出来

```



## ajax 加载前后的使用UI样式

使用的layer.js 插件

示例

```js

var getInfo=function () {

   // 加载前  开启加载样式
   var lay=layer.load(2); // 2 代表其中一种样式    0 1 2 
   // 请求数据
   axios(...)
   .then(function (res) {
       // 加载完成 关闭加载样式
       layer.close(lay);  // lay 为数字  关闭指定加载框
   
   })
   .catch();

}


```

## 插件使用

尽量选择不依赖jq的纯js插件  例如 layui   [http://www.layui.com/doc/modules/layer.html](http://www.layui.com/doc/modules/layer.html)

1. 日期选择器 laydate   layui自带
2. 弹框   layer          layui自带
3. 表单验证   layui 的 [form](http://www.layui.com/doc/element/form.html)      



## To be continued

待补充

