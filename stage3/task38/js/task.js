/**  =======================
  *  Author:Who am I ?
  *  Time:2016-04-22
  *  Issues:1.学下自定义对象
  *  Update:1.点击按钮切换排序
  *  =======================
*/

    
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
    var aBtn=document.getElementsByTagName("span");
    var aArr=[];// 存放 行tr
    
    // 绘制表格
    renderTable(oTab,thData,tbData);
    
    // 判断升序/降序
    ifAsc(oTab,aArr,aBtn);
}

// 绘制表格
function renderTable(tab,hdata,bdata) {
    var htr,tr,th,td;
    // 绘制表头 thead
    htr=document.createElement("tr");
    tab.tHead.appendChild(htr);
    for (var k=0;k<7;k++) {
       th=document.createElement("th");
       if (k!=0) {
            th.innerHTML=hdata[k]+"<span>↑</span><span>↓</span>";
        }
        else {
            th.innerHTML=hdata[k];
        }
       
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
   
}

// 排序(升序/降序)
function sortNum(arr,n,order) {
    var tr=tab.tBodies[0].rows;
    // 把 每行 存入数组
    for (var k=0;k<tr.length;k++) {
        arr[k]=tr[k];
    }
    // 对 每行里的单元格里的数据排序
    arr.sort(function (tr1,tr2) {
        tr1=parseInt(tr1.cells[n].innerHTML);
        tr2=parseInt(tr2.cells[n].innerHTML);
        if (order=="asc") {
            return tr1-tr2;
        }
        else {
            return tr2-tr1;
        }
    });
    // 刷新 每行单元格数据
    for (var m=0;m<arr.length;m++) {
        tab.tBodies[0].appendChild(arr[m]);
    }
}

// 判断是否升序
function ifAsc(tab,arr,btn) {
    var th=tab.tHead.rows[0].cells;
    for (var i=1;i<th.length;i++) {
        th[i].index=i;
    }
    
    for (var j=0;j<btn.length;j++) {
        btn[j].index=j;
        addEvent(btn[j],'click',function () {
            var that=this.index;
            var n=this.parentNode.index;
            // 判断是否升序
            if (that%2==0) {
                sortNum(arr,n,'asc');
                // 这里有点耦合，可是又不想放到主函数中  ？？？
            }
            else {
                sortNum(arr,n,'desc');
            }
        });
    }
}
