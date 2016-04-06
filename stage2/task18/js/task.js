/*==========================*/
//    Author:Who am I ?
//    Time:2016-04-06
//    Issues:1. alert(otxt.value);  alert() 括号中返回的类型？
/*==========================*/
    //alert("HelloWorld!");
window.onload=function () {
    mainF();
};
// 主函数
function mainF() {
    var otxt=document.getElementById("txt");
    var obox=document.getElementById("box");
    var abtn=document.getElementsByTagName("input");
    var aArr=[];
    // 从第二个input开始遍历input/button
    for (var j=1;j<abtn.length;j++) {
        abtn[j].onclick=function () {
       if (otxt.value=="") {
           alert("内容不能为空！！！");
       }
       else {
           switch(this.id) {
               case "l-add":
               aArr.unshift(otxt.value);break;
               case "r-add":
               aArr.push(otxt.value);break;
               case "l-del":
               aArr.shift(otxt.value);break;
               case "r-del":
               aArr.pop(otxt.value);break;
               default:alert("switch语句有问题了");break;
           }
           myPrint();
       }
    };
    }
    // 遍历数组函数
    function myPrint() {
       // 数组初始化
       obox.innerHTML="";
       for (var i in aArr) {
           var oli=document.createElement("li");
           oli.innerHTML=aArr[i];
           obox.appendChild(oli);
       }
    }
    
}
