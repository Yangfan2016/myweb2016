/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-20
    Issues:1.className
============================*/
    // alert("HelloWorld!");
    
window.onload=function () {
    mainF();
};

// 主函数
function mainF() {
    var oTxt=document.querySelector("#txt");
    var oBtn=document.querySelector("#btn");
    var oSpan=document.querySelectorAll("#main span")[0];
    
    oBtn.onclick=function () {
        var val=oTxt.value;
        if (val!="") {
            oTxt.style.border="";
            oSpan.style.color="";
            oSpan.innerHTML="请输入4-16位中英文字符";
            if (checkValue(val)) {
                addCls(true);
           oSpan.innerHTML="格式正确！";
            }
            else {
                addCls(false);
           oSpan.innerHTML="请输入4-16位中英文字符！";
            }
        }
        else {
           addCls(false);
           oSpan.innerHTML="必填项！";
        }
    };
    
    // 正确or错误  改变样式
    function addCls(bool) {
        if(bool) {
            oTxt.style.border="1px solid hsla(125,100%,50%,0.7)";
            oSpan.style.color="hsla(125,100%,50%,0.7)";
        }
        else {
            oTxt.style.border="1px solid hsla(0,100%,50%,0.7)";
            oSpan.style.color="hsla(0,100%,50%,0.7)";
        }
    }
    
}



// 规则验证
function checkValue(val) {
    var Regchar=/[\u4e00-\u9fa5]/;
    var Regletter=/[a-zA-Z]/;
    var n=0;
    for (var i=0;i<val.length;i++) {
            if (Regchar.test(val[i])) {
                n=n+2;
            }
            if (Regletter.test(val[i])) {
                n=n+1;
            }
        }
        if (n>=4 && n<=16) {
            return true;
        } 
        else {
            return false;
        }
        
}
