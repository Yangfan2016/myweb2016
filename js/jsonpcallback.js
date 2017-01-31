/**
  * Theme: jsonpcallback.js
  *
  */

var count=0;

function jsonpcallback(data) {
	var songName=data.result['songs'][0]['name'],
		singerName=data.result['songs'][0]['artists'][0]['name'],
		albumName=data.result['songs'][0]['album']['name'],
		audioUrl=data.result['songs'][0]['audio'],
		posterUrl=data.result['songs'][0]['album']['picUrl'],
		errorCode=data.code;

	// 存储本地数据
	localStorage.setItem("songID-"+count,JSON.stringify({
		'songName':songName,
		'singerName':singerName,
		'albumName':albumName,
		'audioUrl':audioUrl,
		'posterUrl':posterUrl,
		'errorCode':errorCode
	}));

	// 生成musiclist
	var $musicItems=$("#musicBox .listitem");
    $musicItems.eq(count).find(".song").eq(0).html(songName);
    $musicItems.eq(count).find(".singer").eq(0).html(singerName+"-"+albumName);
    // 存储html-data数据
    $musicItems.get(count).dataset.songName=songName;
    $musicItems.get(count).dataset.singerName=singerName;
    $musicItems.get(count).dataset.albumName=albumName;
    $musicItems.get(count).dataset.audioUrl=audioUrl;
    $musicItems.get(count).dataset.posterUrl=posterUrl;

    // 初始化播放器
    if (count===7) {
    	var firstItemData=JSON.parse(localStorage.getItem("songID-0"));
	    $("#musicPlayer").find("audio").eq(0).attr("src",firstItemData.audioUrl);
	    $("#musicPlayer").find(".musicbox_poster").eq(0).css({
	    	"backgroundImage":"url("+firstItemData.posterUrl+")"
	    });
	    $("#musicPlayer").find(".song").eq(0).html(firstItemData.songName);
	    $("#musicPlayer").find(".singer").eq(0).html(firstItemData.singerName+"-"+firstItemData.albumName);
    }
    
    
	count++;
}

// example

// jsonpcallback({
//   'result': {
//     'songCount': 2301,
//     'songs': [
//       {
//         'id': 440241144,
//         'name': '告白气球',
//         'artists': [
//           {
//             'id': 1081635,
//             'name': '周二珂',
//             'picUrl': null
//           }
//         ],
//         'album': {
//           'id': 34986028,
//           'name': '告白气球',
//           'artist': {
//             'id': 0,
//             'name': '',
//             'picUrl': null
//           },
//           'picUrl': 'http://p1.music.126.net/m3_elKryq_x62UNHJ2NgHg==/109951162807555886.jpg'
//         },
//         'audio': 'http://m2.music.126.net/GvIMZ5ZW0l04xFMVYtTy8g==/18502581673300022.mp3',
//         'djProgramId': 0,
//         'page': 'http://music.163.com/m/song/440241144'
//       }
//     ]
//   },
//   'code': 200
// })
