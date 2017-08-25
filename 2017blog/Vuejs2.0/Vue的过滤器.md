# Vue的过滤器（2.0版本过滤器）

## 介绍

**在Vue2.0版本中1.0自带过滤器均不可用，须采用自定义函数** 

> 官网提示：    
Vue 2.x 中，过滤器只能在 mustache 绑定和 v-bind 表达式（从 2.1.0 开始支持）中使用，因为过滤器设计目的就是用于文本转换。为了在其他指令中实现更复杂的数据变换，你应该使用计算属性。



```js

new Vue({
  // ...
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})

```

过滤器可以串联：

```js

{{ message | filterA | filterB }}


```

过滤器是 JavaScript 函数，因此可以接受参数：


```js

{{ message | filterA('arg1', arg2) }}

```

这里，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。

## 过滤器项目应用总结

1. **过滤器使用添加的全局的过滤器使用时，必须定义在 Vue实例初始化前面,否则过滤器定义无效！**


```js

Vue.filter("discount",function (value,discount) {
    return value * (discount/100);
});

Vue.filter("discount1",function (value) {
    return value * 100;
});

```

2. **对于子组件而言，父组件中自定义的过滤器在子组件中使用无效！可使用全局添加的过滤器或在子组件内部自定义过滤器！**

子组件中添加自定义过滤器！


```js

filters:{
    discount:function (value,discount) {
        return value *(discount / 100);  //| discount(25) | discount1
    },
    discount1:function (value) {
        return value * 100;
    }
}

```

3.对于1.0版本中常用的自带过滤器 limitBy,filterBy,orderBy,可以分别采用分别用Array.slice,Array.filter和 Array.sort重写一遍并不复杂。


## 计算属性

使用场景

当模板中放入太多的逻辑，模板过重且难以维护时，你都应当使用计算属性。




--------

原文：[http://www.cnblogs.com/lolDragon/p/6247651.html](http://www.cnblogs.com/lolDragon/p/6247651.html)    
Vuejs文档：[https://012-cn.vuejs.org/guide/custom-filter.html](https://012-cn.vuejs.org/guide/custom-filter.html)

