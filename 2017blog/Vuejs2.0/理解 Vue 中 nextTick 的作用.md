# 理解 Vue 中 nextTick 的作用[转]


## 看前必读

**深入响应式原理** [https://cn.vuejs.org/v2/guide/reactivity.html](https://cn.vuejs.org/v2/guide/reactivity.html)



在看 Vue 官方文档时，对 API 文档中的 Vue.nextTick 和 vm.$nextTick 的作用不太理解。

其实如果看一下深入响应式原理 - vue.js中的有关内容，可能会有所理解，不过有些同学可能看到这个标题之后就选择跳过了，因此这里简述如下：

>  Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，API 文档中官方示例如下：


```js 

new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // modify data
      this.message = 'changed'
      // DOM is not updated yet
      this.$nextTick(function () {
        // DOM is now updated
        // `this` is bound to the current instance
        this.doSomethingElse()
      })
    }
  }
})

```

有些同学可能不大理解什么叫 DOM is now updated，在深入响应式原理 - vue.js中的示例情况也比较罕见，Vue 模板中直接在根无素中进行插值，然后在实例方法中使用了 this.$el.textContent 来获得更新之后的 DOM。
为了更好地理解这一点，修改示例如下：


## 模板

```html

<div class="app">
  <div ref="msgDiv">{{msg}}</div>
  <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
  <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
  <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
  <button @click="changeMsg">
    Change the Message
  </button>
</div>

```

## Vue 实例化

```js

new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg1: '',
    msg2: '',
    msg3: ''
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world."
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }
  }
})

```

点击按钮前的界面：

![pic](https://pic1.zhimg.com/v2-97983952362f118ea444817ba2e88170_b.png)


点击按钮之后，界面如下，注意观察三个条件渲染的结果之间的差异。

![pic](https://pic4.zhimg.com/v2-174878320d72cdf17c050c7b3c87b9c7_b.png)

看完这个示例，也许有人会问，我在 Vue 实例方法中修改了数据，然后再在 $nextTick 回调中获取该数据在相应 DOM 元素所绑定的内容（或属性）殊无必要，我为什么需要这样的 API 呢？

考虑这样一种场景，你有一个 jQuery 插件，希望在 DOM 元素中某些属性发生变化之后重新应用该插件，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法。




原文： [https://zhuanlan.zhihu.com/p/26724001](https://zhuanlan.zhihu.com/p/26724001)


