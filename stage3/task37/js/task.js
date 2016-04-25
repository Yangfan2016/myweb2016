/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-22
    Issues:1.
    Update:1.阻止了按钮冒泡
============================*/
    // alert("HelloWorld!");

// 事件绑定
function addEvent(obj,evnt,func) {
    if (obj.addEventListener) {
        obj.addEventListener(evnt,func,false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent('on'+evnt,func);
    }
    else {
        obj['on'+evnt]=func;
    }
}

// 阻止冒泡
function stopBubble(ev) {
    var ev=ev ? ev :window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    }
    else {
        ev.cancelBubble=true;
    }
}

addEvent(window,'load',mainF);

// 主函数
function mainF() {
    var openbtn=document.getElementById("openwin");
    var okbtn=document.getElementById("okbtn");
    var dialog=document.getElementById("dialog");
    var body=document.getElementsByTagName("body")[0];
    
    // 点击弹出按钮，弹出窗口,阻止body冒泡
    addEvent(openbtn,'click',function () {
        isShow(true);
        stopBubble(event);
    });
    // 点击确定按钮，关闭窗口
    addEvent(okbtn,'click',function () {
        isShow(false);
    });
    // 点击弹出框，阻止body冒泡
    addEvent(dialog,'click',function () {
        stopBubble(event);
    });
    // 点击浮层，关闭窗口
    addEvent(body,'click',function () {
        isShow(false);
    });
    
    // 控制弹出框显示与隐藏
    function isShow(bool) {
        if (bool) {
            dialog.className="model";
            body.className="floatlay";
        }
        else {
            dialog.className="hide";
            body.className="normal";
        }
    }
}
