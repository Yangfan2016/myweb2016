/*========Who am I ?==========
    Author:Who am I ?
    Time:2016-04-20
    Issues:1.className
============================*/
    // alert("HelloWorld!");
    
window.onload=function () {
    mainF();
};
//  主函数
function mainF() {
    var oDiv1=document.querySelector("#stu");
    var oDiv2=document.querySelector("#nostu");
    var oRadio=document.querySelectorAll("input[type='radio']");
    
    for (var i=0;i<oRadio.length;i++) {
        oRadio[i].index=i;
        oRadio[i].onclick=function () {
            if (this.index==1) {
                oDiv2.className="show";
                oDiv1.className="hide";
            }
            else {
                oDiv1.className="show";
                oDiv2.className="hide";
            }
        };
    }
}
