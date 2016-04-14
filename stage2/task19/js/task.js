/*=========Who am I ?========
    Author:Who am I ?
    Time:2016-04-12
    Issues:1.数字10-100
           2.最多添加60个li
           3.排序 柱状图渲染
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
    var aBtn=document.querySelectorAll("input[type='button']");
    var aArr=[];
    var oBtn1=document.querySelector("#order");
    var oBtn2=document.querySelector("#reset");
    
    // 判断值是否在10-100之间
    oTxt.onchange=function () {
        if (oTxt.value<10 || oTxt.value>100) {
            banBtn('ban-all-btn');
        }
        else {
            banBtn('cancel-all-ban');
        }
    };
    
    for (var i=0;i<aBtn.length;i++) {
        // 由于不方便，没有用事件委托
        aBtn[i].onclick=function () {
        ifRun(this.id);
        //alert("数组"+aArr+"\n"+"总长度"+aArr.length);
        
        // 由于不方便，没有用事件委托
        oTxt.onfocus=function () {
           this.value="";
           };
        };
    }
    
    // 判断是添加or删除按钮
    function ifRun(id) {
        switch(id) {
               case "l-add":myAdd(id);
               break;
               case "r-add":myAdd(id);
               break;
               case "l-del":
               alert("左删除\n"+aArr[0]);aArr.shift(oTxt.value);
               break;
               case "r-del":
               alert("右删除\n"+aArr[aArr.length-1]);aArr.pop(oTxt.value);
               break;
               default:alert("switch语句有问题了");
               break;
        }
        myPrint(aArr);
    }
    
    // 添加数组元素
    function myAdd(id) {
         if (oTxt.value=="") {
             alert("内容不能为空或字符串！")
         }
         else if (id=="l-add"){
             aArr.unshift(oTxt.value);
         }
         else if (id=="r-add") {
             aArr.push(oTxt.value);
         }
    }
    
    // 打印、渲染数组元素
    function myPrint(aBrr) {
        oBox.innerHTML="";
        for (var j=0;j<aBrr.length;j++) {
            var lis=document.querySelectorAll("#box li");
            var len=lis.length;
            if (len<60) {
                var oli=document.createElement("li");
                oli.innerHTML=aBrr[j];
                oli.style.color="#f02";
                oli.style.width=30+"px";
                oli.style.height=3*aBrr[j]+"px";
                oli.style.left=50*j+10+"px";
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
        myDel(aBrr);
    }
    
    // 点击 删除任意元素
    function myDel(aBrr) {
        var ali=document.querySelectorAll("#box li");
        for (var k=0;k<aBrr.length;k++) {
            ali[k].index=k;
            ali[k].onclick=function () {
                aBrr.splice(this.index,1);
                oBox.removeChild(this);
                // 更新数组
                myPrint(aBrr);
                alert("更新数组"+aBrr);
            };
        }
    }
    
    // 禁止按钮
    function banBtn(str) {
        var aBtn=document.querySelectorAll("input[type='button']");
        for (var m=0;m<aBtn.length;m++) {
            switch (str) {
                // 禁止所有按钮
                case 'ban-all-btn':
                    aBtn[m].disabled=true;
                    aBtn[m].style.color="#fff";
                    console.log("ban-all-btn");
                    break;
                // 撤销所有禁止
                case 'cancel-all-ban':
                    aBtn[m].disabled=false;
                    aBtn[m].style.color="#999";
                    console.log("cancel-all-btn");
                    break;
                // 禁止添加按钮
                case 'ban-add':
                    aBtn[0].disabled=true;
                    aBtn[0].style.color="#fff";
                    aBtn[1].disabled=true;
                    aBtn[1].style.color="#fff";
                    console.log("ban-add");
                    break;
                // 撤销禁止添加按钮
                case 'cancel-ban-add':
                    aBtn[0].disabled=false;
                    aBtn[0].style.color="#999";
                    aBtn[1].disabled=false;
                    aBtn[1].style.color="#999";
                    console.log("cancel-ban-add");
                    break;
                default :alert('syntax error line 146');
                    break;
            }
        }

    }
    
    // 排序   
    function orderArr(arr) {
        arr.sort(function (a,b) {
            return a-b;
        });
        myPrint(arr);
        alert("排序后数组"+arr);
    }
    
    // 重置 清除数组
    function resetArr(arr) {
        arr.length=0;
        myPrint(arr);
        alert("重置后数组"+arr);
    }
    
    catchEvent(oBtn1,'click',function () {
        orderArr(aArr);
    }); 
    catchEvent(oBtn2,'click',function () {
        resetArr(aArr);
    }); 
}
