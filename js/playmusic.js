/**
  * Theme: playmusic.js
  *
  *
  */
  
$(function () {
    var flag=false;
    var audio=$("#audio").get(0);
    // init
    audio.pause();
    // 播放与暂停
    $("#playBtn").on("click",function () {
        this.className=!flag?"fa fa-pause":"fa fa-play";
        if (!flag) {
            audio.play()
        } else {
            audio.pause();
        }
        
        flag=!flag;
    });
    // 下一首
    var count=1;
    $("#nextBtn").on("click",function () {
    count=count>7?0:count;
        var firstItemData=JSON.parse(localStorage.getItem("songID-"+count));
        
        $("#playBtn").get(0).className="fa fa-play";
        audio.pause();
        
	    $("#musicPlayer").find("audio").eq(0).attr("src",firstItemData.audioUrl);
	    
	    $("#playBtn").get(0).className="fa fa-pause";
	    audio.play();
	    flag=true;
	    
	    $("#musicPlayer").find(".musicbox_poster").eq(0).css({
	    	"backgroundImage":"url("+firstItemData.posterUrl+")"
	    });
	    
	    $("#musicPlayer").find(".song").eq(0).html(firstItemData.songName);
	    
	    $("#musicPlayer").find(".singer").eq(0).html(firstItemData.singerName+"-"+firstItemData.albumName);
	    
	    count++;
    });
    
    // 上一首
    $("#prevBtn").on("click",function () {
    count=count<0?7:count;
        var firstItemData=JSON.parse(localStorage.getItem("songID-"+count));
        
        $("#playBtn").get(0).className="fa fa-play";
        audio.pause();
        
	    $("#musicPlayer").find("audio").eq(0).attr("src",firstItemData.audioUrl);
	    
	    $("#playBtn").get(0).className="fa fa-pause";
	    audio.play();
	    flag=true;
	    
	    $("#musicPlayer").find(".musicbox_poster").eq(0).css({
	    	"backgroundImage":"url("+firstItemData.posterUrl+")"
	    });
	    
	    $("#musicPlayer").find(".song").eq(0).html(firstItemData.songName);
	    
	    $("#musicPlayer").find(".singer").eq(0).html(firstItemData.singerName+"-"+firstItemData.albumName);
	    
	    count--;
    });
    
    // 切换歌曲
    $("#musicBox").on("click",".listitem",function () {
    
    $("#playBtn").get(0).className="fa fa-play";
	    audio.pause();
    
        $("#musicPlayer").find("audio").eq(0).attr("src",this.dataset.audioUrl);
	    
	    $("#playBtn").get(0).className="fa fa-pause";
	    audio.play();
	    flag=true;
	    
	    $("#musicPlayer").find(".musicbox_poster").eq(0).css({
	    	"backgroundImage":"url("+this.dataset.posterUrl+")"
	    });
	    
	    $("#musicPlayer").find(".song").eq(0).html(this.dataset.songName);
	    
	    $("#musicPlayer").find(".singer").eq(0).html(this.dataset.singerName+"-"+this.dataset.albumName);
	    
    });
});