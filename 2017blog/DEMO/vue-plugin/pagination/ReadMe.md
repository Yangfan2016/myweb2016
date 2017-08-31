# Vue 分页组件


## 组价模板

```html

<template id="pageNav">
    <div class="pagenav pagenav-02">
        <a href="javascript:void(0);" class="page-prev " v-bind:class="{disable:curPage==1}" v-on:click="prevPage">上一页</a>
        <a href="javascript:void(0);" class="page-item" v-bind:class="{active:curPage==1}" v-on:click="changePage(1)">1</a>
        <a href="javascript:void(0);" class="page-item" v-if="pageNum > pageOffset && curPage>= pageOffset" v-on:click="changePage(curPage-pageOffset)">...</a>
        <a href="javascript:void(0);" v-for="index in pageList" class="page-item" v-bind:class="{active:index==curPage}" v-on:click="changePage(index)">{{index}}</a>
        <a href="javascript:void(0);" class="page-item" v-if="pageNum > pageOffset && pageNum - curPage >= pageOffset" v-on:click="changePage(curPage+pageOffset)">...</a>	
        <a href="javascript:void(0);" class="page-item" v-bind:class="{active:curPage==pageNum}" v-on:click="changePage(pageNum)">{{pageNum}}</a>
        <a href="javascript:void(0);" class="page-next" v-bind:class="{disable:curPage==pageNum}" v-on:click="nextPage">下一页</a>
    </div>
</template>


```


## 注册组件

```js

Vue.component('page-nav',{
        template: "#pageNav",
        props: ['pageNum','pageOffset','pageSlide'],
        data:function () {
        	return {
        		pageList:[],
				pageNum:this.pageNum,
				pageOffset:this.pageOffset,
				pageSlide:this.pageSlide,
        		curPage:1,
        	};
        },
        methods:{
        	changePage:function (index) {
                this.curPage = index;
                // 重新生成新分页
                this.pageList=this.calcPageList(this.curPage);
            },
            prevPage:function () {
                if (this.curPage != 1) {
                    this.curPage--;
                    this.changePage(this.curPage);
                }
            },
            nextPage:function () {
                if (this.curPage != this.pageNum) {
                    this.curPage++;
                    this.changePage(this.curPage);
                }
            },
			calcPageList:function (current) {
				let pageList = [];
				if (this.pageNum > this.pageOffset) { 
					let left = Math.max(this.pageSlide, current - this.pageSlide); 
					let right = Math.min(current + this.pageSlide, this.pageNum - 1);
					if (current - 1 < this.pageSlide) {
						right = this.pageOffset-1;
					}
					if (this.pageNum - current < this.pageSlide) {
						left = this.pageNum - this.pageSlide-1;
					}
					for (let i = left; i <= right; i++) {
						pageList.push(i);
					}
				} else {
					for (let i = this.pageSlide; i < this.pageNum; i++) {
						pageList.push(i);
					}
				}
				console.log(pageList);
				return pageList;
			}
        },
        mounted:function () {
			var _this=this;
			this.$nextTick(function () {
				_this.pageList=_this.calcPageList(_this.curPage);
			});
        }
	});

```


## 使用

```html

<page-nav v-bind="{
          'page-num':50,
          'page-offset':5,
          'page-slide':2
          }"></page-nav>
                          
                          
```             

## 参数说明




## 参考文献

1. MUSE-UI [http://www.muse-ui.org/#/pagination](http://www.muse-ui.org/#/pagination)   



       
