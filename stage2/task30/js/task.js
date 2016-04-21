/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-20
    Issues:1.className？？？
           2.提交全部验证？？？
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
    var aArr=[];
    
    for (var i=0;i<aInp.length-1;i++) {
        aInp[i].index=i;
        aInp[i].bool=false;
        aInp[i].onfocus=function () {
            var that=this.index;
            
            // 初始化样式
            oSpan[that].style.color="";
            aInp[that].style.border="";
            
            switch (that) {
                case 0:oSpan[that].innerHTML="请输入4-16为中英文字符";
                break;
                case 1:oSpan[that].innerHTML="请输入11为数字密码";
                break;
                case 2:oSpan[that].innerHTML="再次确认密码";
                break;
                case 3:oSpan[that].innerHTML="请输入邮箱地址";
                break;
                case 4:oSpan[that].innerHTML="请输入11为电话号码";
                break;
                default:alert("syntax error 'switch case'!");break;
            }
        };
        
        aInp[i].onblur=function () {
            var that=this.index;
            switch (that) {
                case 0:aInp[i].bool=checkName(aInp[that].value);
                if (aInp[i].bool) {
                    oSpan[that].innerHTML="格式正确！";
                }
                else {
                    oSpan[that].innerHTML="请输入4-16为中英文字符！";
                }
                changeCls(that,aInp[i].bool);
                break;
                case 1:aInp[i].bool=checkPW(aInp[that].value);
                if (aInp[i].bool) {
                    oSpan[that].innerHTML="格式正确！";
                }
                else {
                    oSpan[that].innerHTML="请输入11为数字密码！";
                }
                changeCls(that,aInp[i].bool);
                break;
                case 2:aInp[i].bool=checkPW(aInp[that].value);
                if (aInp[i].bool && aInp[that].value==aInp[that-1].value) {
                    oSpan[that].innerHTML="格式正确！";
                }
                else {
                    oSpan[that].innerHTML="请再次确认！";
                }
                changeCls(that,aInp[i].bool);
                break;
                case 3:aInp[i].bool=checkEmail(aInp[that].value);
                if (aInp[i].bool) {
                    oSpan[that].innerHTML="格式正确！";
                }
                else {
                    oSpan[that].innerHTML="请输入正确的邮箱格式！";
                }
                changeCls(that,aInp[i].bool);
                break;
                case 4:aInp[i].bool=checkCall(aInp[that].value);
                if (aInp[i].bool) {
                    oSpan[that].innerHTML="格式正确！";
                }
                else {
                    oSpan[that].innerHTML="请输入11位电话号码！";
                }
                changeCls(that,aInp[i].bool);
                break;
                default:alert("syntax error 'switch case'!");break;
            }
            
        };
    }
    
    oBtn.onclick=function () {
        checkAll(aInp);
    };
    
    // 改变样式
    function changeCls(n,bool) {
        if (bool) {
            oSpan[n].style.color="hsla(125,100%,50%,0.7)";
            aInp[n].style.border="1px solid hsla(125,100%,50%,0.7)";
        }
        else {
            oSpan[n].style.color="hsla(0,100%,50%,0.7)";
            aInp[n].style.border="1px solid hsla(0,100%,50%,0.7)";
        }
    }

}

// 提交验证
function checkAll(inp) {
    var f=0;
    var t=0;
    for (var j=0;j<inp.length-1;j++) {
        if (!inp[j].bool) {
            f++;
            alert("请仔细检查！"+f);
            changeCls(j,false);
            break;
        }
        else {
            changeCls(j,true);
            t++;
            if (t==inp.length-2) {
                alert("提交成功！"+t);
                break;
            }
        }
    }
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
    var Regnum=/[0-9]{6,11}/g;
    if (val!="") {
        if (Regnum.test(val)) {
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

// 邮箱 规则验证
function checkEmail(val) {
    var Regemail=/^\w+@[0-9A-Za-z]+\.com$/g;
    if (val!="") {
        if (Regemail.test(val)) {
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

// 电话 规则验证
function checkCall(val) {
    var Regnum=/^1[3|5|7|8]\d{9}$/g;
    if (val!="") {
        if (Regnum.test(val)) {
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
