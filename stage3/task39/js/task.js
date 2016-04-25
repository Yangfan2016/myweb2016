/**
 * Created by dell on 2016/4/24.
 * Who am I ?
 * Issues:1.表头有点偏移
 */
    // alert("hello world !");
window.onload=function () {
    mainF();
};
// 主函数
function mainF() {
    var oTab=document.getElementById("tab");
    var oHtr=oTab.tHead.rows[0];

    document.onscroll=function () {
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        if (oTab.offsetTop-scrolltop<0) {
            oHtr.style.position="fixed";
            oHtr.style.top=0;
            oHtr.style.left=202;
            oHtr.cells[0].width=6+"em";
            if (scrolltop-(oTab.offsetHeight+oTab.offsetTop)>0) {
                oHtr.style.position="";
            }
        }
        else {
            oHtr.style.position="";
        }
        console.log("表格距离上顶距"+(oTab.offsetTop-scrolltop));
    };
}
