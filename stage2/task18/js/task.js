/*==========================*/
//    Author:Who am I ?
//    Time:2016-04-06
//    Issues:1. alert(otxt.value);  alert() 括号中返回的类型？
//           2. 数组删除问题splice(index,howmany,<item1......>)
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
    var ali=document.getElementsByTagName("li");
    
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
               alert("左删除\n"+aArr[0]);aArr.shift(otxt.value);break;
               case "r-del":
               alert("右删除\n"+aArr[aArr.length-1]);aArr.pop(otxt.value);break;
               default:alert("switch语句有问题了");break;
           }
           myPrint();
           otxt.onfocus=function () {
           otxt.value="";
           };
       }
     };
    }
    
    // 遍历数组函数
    function myPrint() {
       // 初始化
       obox.innerHTML="";
       for (var i in aArr) {
               if (aArr[i]=="空") {
               aArr.splice(i,1);
               }
               else {
               var oli=document.createElement("li");
               oli.innerHTML=aArr[i];
           obox.appendChild(oli);
               }
       }
       myDel();
    }
    // 点击删除元素函数
    function myDel() {
       
       for (var n=0;n<ali.length;n++) {
           ali[n].index=n;
           ali[n].onclick=function () {
               // 删除当前点击的元素
               var Del=aArr.splice(this.index,1,"空");
               obox.removeChild(this);
               
               //alert("被删序号"+this.index+"\n"+"被删的元素："+Del+"\n"+"处理后的数组："+aArr);
           };
       }
    }
}
