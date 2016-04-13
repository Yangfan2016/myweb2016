/*=========Who am I ?=========
    Author:Who am I ?
    Time:2016-04-06
    Issues:1.事件监听 不方便，还得重新声明函数名
           2.
============================*/
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
    for (var i=0;aBtn.length;i++) {
        // 由于不方便，没有用事件监听
        aBtn[i].onclick=function () {
        ifRun(this.id);
        alert("数组"+aArr+"\n"+"剩余长度"+aArr.length);
        // 由于不方便，没有用事件监听
        oTxt.onfocus=function () {
           this.value="";
           };
        };
    }
    // 添加or删除
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
             alert("内容不能为空！")
         } 
         else if (id=="l-add"){
             aArr.unshift(oTxt.value);
         }
         else if (id=="r-add") {
             aArr.push(oTxt.value);
         }
    }
    // 打印数组元素
    function myPrint(aBrr) {
        oBox.innerHTML="";
        for (var j=0;j<aBrr.length;j++) {
            var oli=document.createElement("li");
            oli.innerHTML=aBrr[j];
            oBox.appendChild(oli);
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
}
