// 生成geojson文件
var filename='';
var changeToGeoJSON=(drawType,coords)=>{
	// drawType:'Polygon' | 'LineString'
	let geojson={
		"type": "FeatureCollection",
		"features": [
			{
			  "type": "Feature",
			  "properties": {},
			  "geometry": {
			    "type": drawType,
			    "coordinates": coords
			  }
			}
		]
	};
	// write geojson file (xxx.geojson)
  $.ajax({
    url:"../GIS/writejson.php",
    method:"POST",
    data:{'str':JSON.stringify(geojson),'filename':filename || $("#filename").val().trim() || 'map'},
    success:function (result,status,xhr) {
      console.log(result);
      $("#status").html('转换成功，文件已保存到'+result);
    },
    error:function (xhr,status,error) {
      console.log(error);
      $("#status").html('转换失败，'+error);
    }
  });

};


// json->geojson

$("#changeBtn").click(function () {
  let bounds=JSON.parse($("#json").val());
  let type=$("#type").val();
  let arr=[];

  if (type==='Polygon') {
    bounds=bounds['boundaries'];
    bounds[0].forEach(function (item,index) {
      arr.push([item['lng'],item['lat']]);
    });
    changeToGeoJSON(type,[arr]);
  } else if (type==='LineString') {
    bounds.forEach(function (item,index) {
      arr.push([item['lng'],item['lat']]);
    });
    changeToGeoJSON(type,arr);
  }
  
});




// AUTO
// the area of YUCI
$.ajax({
  url:"../GIS/json/boundaries.json",
  method:"GET",
  success:function (result,status,xhr) {
    console.log(result);
    let bounds=result['boundaries'];
    let arr=[];
    bounds[0].forEach(function (item,index) {
      arr.push([item['lng'],item['lat']]);
    });
    filename='榆次区行政区边界';
    changeToGeoJSON('Polygon',[arr]);
  },
  error:function (xhr,status,error) {
    console.log(error);
  }
});

// 54 busline
$.ajax({
  url:"../GIS/json/busline.json",
  method:"GET",
  success:function (result,status,xhr) {
    console.log(result);
    let data=result;
    let brr=[];
    for (let key in data) {
      brr=[];
      (data[key]).forEach(function (item,index) {
          brr.push([item['lng'],item['lat']]);
        });
      // 处理文件名中的敏感字符
      key=key.replace(/[<>\/\\|:"\*\?;]+/g,"_");
      // filename=key.substring(0,key.indexOf("("));
      filename=key;
      changeToGeoJSON('LineString',brr);
    }
  },
  error:function (xhr,status,error) {
    console.log(error); 
  },
});
