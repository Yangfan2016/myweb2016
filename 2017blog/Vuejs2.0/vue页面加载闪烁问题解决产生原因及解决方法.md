# vue页面加载闪烁问题解决产生原因及解决方法

## 方法一: v-cloak

官方的解释：这个指令保持在元素上直到关联实例结束编译。
和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
也就是说v-cloak指令可以像CSS选择器一样绑定一套CSS样式然后这套CSS会一直生效到实例编译结束。


示例代码：
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


## 方法二: v-text

vue中我们会将数据包在两个大括号中，然后放到HTML里，但是在vue内部，所有的双括号会被编译成textNode的一个v-text指令。
而使用v-text的好处就是永远更好的性能，更重要的是可以避免FOUC (Flash of Uncompiled Content) ，也就是上面与遇到的问题。

示例代码：

```html

<span v-text="msg"></span>
<!-- same as -->
<span>{{msg}}</span>

```


