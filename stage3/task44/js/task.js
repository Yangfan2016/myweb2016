/**
  *  @Author:Who am I ?
  *  @Time:2016-05-04
  *  @File:waterFall(瀑布流)
  *  @Request:1.点击图片，显示遮照
  *  @Issues:1.AJAX 学
  *          2.代码冗余
  *  @Update:1.事件委托
  *          2.事件绑定
  */
    // alert("HelloWorld!");

addEvent(window,"load",function () {
    var aBox=[]; // 存放"<div class='box'>...</div>"盒子
    addPic("main","box","pic",12); // 初始化 添加图片
    waterFall("main","box"); // 瀑布流函数
    aBox=userAction("addbtn","delebtn","main"); // 用户操作
    showBigPic("dialog","mask",aBox,"main"); // 放大显示图片
}
);  

// 放大显示图片,点击遮照消失
function showBigPic(dia_id,body_cls,boxs,m_id) {
    var body=document.querySelector("body");
    var main=document.getElementById(m_id);
    var dialog=document.getElementById(dia_id);
    
    // 事件委托
    addEvent(main,"click",function (ev) {
        var ev=ev?ev:window.event;
        var target=ev.target?ev.target:ev.srcElement;
        stopBubble(ev); // 阻止body冒泡
        if (target.nodeName.toLowerCase()=="img") {
            dialog.innerHTML=target.parentNode.parentNode.innerHTML;
            dialog.style.display="block";
            body.className=body_cls;
        }
    });
    
    // 点击遮照消失
    addEvent(body,"click",function () {
        dialog.style.display="none";
        body.className="";
    });
    
    
}

// 用户操作
function userAction(add_id,dele_id,m_id) {
    var oBtn_add=document.getElementById(add_id);
    var oBtn_dele=document.getElementById(dele_id);
    var oPar=document.getElementById(m_id);
    var aImg=document.querySelectorAll("#"+m_id+" img");
    var aBox=document.querySelectorAll("#"+m_id+" .box");
    
    addEvent(oBtn_add,"click",function () {
        alert("添加一张图片！");
        addPic("main","box","pic",1);
        waterFall("main","box");
        aBox=document.querySelectorAll("#"+m_id+" .box");
        showBigPic("dialog","mask",aBox);
    });
   
    addEvent(oBtn_dele,"click",function () {
        alert("删除最后一张图片！");
        aImg=document.querySelectorAll("#"+m_id+" img");
        var len=aImg.length;
        var lastnode=aImg[len-1].parentNode.parentNode;
        oPar.removeChild(lastnode);
        waterFall("main","box");
        aBox=document.querySelectorAll("#"+m_id+" .box");
        showBigPic("dialog","mask",aBox);
    });

     return aBox;
   
} 
    
// 添加图片
function addPic(id,cls,cls2,len) {
    var oPar=document.getElementById(id);
    var Ran=Math.floor(12*(Math.random())); // 随机显示图片 图片库（12张）
    for (var i=0;i<len;i++) {
        if (len==1) {
            i=Ran; // 如果只添加一张图片,就随机选取图片
            console.log(i);
        }

        var oBox=document.createElement("div");
        var oPic=document.createElement("div");
        var oImg=document.createElement("img");
        oPar.appendChild(oBox);
        oBox.appendChild(oPic);
        oPic.appendChild(oImg);
        oBox.className=cls;
        oPic.className=cls2;
        oImg.src="./images/"+i+".jpg";
        oImg.alt=i;
    }
    
}
// 瀑布流
function waterFall(id,cls) {
    var oPar=document.getElementById(id);
    var aBox=document.querySelectorAll("."+cls);
    var box_w=aBox[0].offsetWidth; // 获取box[0]的宽
    var screen_w=document.documentElement.clientWidth || document.body.clientWidth; // 获取屏幕的宽
    var cols=Math.floor(screen_w/box_w); // 计算列数
    
    // 设置父容器的宽，并居中
    oPar.style.cssText="margin:0 auto;"+"width:"+cols*box_w+"px"; 
    
    // 获取最小高度，并设置剩余行的位置
    var arr=[],
        min_h=null,
        min_i=null;
    for (var i=0;i<aBox.length;i++) {
        if (i<cols) {
            arr.push(aBox[i].offsetHeight);
        }
        else {
            min_h=Math.min.apply(null,arr);
            min_i=getBoxindex(arr,min_h);
            aBox[i].style.position="absolute";
            aBox[i].style.top=min_h+"px";
            aBox[i].style.left=aBox[min_i].offsetLeft+"px";
            arr[min_i]+=aBox[i].offsetHeight;
        }
    }

}

// 获取最小高度的索引
function getBoxindex(arr,val) {
    for (var i=0;i<arr.length;i++) {
        if (arr[i]==val) {
            return i;
        }
    }
}
