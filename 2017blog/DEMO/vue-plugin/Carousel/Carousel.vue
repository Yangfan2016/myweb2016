<template>
	<div class="lunbo_con" ref="lunboCon">
        <ul class="con_box" ref="lunboBox">
            <li class="box_item" v-if="isLoop" v-bind:style="{'background-color':lunList[lunList.length-1].bg}" v-html="lunList[lunList.length-1].text"></li>
            <li class="box_item" v-for="(item,index) in lunList" v-bind:key="index" v-bind:style="{'background-color':item.bg}" v-html="item.text"></li>
            <li class="box_item" v-if="isLoop" v-bind:style="{'background-color':lunList[0].bg}" v-html="lunList[0].text"></li>              
        </ul>
        <span class="con_btn prev" v-on:click="changeItem(-1)">&lt;</span>
        <span class="con_btn next" v-on:click="changeItem(1)">&gt;</span>
        <ul class="con_dot">
            <li class="dot_item" v-bind:class="{active:n==realCurNum}" v-for="(d,n) in lunList" v-bind:key="n" v-on:click="skipItem(n)"></li>
        </ul>
    </div>
</template>
<script>
export default {
	name:"lunbo",
    props:{
        // 滚动内容
        lunList:{
            type:Array,
            required:true
        },
        eq:{
            type:Number,
            default:1 // 默认第一张  此参数无意义
        }, 
        isLoop:{
            type:Boolean,
            default:false // 默认不是无缝循环
        },
        isAutoPlay:{
            type:Boolean,
            default:false
        },
        playDelay:{
            type:Number,
            default:1500 // ms
        },
        // 动画      
        duration:{
            type:Number,
            default:500 // ms
        },
        timingFunction:{
            type:String,
            default:"ease-in-out"
        },
        delay:{
            type:Number,
            default:0 // ms
        }
    },
    data:function () {
        return {
            curNum:this.isLoop?this.eq:this.eq-1,
            totalLen:this.isLoop?this.lunList.length+1:this.lunList.length,
            lunboItemNum:this.isLoop?this.lunList.length+2:this.lunList.length,
            realItemNum:this.lunList.length,
            realCurNum:0,
        };
    },
    watch:{
        curNum:function (val,oldVal) { 
            var that=this;
            if (that.isLoop) {
                var len=that.realItemNum;
                var modNum=(val%len+len)%len;
                var oldModNum=(oldVal%len+len)%len;
                if (modNum!=oldModNum) {
                    modNum=modNum-1<0?len-1:modNum-1;
                    that.realCurNum=modNum;
                    that.$emit("change",that.realCurNum);
                } 
            } else {
                that.realCurNum=that.curNum;
                that.$emit("change",that.realCurNum);
            }
        }
    },
    methods:{
        changeItem:function (dir) {
            var that=this;
            var timer=null;

            dir==-1?that.curNum--:that.curNum++;
            clearTimeout(timer);
            that.lunboBox.style.transition=`all ${that.duration}ms ${that.timingFunction} ${that.delay}ms`;
            if (that.isLoop==true && (that.curNum==that.totalLen || that.curNum==0)) {
                timer=setTimeout(function () {
                    that.lunboBox.style.transition="none";
                    that.curNum=that.curNum==0?that.totalLen-1:1;
                    that.lunboBox.style.transform=`translate3d(${-that.curNum*that.offset}%,0,0)`;
                },that.duration+that.delay);
            } else {
                that.curNum=((that.curNum%that.totalLen)+that.totalLen)%that.totalLen;
            }
            // move
            that.lunboBox.style.transform=`translate3d(${-that.curNum*that.offset}%,0,0)`;

        },
        skipItem:function (eq) {
            var that=this;
            
            that.realCurNum=eq; // TODO 
            that.curNum=that.isLoop?eq+1:eq;
            
            // move
            that.lunboBox.style.transition=`all ${that.duration}ms ${that.timingFunction} ${that.delay}ms`;
            that.lunboBox.style.transform=`translate3d(${-that.curNum*that.offset}%,0,0)`;
        },
        autoPlay:function (dir) {
            var that=this;
            var timer=null;

            clearInterval(timer);
            timer=setInterval(function () {
                that.changeItem(dir);
            },that.playDelay);

            return timer;
        },
        init:function () {
            var that=this;
            var lunboDOM=that.lunboBox;

            that.offset=100/(that.lunboItemNum);

            lunboDOM.style.width=`${that.lunboItemNum*100}%`;
            lunboDOM.style.transform=`translate3d(${-that.curNum*that.offset}%,0,0)`;
            // transition 
            lunboDOM.style.transition=`all ${that.duration}ms ${that.timingFunction} ${that.delay}ms`;
    
            that.lunboBox=lunboDOM;
        }
    },
    mounted:function () {
        var that=this;
        var vDoms=that.$refs;
        var timer=null;

        that.lunboBox=vDoms["lunboBox"];
        that.lunboCon=vDoms["lunboCon"];

        // init
        that.init();

        //  autoplay
        if (that.isAutoPlay==true) {
            timer=that.autoPlay(1);
            that.lunboCon.addEventListener("mouseover",function () {
                clearInterval(timer);
            },false);
            that.lunboCon.addEventListener("mouseout",function () {
                timer=that.autoPlay(1);
            },false);
        }

    }
}
</script>
<style scoped>
    *{padding: 0;margin: 0;}
    ul{list-style: none;}
    .lunbo_con{
        position: relative;        
        width:500px;
        height:300px;
        overflow:hidden;
        box-shadow: 0 0 5px 5px #999;
    }
    .con_box{
        display:flex;
        height:100%;
    }
    .box_item{
        width:25%;
        height:100%;
    }
    .lunbo_con:hover .con_btn{
        display: block;
    }
    .con_btn{
        display:none;
        position: absolute;
        top:50%;
        width:30px;
        line-height:30px;
        text-align:center;
        font-size:24px;
        border-radius: 50%;
        transform: translate(0,-50%);
        background-color:rgba(0,0,0,0.35);
        color:#fff;
        cursor: pointer;
    }
    .con_btn.prev{
        left:10px;
    }
    .con_btn.next{
        right:10px;
    }
    .con_dot{
        display: flex;
        position: absolute;
        bottom:20px;
        left:50%;
        transform:translate(-50%,0);
    }
    .dot_item{
        margin:0 5px;
        width:16px;
        height:4px;
        border-radius:3px;
        background-color:rgba(0,0,0,0.35);
        transition:all 0.5s ease;
        cursor: pointer;
    }
    .dot_item:hover{
        background-color:rgba(0,0,0,0.5);
    }
    .dot_item.active{
        width:30px;
        background-color:rgba(0,0,0,0.8);
    }
</style>
