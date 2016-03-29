/*=======Who am I ?=========
    Author:Who am I ?
    Time:2016-03-27
    Issues:1.正则表达式不会，照办过来的
           2.代码没优化(手机端手打)
           3.数据删除没弄好 
           
===========================*/
// 加载主函数
window.onload=function () {
   mainF();
};
// 主函数
function mainF() {
   var city=document.getElementById("aqi-city-input");
   var num=document.getElementById("aqi-value-input");
   var cwarn=document.getElementById("citywarn");
   var nwarn=document.getElementById("numwarn");
   var obtn=document.getElementById("add-btn");
   var Regnum=/^[0-9]+$/;
   // 正则 匹配数字  ？？？
   var Regcity=/^[\u4e00-\u9fa5a-zA-Z]+$/;
   // 正则 匹配中英文字符   ？？？
   var otab=document.getElementById("aqi-table");
   // 自定义对象 存放数据
   var odata=new Object();
   // 创建表头
   var otr=document.createElement("tr");
   otr.innerHTML="<td>城市</td><td>指数</td><td>操作</td>";
   otab.appendChild(otr);
   // 点击事件 调用匹配函数
   obtn.onclick=function () {
      if (city.value=="" || num.value=="") {
         alert("请输入完整");
         
      }
      else{ 
         var clab=iftxt(Regcity,city.value,cwarn);
         var nlab=ifnum(Regnum,num.value,nwarn);
         var bool=ifadd(clab,nlab);
         if(bool){
         // 满足条件，存储数据
            odata[city.value]=num.value;
            createTd(otab,odata);
         }
      }
   };
}
// 判断城市是否为中英文字符
function iftxt(Regc,cval,cwarn) {
   var flag=1;
   if (!Regc.test(cval)) {
      cwarn.innerHTML="请输入中英文字符";
      cwarn.style.color="red";
      flag=0;
   }
   else{
      cwarn.innerHTML="中英文对了";
      cwarn.style.color="green";
   }
   return flag;
}
// 判断指数是否为数字(0-9)
function ifnum(Regn,nval,nwarn) {
   var flag=1;
   if (!Regn.test(nval)) {
      nwarn.innerHTML="请输入0-9范围数字";
      nwarn.style.color="red";
      flag=0;
   }
   else{
      nwarn.innerHTML="数字对了";
      nwarn.style.color="green";
   }
   return flag;
}
// 判断是否能添加
function ifadd(cflag,nflag) {
   if (cflag==1 && nflag==1) {
      alert("完全符合要求");
      return true;
   }
   else{
      alert("再仔细看看，是不是填错了");return false;
   }
}
// 创建表格，添加数据
function createTd(tab,odata) {
   var otrs=document.createElement("tr");
   for (var item in odata) {
      otrs.innerHTML="<td>"+item+"</td>"+"<td>"+odata[item]+"</td>"+"<button class='dele'>删除</button>";
      alert('\"'+item+'\"'+'\t'+'\"'+odata[item]+'\"'+"已经添加");
   }
   tab.appendChild(otrs);
   var obtns=document.getElementsByTagName("button");
   for (var i=0;i<obtns.length;i++) {
      if (obtns[i].className=="dele") {
      // 满足条件，移除当前元素
         obtns[i].onclick=function () {
         var bool=confirm("确定删除");
         if (bool) {
            var otr=this.parentNode;
            tab.removeChild(otr);
         }    
        }
      }
   }
}
