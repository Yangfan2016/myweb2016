/**
 *  @Author:Who am I ?
 *  @Time:2016-05-04
 *  @File:compatible.js
 *  @Func:1.阻止冒泡 stopBubble(ev)
 *        2.事件委托
 *  
 */
    // alert("HelloWorld!");

// 阻止冒泡
function stopBubble(ev) {
    var ev=ev ? ev : window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } 
    else {
        ev.cancelBubble=true; // IE 
    }
} 

// 事件委托
function addEvent(obj,evnt,func) {
    if (obj.addEventListener) {
        obj.addEventListener(evnt,func,false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on"+evnt,func);
    }
    else {
        obj["on"+evnt]=func;
    }
}

