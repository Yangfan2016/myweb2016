/**
  * Author: Who am I
  * Theme: Personal website
  * Dependent: zeptoJS
  */

/**
  * @Param: end,[duration],[callback]
  *
  */
function self_scrollTo() {
    var start=-1,
        end=Math.round(arguments[0]),
        duration=arguments[1] || 500,
        speed=0,
        callback=arguments[2] || null,
        flag=1,
        timer=null;

    clearInterval(timer);
    start=document.documentElement.scrollTop || document.body.scrollTop;
    flag=(end-start)>0?flag:-flag;
    
    timer=setInterval(function () {
        if (start===end) {
            clearInterval(timer);
            console.info("======done======");
            callback && callback();
        } else {
            start=document.documentElement.scrollTop || document.body.scrollTop;
            speed=(end-start)/duration*80;
            speed=Math.abs(speed)<=5?flag:speed;
            speed=(end-start)>0?Math.floor(speed):Math.ceil(speed);
            document.documentElement.scrollTop+=speed;
            document.body.scrollTop+=speed;
            console.log(speed,start);
        }
    },30);
    
}

$(function () {
    var timer=null;
    var hideNav=function () {
        $("#mainNav").animate({
            "left":"-81px"
        },500,"ease-out");
        $("#pageMain").animate({
            "left":"0"
        },500,"ease-out");
        $("#backScreen").css({
            "display":"none"
        });
    };
    // init
    self_scrollTo(0,200,function () {
        // 存放导航模块位置信息
        $(".body_module").each(function (index,item) {
            localStorage.setItem(index,item.getBoundingClientRect().top);
        });
        // mobile
        $("#mainNav .nav_item").each(function (index,item) {
            this.dataset.scrollTo=localStorage.getItem(index);
        });
        // PC
        $("#mainNav_PC .nav_btn").each(function (index,item) {
            this.dataset.scrollTo=localStorage.getItem(index);
        });
    });
    // show nav
    $("#mainBody").on("swipeRight",function () {
        $("#mainNav").animate({
            "left":"0"
        },500,"ease-out");
        $("#pageMain").animate({
            "left":"81px"
        },500,"ease-out");
        $("#backScreen").css({
            "display":"block"
        });
    });
    // hide nav
    $("#backScreen").on("touchstart",function () {
        if ($("#pageMain").position().left!=0) {
            hideNav();
        }
    });
    // show the button of back to top
    $("#pageMain").on("touchmove mousewheel",function () {
        clearTimeout(timer);
        $("#backTop").css("opacity",1);
        timer=setTimeout(function () {
            $("#backTop").css("opacity",0);
        },2500);
    });
    // back to top
    $("#backTop").on("click",function () {
        self_scrollTo(0,200);
    });
    // navPic back to top
    $("#navPic").on("touchstart",function () {
        self_scrollTo(0,200,hideNav);
    });
    // 导航 跳入指定锚点
    // mobile
    $("#mainNav").on("touchstart",".nav_item",function () {
        self_scrollTo(this.dataset.scrollTo,200,hideNav);
    });
    // PC
    $("#mainNav_PC").on("click",".nav_btn",function () {
        self_scrollTo(this.dataset.scrollTo,200);
    });
    
});
