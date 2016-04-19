/*=========Who am I ?========
    Author:Who am I ?
    Time:2016-04-15
    Issues:1.
           2.最多添加10个li
           3.分割字符串
           4.分组查询 样式
===========================*/
    // alert("Hello World !");
    
// 添加事件监听
function catchEvent(obj,evnt,func) {
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
// 加载 window
catchEvent(window,'load',mainF);
// 主函数
function mainF() {
    // alert("主函数加载成功！");
    var oTxt=document.querySelector("#txt");
    var oBox=document.querySelector("#box");
    var oladd=document.getElementById("l-add");
    var oradd=document.getElementById("r-add");
    var oldel=document.getElementById("l-del");
    var ordel=document.getElementById("r-del");
    var aBtn=document.querySelectorAll("input[type='button']");
    var btnbox=document.querySelector("#btnbox");
    var aArr=[];
    var oStxt=document.querySelector("#searchtxt");
    var searchBtn=document.querySelector("#search");
    var resetBtn=document.querySelector("#reset");
    var orderBtn=document.querySelector("#order");
    // 正则 数字，中、英文
    var Regnum=/^[0-9]+$/;
    var Regchar=/^[\u4e00-\u9fa5a-zA-Z]+$/;
    // 取任意除 数字 中英文字符
    var Regspec=/[^\d\u4e00-\u9fa5A-Za-z]+/g;
    // 按钮初始化
    btnbox.onmouseover=function () {
        banBtn('cancel-all-ban');
    };
    // 点击事件，修改数组
    oladd.onclick=function () {
        var str=ifVal();
        for (var i in str) {
            aArr.unshift(str[i]);
        }
        myPrint(aArr);
           };
    oradd.onclick=function () {
        var str=ifVal();
        for (var j in str) {
            aArr.push(str[j]);
        }
        myPrint(aArr);
           };
    oldel.onclick=function () {
        ifVal();
        aArr.shift();
        myPrint(aArr);
           };
    ordel.onclick=function () {
        ifVal();
        aArr.pop();
        myPrint(aArr);
           };
           
    // 判断值
    function ifVal() {
        var str=oTxt.value;
        if (str=="") {
            alert("内容不能为空！");
        }
        else {
            // 去空格
            str=str.trim();
            str=str.replace(Regspec, "-").split("-");
            return str;
        }
    }
    
    // 打印、渲染数组元素
    function myPrint(arr) {
        oBox.innerHTML="";
        for (var j=0;j<arr.length;j++) {
            var lis=document.querySelectorAll("#box li");
            var len=lis.length;
            if (len<10) {
                var oli=document.createElement("li");
                oli.innerHTML=arr[j];
                oli.style.left=70*j+"px";
                oli.style.height=(arr[j])*4+20+"px";
                oBox.appendChild(oli);
                // 禁止添加按钮
                banBtn('cancel-ban-add');
            }
            else {
                banBtn('ban-add');
                alert("添加的元素已到达上限！"+len);
                break;
            }
        }
        myDel(arr);
    }
    
    // 点击 删除任意元素
    function myDel(brr) {
        var ali=document.querySelectorAll("#box li");
        for (var k=0;k<brr.length;k++) {
            ali[k].index=k;
            ali[k].onclick=function () {
                brr.splice(this.index,1);
                oBox.removeChild(this);
                // 更新数组
                myPrint(brr);
                alert("更新数组"+brr);
            };
        }
    }
    
    // 禁止按钮事件(input type==button)
    function banBtn(str) {
        var aBtn=document.querySelectorAll("input[type='button']");
        for (var m=0;m<aBtn.length;m++) {
            switch (str) {
                // 禁止所有按钮
                case 'ban-all-btn':
                    aBtn[m].disabled=true;
                    aBtn[m].style.color="#fff";
                    //console.log("ban-all-btn");
                    break;
                // 撤销所有禁止
                case 'cancel-all-ban':
                    aBtn[m].disabled=false;
                    aBtn[m].style.color="#999";
                    //console.log("cancel-all-btn");
                    break;
                // 禁止添加按钮
                case 'ban-add':
                    aBtn[0].disabled=true;
                    aBtn[0].style.color="#fff";
                    aBtn[1].disabled=true;
                    aBtn[1].style.color="#fff";
                    //console.log("ban-add");
                    break;
                // 撤销禁止添加按钮
                case 'cancel-ban-add':
                    aBtn[0].disabled=false;
                    aBtn[0].style.color="#999";
                    aBtn[1].disabled=false;
                    aBtn[1].style.color="#999";
                    //console.log("cancel-ban-add");
                    break;
                default :alert('syntax error line 166');
                    break;
            }
        }

    }
    
    // 模糊查询 高亮元素
    function searchArr(arr,txt) {
        var lis=document.querySelectorAll("#box li");
        var txt=txt.value.split(" ");
        for (var m=0;m<txt.length;m++) {
            for (var n=0;n<arr.length;n++) {
                if (arr[n].search(txt[m])!=-1) {
                    alert("找到了"+aArr[n]);
                    lis[n].style.color="#fff";
                    lis[n].style.background="#f02";
                    continue;
                }
                lis[n].style.background="";
            }
        }
        
    }
    
    // 排序
    function orderArr(arr) {
        arr.sort(function (a,b) {
            return a-b;
        });
        myPrint(arr);
    }
    
    // 重置 清除数组
    function resetArr(arr) {
        var bool=confirm("确定重置 ？");
        if (bool) {
            arr.length=0;
            myPrint(arr);
        }
        
    }
    
    // 调用事件委托
    catchEvent(searchBtn,'click',function () {
        searchArr(aArr,oStxt);
    });
    catchEvent(resetBtn,'click',function () {
        resetArr(aArr);
    }); 
    catchEvent(orderBtn,'click',function () {
        orderArr(aArr);
    }); 
}
