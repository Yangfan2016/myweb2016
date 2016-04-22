/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-22
    Issues:1.
============================*/
    // alert("HelloWorld!");

window.onload=function () {
    mainF();
}

// 主函数
function mainF() {
    var openbtn=document.getElementById("openwin");
    var okbtn=document.getElementById("okbtn");
    var dialog=document.getElementById("dialog");
    var body=document.getElementsByTagName("body")[0];
    
    // 点击弹出按钮，弹出窗口
    openbtn.onclick=function () {
        dialog.className="model";
        body.className="floatlay";
    };
    okbtn.onclick=function () {
        dialog.className="hide";
        body.className="normal";
    };
}
