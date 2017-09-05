<template>
    <div class="pagination">
        <a href="javascript:void(0);" class="page-prev " v-bind:class="{disable:curPage==1}" v-on:click="prevPage">上一页</a>
        <a href="javascript:void(0);" class="page-item" v-bind:class="{active:curPage==1}" v-on:click="changePage(1)">1</a>
        <a href="javascript:void(0);" class="page-item" v-if="pageNum > pageOffset && curPage-1>=pageOffset-1" v-on:click="changePage((curPage-pageOffset)<=0?1:(curPage-pageOffset))" v-bind:title="'前'+pageOffset+'页'">...</a>
        <a href="javascript:void(0);" v-for="index in pageList" class="page-item" v-bind:class="{active:index==curPage}" v-on:click="changePage(index)" v-bind:key="index">{{index}}</a>
        <a href="javascript:void(0);" class="page-item" v-if="pageNum > pageOffset && pageNum - curPage >=pageOffset-1" v-on:click="changePage((curPage+pageOffset)>=pageNum?pageNum:(curPage+pageOffset))" v-bind:title="'后'+pageOffset+'页'">...</a>
        <a href="javascript:void(0);" class="page-item" v-bind:class="{active:curPage==pageNum}" v-on:click="changePage(pageNum)">{{pageNum}}</a>
        <a href="javascript:void(0);" class="page-next" v-bind:class="{disable:curPage==pageNum}" v-on:click="nextPage">下一页</a>
		<div class="page-item" v-if="isJump"><span>跳转到</span><input type="number"  min="1" v-bind:max="pageNum" v-on:keypress.13="jumpPageByNum" /><span>页</span></div>
	</div>
</template>
<script>
export default {
    name:"pagination", 
        props:{
			pageNum:{
				type:Number,
				required:true
			},
			current:{
				type:Number,
				default:1
			},
			isJump:{
				type:Boolean,
				default:false
			}
		},
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
			},
			current:function (val,oldVal) {
				this.curPage=val;
				// 重新生成新分页
				this.pageList = this.calcPageList(val);
			},
			curPage:function (val,oldVal) {
				// 重新生成新分页
				this.pageList = this.calcPageList(val);
				// 触发父组件相关事件
				this.$emit("cur-page-change",val);
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
			jumpPageByNum:function (ev) {
				this.curPage=Math.max(Math.min(this.pageNum,Number(ev.target.value)),1);
                ev.target.value=this.curPage;
			}
		},
		mounted:function () {
			this.$nextTick(function () {
				// init
				// 生成分页
				this.pageList=this.calcPageList(this.curPage);
			});
		},
}
</script>
<style scoped>
    .container{
        width:100px;
        line-height:30px;
        border:1px solid;
        text-align:center;
    }
    .item{
        background-color:#9c3;
        cursor:pointer;
    }
    .page-item{
        display:inline-block;
        padding:10px 15px;
        border:1px solid #333;
    }
    .active{
        background-color:#9c3;
        color:#fff;
    }
</style>
