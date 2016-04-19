/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-17
    Issues:1.字符串去重
           2.键盘事件
============================*/
    // alert("HelloWorld !");
    
/*==========函数封装区========*/

// 事件委托
function catchEvent(obj,evnt,func) {
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

//  获取单个元素
function $(id) {
    return document.querySelector(id);
}

//  获取元素集合
function $$(cls) {
    return document.querySelectorAll(cls);
}

//  字符串处理函数
function ifRun(str,arr,box) {

    var re=/[^a-zA-Z\u4e00-\u9fa5\d]+/g;
    if (str==" ") {
        alert("内容不能为空或空格！");
    }
    else {
        // 去空格
        str=str.trim();
        // 分割字符串
        str=str.replace(re," ").split(" ");
        // 去重？？？？？

        // 存入数组
        for (var i=0;i<str.length;i++) {
            arr.unshift(str[i]);
        }
        // 渲染列表
        renderList(arr,box);
    }
}

//  渲染列表
function renderList(arr,box) {
    // 初始化
    box.innerHTML="";
    for (var j=0;j<arr.length;j++) {
        var lis=box.getElementsByTagName("li");
        var len=lis.length;
        if (len>=10) {
            arr.length=10;
        }
        else {
            var oli=document.createElement("li");
            oli.innerHTML=arr[j];
            box.appendChild(oli);
        }
    }
    highLight(box);
    deleList(arr,box);
}
//  删除元素
function deleList(arr,box) {
    var lis=box.getElementsByTagName("li");
    var len=lis.length;
    for (var k=0;k<len;k++) {
        lis[k].index=k;
        lis[k].onclick=function () {
            arr.splice(this.index,1);
            console.log(arr);
            box.removeChild(this);
            console.log(lis.length);
            // 更新列表
            renderList(arr,box);
        };
    }
}

//  高亮元素
function highLight(box) {
    var val=null;
    var lis=box.getElementsByTagName("li");
    for (var m=0;m<lis.length;m++) {
        lis[m].index=m;
        lis[m].onmouseover=function () {
            val=this.innerHTML;
            this.innerHTML="删除"+val;
        };
        lis[m].onmouseout=function () {
            this.innerHTML=val;
        };
    }
}


/*===========主代码区=========*/

// 加载 window
catchEvent(window,'load',mainF);

// 主函数
function mainF() {
    var oTxt1=$("#hobby1");
    var oTxt2=$("#hobby2");
    var oBtn2=$("#okbtn");
    var oBox1=$("#tagbox1");
    var oBox2=$("#tagbox2");
    var aArr=[];
    //aArr.length=10;
    var aBrr=[];
/*----------tag1------------*/

// tag1
catchEvent(oTxt1,'change',function () {
    var str=oTxt1.value;
    ifRun(str,aArr,oBox1);

});

/*----------tag2------------*/

// tag2
catchEvent(oBtn2,'click',function () {
    var str=oTxt2.value;
    ifRun(str,aBrr,oBox2);

});

}
