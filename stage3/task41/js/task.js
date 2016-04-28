/**
*   Author: Who am I ?
*     Time: 2016-04-27
* Requests:1.绘制日历
*          2.可选 年，月
*          3.点击日历中日期，返回所选日期
*          4.日历面板默认隐藏
*   Issues:1.如何返回日期对象 ???
*          2.代码 多 重复
*          3.原型 对象
*   Update:1.更新了样式，只有当前日期高亮，点击其他元素高亮
*          2.增加了选择日期提示
*/ 

/*======原生JavaScript======*/
window.onload=function () {
    var oTab=document.getElementById("tab");
    var oInp=document.getElementById("date");
    var oBtn=document.getElementById("showbtn");
    var aSpan=document.getElementsByTagName("span");
    var oTitle=document.getElementById("title");
    
    calendarF(oTab,oInp,oBtn,aSpan,oTitle);
    
};

/* 日历绘制主函数 函数接口
*  参数 (5个)
*  表格，输入框，按钮，切换按钮(span)，表格标题(span[id="title"])
*/
function calendarF(tab,inp,btn,span,title) {
    var y,m,d,start,week;
    var i;
    // 获取本月月初星期
    var now=new Date();
    y=parseInt(now.getFullYear());
    m=parseInt(now.getMonth());
    d=parseInt(now.getDate());
    start=new Date(y,m,01);
    week=start.getDay();        
    
    /*=============默认隐藏============*/
    title.innerHTML=y+"年"+(m+1)+"月";
    // 绘制表格
    drawTable(tab);
    // 绘制并渲染日历
    drawCalendar(y,m,d,week);
    // 点击日期，返回所选日期
    backDate(tab,inp,btn,y,m);
    // 隐藏面板
    // 默认隐藏日历面板
    tab.style.visibility="hidden";
    /*=============切换后显示============*/
    // 切换年，月
    for (i=0;i<span.length;i++) {
        span[i].index=i;
        span[i].onclick=function () {
        	switch (this.index) {
        	case 0:
                m--;
        	    break;
        	case 1:
                y--;
        	    break;
        	case 3:
        	    y++;
        	    break;
        	case 4:
        	    m++;
        	    break;
        	default:
        	    break;
            }
            // 判断年，月是否超限
            if (m<0) {
                y--; // 去年
                m=11; // 12月
            }
            if (m>11) {
            	y++; // 明年
            	m=0; // 1月
            }
            if (y<1970 || y>2020) {
                y=2016;
                alert("已达到年份上限"+"\n"+"请选择1970-2020之间上的年份！");
            }
            start=new Date(y,m,01);
            week=start.getDay();        
            // 默认标题显示
            title.innerHTML=y+"年"+(m+1)+"月";
            // 清除原有数据
            tab.tBodies[0].innerHTML=" ";
            // 绘制表格
            drawTable(tab);
            // 绘制并渲染日历
            drawCalendar(y,m,d,week);
            // 点击日期，返回所选日期
            backDate(tab,inp,btn,y,m);
        };
    }

}

// 绘制表格
function drawTable(tab) {
    var tr,td;
    var i,j;
    for (i=0;i<6;i++) {
        tr=document.createElement("tr");
        tab.tBodies[0].appendChild(tr);
        for (j=0;j<=6;j++) {
            td=document.createElement("td");
            tr.appendChild(td);
            td.innerHTML="&nbsp;";
        }
    }
}

// 绘制并渲染日历  参数: 2016(年),3(四月),26(日),5(月初的星期)
function drawCalendar(y,m,d,week) {
    var atr=tab.tBodies[0].rows;
    var c=1;
    var i,j,k,n,last;
    var now,y0,m0,d0;// 存储当前日期
    // 获取当前日期
    now=new Date();
    y0=parseInt(now.getFullYear());
    m0=parseInt(now.getMonth());
    d0=parseInt(now.getDate());
    
    // 绘制第一行
    for (j=week;j<=6;j++) {
        atr[0].cells[week+c-1].innerHTML=c;
        c++;
    }
    // 绘制剩余行
    for (i=1;i<6;i++) {
        for (j=0;j<=6;j++) {
        atr[i].cells[j].innerHTML=c;
        c++;
        }   
    } 
    
    // 判断单月(31)，双月(30) 二月, 0-11(一月到十二月)
    switch (m) {
        case 0://1
        case 2://3
        case 4://5
        case 6://7
        case 7://8
        case 9://10
        case 11://12
            last=31;// 单月
            break;
        case 3://4
        case 5://6
        case 8://9
        case 10://11
            last=30;// 双月
            break;
        case 1:
            if (y%400==0 || (y%4==0 && y%100!=0)) {
                last=29;// 闰年二月
            }
            else {
                last=28;// 平年二月
            }
            break;
        default:
            console.log("syntax error switch case");
            break;
    }
    
    // 清除非法日期 并渲染当前日期
    for (k=0;k<atr.length;k++) {
        for (n=0;n<atr[k].cells.length;n++) {
           if (atr[k].cells[n].innerHTML>last) {
               atr[k].cells[n].innerHTML="&nbsp;";
           }
           else if (atr[k].cells[n].innerHTML==d0 && m==m0 && y==y0) {
               atr[k].cells[n].style.color="#20f";
               
           }
        }
    }    
}

// 点击日期，返回所选日期，并隐藏面板
function backDate(tab,inp,btn,y,m) {
    var atr=tab.tBodies[0].rows;
    var k,n;
    var flag=false;
    
    // 点击输入框，显示日历面板
    inp.onfocus=function () {
        tab.style.visibility="";
        flag=!flag; // 取反
    };
    // 点击按钮，显示/隐藏日历面板
    btn.onclick=function () {
        if (flag==false) {
            tab.style.visibility="";
        }
        else {
            tab.style.visibility="hidden";
        }
        flag=!flag;// 取反
    };
    inp.value=null; // 初始化
    for (k=0;k<atr.length;k++) {
        for (n=0;n<atr[k].cells.length;n++) {
           atr[k].cells[n].onclick=function () {
               var d=this.innerHTML;
               if (d!="&nbsp;") {
                   document.title=y+"-"+(m+1)+"-"+d;
                   inp.value=document.title;
                   alert("已选日期"+inp.value);
                   tab.style.visibility="hidden";
               }
               else {
                   alert("亲，看清再选，这里是空的！");
                   tab.style.visibility="";
               }

           };
        }
    } 
}
