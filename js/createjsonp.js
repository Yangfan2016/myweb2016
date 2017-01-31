/**
  * Theme: createjsonp.js
  *
  */

var musicList=[{
	"songName":"告白气球"
},{
	"songName":"认真的雪"
},{
	"songName":"小幸运（Cover 田馥甄）"
},{
	"songName":"火星人来过"
},{
	"songName":"爱的双重魔力"
},{
	"songName":"说爱你"
},{
	"songName":"空城"
},{
	"songName":"醉清风"
}];

$(function () {
	// 创建JSONP
	function createJsonp(songName) {
		var scriptMusic=document.createElement("script");
		scriptMusic.defer=true;
		scriptMusic.src="http://s.music.163.com/search/get/?type=1&limit=1&s="+encodeURIComponent(songName)+"&callback=jsonpcallback";
		document.body.appendChild(scriptMusic);
	}

	// 生成musiclist
    var i=0,
    	len=$("#musicBox").get(0).dataset.maxLength;
    $("#musicBox").html(" ");
    for (;i<len;i++) {
	    // 生成html模板
	    $("#musicBox").append(`
			<li class="listitem" data-song-name="404" data-singer-name="404" data-album-name="404" data-pic-url="404" data-audio-url="404">
	        	<div class="index">`+(+i+1)+`</div>
	        	<div class="info">
	            	<p class="song">--404--</p>
	            	<p class="singer">--404--</p>
	         	</div>
	      	</li>
	    `);
	    // 请求数据
	    createJsonp(musicList[i]['songName']);
    }
    
});