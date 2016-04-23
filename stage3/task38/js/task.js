/**========Who am I ?=========
  *  Author:Who am I ?
  *  Time:2016-04-22
  *  Issues:1.学下自定义对象
============================*/
    // alert("HelloWorld!");
    
// 事件绑定
function addEvent(obj,evnt,func) {
    if (obj.addEventListener) {
        obj.addEventListener(evnt,func,false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent('on'+evnt,func);
    }
    else {
        obj['on'+evnt]=func;
    }
}

// 加载window
addEvent(window,'load',mainF);

// 主函数
function mainF() {
    var oTab=document.getElementById("tab");
    var thData=['科目','英语','数学','化学','物理','计算机','专业课'];
    var tbData=[
        ['张三',67,87,100,56,87,45,79],
        ['李四',98,90,78,100,56,95,67],
        ['王五',67,90,87,70,87,45,79]
        ]; 
    var aBtn=document.getElementsByTagName("input");
    var aArr=[];// 存放 行tr
    
    // 绘制表格
    renderTable(oTab,thData,tbData);
    
    // 排序
    sortNum(oTab,aArr,aBtn);
}

// 绘制表格
function renderTable(tab,hdata,bdata) {
    var htr,ftr,tr,th,ftd,td;
    // 绘制表头 thead
    htr=document.createElement("tr");
    tab.tHead.appendChild(htr);
    for (var k=0;k<7;k++) {
       th=document.createElement("th");
       th.innerHTML=hdata[k];
       htr.appendChild(th);
    }
    // 绘制主体 tbody
    for (var i=0;i<3;i++) {
       tr=document.createElement("tr");
        tab.tBodies[0].appendChild(tr);
        for (var j=0;j<7;j++) {
            td=document.createElement("td");
                td.innerHTML=bdata[i][j];
            tr.appendChild(td);
        }
    }
    // 绘制尾部 tfoot
    ftr=document.createElement("tr");
    tab.tFoot.appendChild(ftr);
    for (var n=0;n<7;n++) {
        ftd=document.createElement("td");
        if (n!=0) {
            ftd.innerHTML="<input type='button' value='升序 ↑' />";
        }
        else {
            ftd.innerHTML="&nbsp;";
        }
        ftr.appendChild(ftd);
    }
}

// 排序(升序/降序)
function sortNum(oTab,aArr,aBtn) {
    var t=1;// 升序
    for (var k=0;k<aBtn.length;k++) {
        aArr.length=0;// 初始化数组
        aBtn[k].index=k;
        addEvent(aBtn[k],'click',function () {
            var that=this.index;
            var atr=oTab.tBodies[0].rows;
            // 标题显示 科目
            document.title=oTab.tHead.rows[0].cells[that+1].innerHTML;
      
            for (var n=0;n<atr.length;n++) {
                aArr[n]=atr[n];
            }
            aArr.sort(function (tr1,tr2) {
                    tr1=parseInt(tr1.cells[that+1].innerHTML);
                    tr2=parseInt(tr2.cells[that+1].innerHTML);
                    if (t==1) {
                        return tr1-tr2;
                    }
                    else {
                        return tr2-tr1;
                    }
                });
                for (var m=0;m<atr.length;m++) {
                oTab.tBodies[0].appendChild(aArr[m]);
                
                }
        if (t==1) {
            aBtn[that].value="降序 ↓";
            aBtn[that].style.color="#0f0";
        }
        else {
            aBtn[that].value="升序 ↑";
            aBtn[that].style.color="#f00";
        }
        t=-t; // 取反
        });
    }
}
