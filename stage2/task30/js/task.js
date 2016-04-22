/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-20
    Issues:1.className？？？
           2.封装了函数
           3.优化了代码
============================*/
    // alert("HelloWorld!");
    
window.onload=function () {
    mainF();
};

// 主函数
function mainF() {
    var aInp=document.querySelectorAll("input");
    var oBtn=document.querySelector("#btn");
    var oSpan=document.querySelectorAll("#main span");
    
    // 遍历所有input 除最后一个按钮外
    for (var i=0;i<aInp.length-1;i++) {
        aInp[i].index=i;
        aInp[i].bool=false;
        aInp[i].onfocus=function () {
            var that=this.index;
            
            // 初始化样式
            oSpan[that].style.color="";
            aInp[that].style.border="";
            ifShow(oSpan,that);
        };
        
        aInp[i].onblur=function () {
            var that=this.index;
            ifTure(aInp,oSpan,that);
        };
        
    }
    
    // 提交验证
    oBtn.onclick=function () {
        
        for (var k=0;k<aInp.length-1;k++) {
            ifTure(aInp,oSpan,k);
            }
            alert("请查看提示信息确认！");
    }; 
    
    
    

}


// 改变样式
function changeCls(aInp,oSpan,n,bool) {
    if (bool) {
        oSpan[n].style.color="hsla(125,100%,50%,0.7)";
        aInp[n].style.border="1px solid hsla(125,100%,50%,0.7)";
    }
    else {
        oSpan[n].style.color="hsla(0,100%,50%,0.7)";
        aInp[n].style.border="1px solid hsla(0,100%,50%,0.7)";
    }
}

// 获得焦点显示规则函数
function ifShow(oSpan,that) {
    switch (that) {
        case 0:oSpan[that].innerHTML="请输入4-16为中英文字符";
            break;
        case 1:oSpan[that].innerHTML="请输入6-11位密码";
            break;
        case 2:oSpan[that].innerHTML="再次确认密码";
            break;
        case 3:oSpan[that].innerHTML="请输入邮箱地址";
            break;
        case 4:oSpan[that].innerHTML="请输入11为电话号码";
            break;
        default:alert("syntax error 'switch case'!");
            break;
    }
}

// 失去焦点验证规则函数
function ifTure(aInp,oSpan,that) {
    switch (that) {
        case 0:aInp[that].bool=checkName(aInp[that].value);
        if (aInp[that].bool) {
            oSpan[that].innerHTML="格式正确！";
        }
        else {
            oSpan[that].innerHTML="请输入4-16为中英文字符！";
        }
            break;
        case 1:aInp[that].bool=checkPW(aInp[that].value);
        if (aInp[that].bool) {
            oSpan[that].innerHTML="格式正确！";
        }
        else {
            oSpan[that].innerHTML="请输入6-11位密码！";
        }
            break;
        case 2:aInp[that].bool=checkPW(aInp[that].value);
        if (aInp[that].bool) {
            if (aInp[that].value==aInp[that-1].value) {
                oSpan[that].innerHTML="格式正确！";
            }
            else {
                oSpan[that].innerHTML="两次输入不一致！";
                aInp[that].bool=false; 
            }
        }
        else {
            oSpan[that].innerHTML="密码格式不对！";
        }
            break;
        case 3:aInp[that].bool=checkEmail(aInp[that].value);
            if (aInp[that].bool) {
                oSpan[that].innerHTML="格式正确！";
            }
            else {
                oSpan[that].innerHTML="请输入正确的邮箱格式！";
            }
                break;
            case 4:aInp[that].bool=checkCall(aInp[that].value);
            if (aInp[that].bool) {
                oSpan[that].innerHTML="格式正确！";
            }
            else {
                oSpan[that].innerHTML="电话格式不对！";
            }
                break;
            default:alert("syntax error 'switch case'!");
                break;
            }
            changeCls(aInp,oSpan,that,aInp[that].bool);
}

// 姓名 规则验证
function checkName(val) {
    var Regchar=/[\u4e00-\u9fa5]/;
    var Regletter=/[a-zA-Z]/;
    var n=0;
    if (val!="") {
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
    else {
        return false;
    }
}

// 密码 规则验证
function checkPW(val) {
    var Regnum=/[0-9A-Za-z]{6,11}/g;
    return returnYN(Regnum,val);
}

// 邮箱 规则验证
function checkEmail(val) {
    var Regemail=/^\w+@[0-9A-Za-z]+\.com$/g;
    return returnYN(Regemail,val);
}

// 电话 规则验证
function checkCall(val) {
    var Regnum=/^1[3|5|7|8]\d{9}$/g;
    return returnYN(Regnum,val);
}

// 规则验证 返回 true,false
function returnYN(re,val) {
    if (val!="") {
        if (re.test(val)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
