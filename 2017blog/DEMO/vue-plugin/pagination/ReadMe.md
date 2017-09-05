# Vue 分页组件

## 预览

链接 [https://rawgit.com/Yangfan2016/myweb2016/master/2017blog/DEMO/vue-plugin/pagination/index.html](https://rawgit.com/Yangfan2016/myweb2016/master/2017blog/DEMO/vue-plugin/pagination/index.html)


## 组价模板

```html

<template id="pageNav">
    <div class="pagenav pagenav-02">
        <a href="javascript:void(0);" class="page-prev " v-bind:class="{disable:curPage==1}" v-on:click="prevPage">上一页</a>
        <a href="javascript:void(0);" class="page-item" v-bind:class="{active:curPage==1}" v-on:click="changePage(1)">1</a>
        <a href="javascript:void(0);" class="page-item" v-if="pageNum > pageOffset && curPage-1>=pageOffset-1" v-on:click="changePage((curPage-pageOffset)<=0?1:(curPage-pageOffset))" v-bind:title="'前'+pageOffset+'页'">...</a>
        <a href="javascript:void(0);" v-for="index in pageList" class="page-item" v-bind:class="{active:index==curPage}" v-on:click="changePage(index)">{{index}}</a>
        <a href="javascript:void(0);" class="page-item" v-if="pageNum > pageOffset && pageNum - curPage >=pageOffset-1" v-on:click="changePage((curPage+pageOffset)>=pageNum?pageNum:(curPage+pageOffset))" v-bind:title="'后'+pageOffset+'页'">...</a>
        <a href="javascript:void(0);" class="page-item" v-bind:class="{active:curPage==pageNum}" v-on:click="changePage(pageNum)">{{pageNum}}</a>
        <a href="javascript:void(0);" class="page-next" v-bind:class="{disable:curPage==pageNum}" v-on:click="nextPage">下一页</a>
    </div>
</template>


```


## 注册组件

```js

Vue.component('page-nav', {
        template: "#pageNav",
        props: ['pageNum','current'],
		data:function () {
			return {
				curPage:this.current,
				pageOffset:5,
				pageSlide:2,
				pageList:[]
			};
		},
		watch:{
			pageNum:function (val,oldVal) {
				// 重新生成新分页
				this.pageList = this.calcPageList(this.curPage);
				// 重新赋值当前页
				this.curPage=this.current;
			}
		},
		methods:{
			calcPageList: function (current) {
				var pageList = [];
				if (this.pageNum > this.pageOffset) {
					var left = Math.max(this.pageSlide, current - this.pageSlide);
					var right = Math.min(current + this.pageSlide, this.pageNum - 1);
					if (current - 1 < this.pageSlide) {
						right = this.pageOffset - 1;
					}
					if (this.pageNum - current < this.pageSlide) {
						left = this.pageNum - this.pageSlide - 1;
					}
					for (var i = left; i <= right; i++) {
						pageList.push(i);
					}
				} else {
					for (var i = this.pageSlide; i < this.pageNum; i++) {
						pageList.push(i);
					}
				}
				return pageList;
			},
			changePage: function (index) {
				this.curPage = index;
				// 重新生成新分页
				this.pageList = this.calcPageList(this.curPage);
				// 触发父组件相关事件
				this.$emit("cur-page-change",this.curPage);
			},
			prevPage: function () {
				if (this.curPage != 1) {
					this.curPage--;
					this.changePage(this.curPage);
				}
			},
			nextPage: function () {
				if (this.curPage != this.pageNum) {
					this.curPage++;
					this.changePage(this.curPage);
				}
			},
		},
		mounted:function () {
			this.$nextTick(function () {
				// init
				// 生成分页
				this.pageList=this.calcPageList(this.curPage);
			});
		},
    });

```


## 使用

```html

<page-nav v-bind="{
	          'pageNum':pageTotal,
	          'current':curNum
	          }" v-on:cur-page-change="getPageByNum"></page-nav>
                          
                          
```             

## 参数说明

看图

![pic]()


## 参考文献

1. MUSE-UI [http://www.muse-ui.org/#/pagination](http://www.muse-ui.org/#/pagination)   



       
