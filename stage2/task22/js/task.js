/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-19
    Issues:1.
============================*/
    // alert("HelloWorld !");
    
// 获取单个元素
function $(id) {
    return document.querySelector(id);
}

// 获取元素集合
function $$(name) {
    return document.querySelectorAll(name);
}

//  二叉树生成器
function makeTree(pnode) {
    var l,r;
    l="<div class='left'></div>";
    r="<div class='right'></div>";
    for (var i=0;i<2;i++) {
        pnode.innerHTML=l+r;
        pnode.childNodes[0].innerHTML=l+r;
        pnode.childNodes[1].innerHTML=l+r;
    }
    var aDiv=$$("div");
    hightLight(aDiv,i);
}

// 高亮元素   前序遍历
function hightLight(aDiv) {
    var timer=null;
    var i=0;
    timer=setInterval(function () {
        // 清除所有div的背景色
        for (var j=0;j<aDiv.length;j++) {
            aDiv[j].style.background="";
        }
        if (i<=14) {
            aDiv[i].style.background="blue"; // 前序遍历
        
        }
        else {
            clearTimeout(timer);
            alert("前序遍历完"+i);
        }
        i++;
    },500);
}

// 加载window
window.onload=function () {
    mainF();
};

// 主函数 
function mainF() {
    var root=$("#root");
    var left=$$(".left");
    var right=$$(".right");
    // 生成二叉树   前序
    makeTree(left[0]);
    makeTree(right[0]);
    
}
