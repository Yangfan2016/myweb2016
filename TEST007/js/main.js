/**
  * Author: ZHANGH
  * Theme: Transfer Query
  * Dev: Vuejs-2.0 | jQuery-3.1.1
  * MAPAPI: AMap (http://lbs.amap.com) v1.3
  * Version: 1.0.0
  * LastModified: 2017-4-25 14:20
  *
  **/


 


// ===========================Vue.js==================================

/**
  * Theme: Vue.js
  * Version: 2.0
  *
  */
var vm=new Vue({
	el:"#app",
	data:{
		pathList:[{
			type:"特殊线路",
			name:"XXX->XXX",
			basic_price:0,
			stime:"0630",
			etime:"1830",
			distance:"00.00",
			via_stops:[{
				name:"",
				location:{}
			}]
		}],
		suggestList:[{
			name:"搜索提示结果",
			district:"地区"
		}],
		stationInfo:[{
			id:"",
			name:"XXX（公交站）",
			location:"",
			adcode:"",
			citycode:"",
			buslines:[{
				id:"",
				name:"000路",
				location:""
			}]
		}],
		selectLine:-1,
		busData:{},
		lineNum:"901路",
		curCity:"北京市",
		curAdcode:"110100",
		curAddress:"",
		driveMethod:"transfer",
		sPosition:"",
		ePosition:"",
		old_lineNum:"",
		old_curCity:"",
		old_driveMethod:"",
		old_sPosition:"",
		old_ePosition:"",
		map:null,
		mapZoom:3,
		mapStyle:'normal',
		oldMarker:null,
		selectPoint:"END",
		spoint:0,
		epoint:1,
		startClearBtn:"none",
		endClearBtn:"none",
		isOpenRouteQuery:false,
		isShowRouteQueryPanel:true,
		isShowMainPage:false,
		isShowSuggestPanel:false,
		isShowCitySelectPanel:false,
		isBusLoading:false,
		isRouteLoading:false,
		isMobile:false,
		isClearBusResult:false,
		AMap_policy:{
			"transfer":[
				[0,"最快捷","LEAST_TIME"],
				[1,"最经济","LEAST_FEE"],
				[2,"换乘少","LEAST_TRANSFER"],
				[3,"步行少","LEAST_WALK"],
				[4,"最舒适","MOST_COMFORT"],
				[5,"无地铁","NO_SUBWAY"]
			],
			"driving":[
				[0,"最快捷","LEAST_TIME"],
				[1,"最经济","LEAST_FEE"],
				[2,"最短距","LEAST_DISTANCE"],
				[4,"看路况","REAL_TRAFFIC"]
			],
			"riding":[
				[0,"综合线路","GENERAL_LINE"],
				[1,"推荐线路","RECOMMEND_LINE"],
				[2,"省时线路","LEAST_TIME"]
			]
		},
		AMap_weather:{
			province:"北京",
			city:"北京",
			weather:"--",
			temperature:"--",
			windDirection:"--",
			windPower:0
		},
		Data_hotCity:[
			{name:"北京",adcode:"110100"},
			{name:"上海",adcode:"310100"},
			{name:"广州",adcode:"440100"},
			{name:"武汉",adcode:"420100"},
			{name:"深圳",adcode:"440300"},
			{name:"杭州",adcode:"330100"},
			{name:"成都",adcode:"510100"},
			{name:"南京",adcode:"320100"},
			{name:"重庆",adcode:"500100"},
			{name:"长沙",adcode:"430100"}
		],
		Data_provinceList:[{name:"",adcode:""}],
		Data_cityList:[{name:"",adcode:""}],
		isOpenThisFunc:{
			'roadnet':false,
			'satellite':false,
			'traffic':false,
			'tilelayer':false,
			'measureline':false,
			'measurearea':false,
			'mapstyle':false
		},
		line_flag:"-1"
	},
	filters:{
		// 过滤掉指定字符
		filterStr:function (str,item) {
			return str.substring(0,str.indexOf("路")) || item.type;
		},
		// 过滤线路名
		filterLineName:function (str) {
			return str.substring(0,str.indexOf("("));
		}
	},
	computed:{
		// filterRepeat:function (arr) {
		// 	brr=[];
		// 	console.log(arr); // [{name:"12路(火车站-西街)",id:"123"},{name:"12路(西街-火车站)",id:"356"}]
		// 	arr.forEach(function (item,index) {
		// 		var name=item.name.substring(0,item.name.indexOf("("));
		// 		if (arr.indexOf(name)===index) {
		// 			brr.push(item);
		// 		}
		// 	});
		// 	console.error("FILTER OK 153");
		// 	console.log(brr);
		// }
	},
	methods:{
		// 字符串处理 坐标处理
		strToArr:function (str) {
			var arr=str.split(";");
			var arr_2=[];
			for (item in arr) {
				arr_2.push((arr[item]+"").split(","));
			}
			return arr_2=[-(-arr_2[0][0]-arr_2[1][0])/2,-(-arr_2[0][1]-arr_2[1][1])/2];	
		},
		// 字符串处理 时间格式
		formatTime:function (str) {
			if (str.length===0) return 0;
			return (str[0]+str[1])+":"+(str[2]+str[3]);
		},
		// 字符串判断 主线or支线
		isBranchline:function (str) {
			if (str.indexOf("支")!==-1) {
				return "支";
			}
			return "";
		},
		// 样式 增加高亮样式
		addActive:function (curEle) {
			$(curEle).addClass("active").siblings().removeClass("active");
		},
		// 随机生成颜色
		makeRandomHexColor:function (isHex) {
			var hex=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
			var color=["#f20","#026","#080","#111","#666","#806","#56c"];

			if (!isHex) {
				return color[Math.floor(Math.random()*(color.length))]; 
			} else {
				return '#'+hex[Math.floor(Math.random()*16)]+hex[Math.floor(Math.random()*16)]+hex[Math.floor(Math.random()*16)]+hex[Math.floor(Math.random()*16)]+hex[Math.floor(Math.random()*16)]+hex[Math.floor(Math.random()*16)];
			}
			
		},
		// 移动端 改变map容器大小
		changeMapContainerSize:function (x,y,isAnimate) {
			var $mapContainer=$("#mapContainer");

			if (isAnimate===-1) {
				$mapContainer.css({
					"width":x,
					"height":y
				});
			} else {
				$mapContainer.animate({
					"width":x,
					"height":y
				},200);
			}
		},
		// 移动端 展开 | 隐藏 天气面板
		slideAllWeatherPanel:function () {
			var v_this=this;
			var $weatherDetailPanel=$("#weatherDetailPanel");
			// 判断 移动端
			if (!!v_this.isMobile) {
				// 展开天气详情面板
				$weatherDetailPanel.slideToggle(300);
			}
		},
		// 移动端 隐藏 工具箱
		showTopControllBar:function (boo) {
			var $top_controllbar=$("#topContainer");

			// !boo?$top_controllbar.animate({"right":"-80px"},300):$top_controllbar.animate({"right":"20px"},300);

			// test 移动端优化
			$top_controllbar.css("display","none");
		},
		// 显示 | 隐藏 公交线路结果面板 
		showBusPanel:function (flag) {
			var v_this=this;

			var $container_linePath=$("#container_linePath");
			var $linepath_list=$container_linePath.find(".linepath_list").eq(0);
			// 上拉|下拉面板
			!!flag?$container_linePath.slideDown(500,function () {$linepath_list.slideDown(300);}):$container_linePath.slideUp(300);
			
			// 隐藏路径查询控制面板
			v_this.isOpenRouteQuery=false;

			// 移动端 
			if (v_this.isMobile) {
				if (!!flag) {
					// 改变map容器大小
					v_this.changeMapContainerSize("100%","70%");
					// 隐藏 工具箱
					v_this.showTopControllBar(false);
				} else {
					// 恢复map容器大小
					v_this.changeMapContainerSize("100%","100%",-1);
					// 显示工具箱
					v_this.showTopControllBar(true);
				}
			} 

		},
		// 显示 | 隐藏 公交站点结果面板 
		showBusStationPanel:function (flag) {
			var v_this=this;

			var $container_stationPanel=$("#container_stationPanel");
			// 上拉|下拉面板
			!!flag?$container_stationPanel.slideDown(500):$container_stationPanel.slideUp(300);

			// 隐藏路径查询控制面板
			v_this.isOpenRouteQuery=false;

			// 移动端 
			if (v_this.isMobile) {
				if (!!flag) {
					// 改变map容器大小
					v_this.changeMapContainerSize("100%","70%");
					// 隐藏 工具箱
					v_this.showTopControllBar(false);
				} else {
					// 恢复map容器大小
					v_this.changeMapContainerSize("100%","100%",-1);
					// 显示工具箱
					v_this.showTopControllBar(true);
				}
			} 

		},
		// 显示 | 隐藏 路径规划结果面板
		showRoutePanel:function (flag) {
			var v_this=this;

			var $container_routePanel=$("#container_routePanel");
			// 上拉|下拉面板
			!!flag?$container_routePanel.slideDown(500):$container_routePanel.slideUp(300);

			// 移动端 
			if (v_this.isMobile) {
				if (!!flag) {
					// 改变map容器大小
					v_this.changeMapContainerSize("100%","70%");
					// 隐藏 工具箱
					v_this.showTopControllBar(false);
				} else {
					// 恢复map容器大小
					v_this.changeMapContainerSize("100%","100%",-1);
					// 显示工具箱
					v_this.showTopControllBar(true);
				}
			} 

		},
		// 绘制指定公交线路 busArr 必选参数
		drawbusLine:function (busArr,startPot,endPot) {
			var v_this=this;
			var map=v_this.map;

			//绘制乘车的路线
			var polyline=new AMap.Polyline({
				map:map,
				path:busArr,
				strokeColor:"#080",
				strokeOpacity:0.85,
				strokeWeight:7,
				strokeStyle:"solid",
				showDir:true,
				isOutline:true,
				outlineColor:"#fff",
				lineJoin:"round"
			});

			// 起点可选
			if (!!startPot) {
				// 绘制起点
				var markerStart=new AMap.Marker({
					map:map,
					position:[startPot.lng,startPot.lat],
					icon:"http://webapi.amap.com/theme/v1.3/markers/n/start.png",
					zIndex:10
				});
			} 
			// 终点可选
			if (!!endPot) {
				// 绘制终点
				var markerEnd=new AMap.Marker({
					map:map,
					position:[endPot.lng,endPot.lat],
					icon:"http://webapi.amap.com/theme/v1.3/markers/n/end.png",
					zIndex:10
				});
			} 
				
			// 适应视图
			map.setFitView();
		},
		// 绘制大地线路 可自定义
		drawGeoLine:function (path,opt) {
			var v_this=this;
			var map=v_this.map;

			
			//绘制乘车的路线
			var polyline=new AMap.Polyline({
				map:map,
				path:path,
				strokeColor:opt.color || "#038",
				strokeOpacity:0.65,
				strokeWeight:2,
				strokeStyle:"solid",
				lineJoin:"round",
				geodesic:true
			});

			var infowindow=new AMap.InfoWindow({
				closeWhenClickMap:true,
				content:opt.linename
			});

			polyline.on("mouseover",function (ev) {
				ev.target.setOptions({
					"strokeOpacity":1,
					"strokeWeight":5
				});

				infowindow.open(map,ev.lnglat);
			});

			polyline.on("mouseout",function (ev) {
				ev.target.setOptions({
					"strokeOpacity":0.65,
					"strokeWeight":2
				});
			});	

			polyline.on("click",function () {
				var str=opt.linename;
				str=str.substring(0,str.indexOf("("));
				v_this.lineNum=str;
				// 显示清除路线按钮
				v_this.isClearBusResult=true;
				// 查询点击线路
				v_this.queryBusLine("晋中",str);
			});

		},
		// 绘制行政区边界
		drawDistrictBounds:function (bounds) {
			var v_this=this;
			var map=v_this.map;

			var polygon=new AMap.Polygon({
				map:map,
				path:bounds,
				strokeColor:"#058",
				strokeOpacity:1,
				strokeWeight:3,
				fillColor:"#80B3FF",
				fillOpacity:0.32,
				strokeStyle:"dashed"
			});
			map.setFitView();
		},
		// test 绘制热力图
		T_drawHeatMap:function (path) {
			var v_this=this;
			var map=v_this.map;

			map.plugin("AMap.Heatmap",function () {
				var heatmap=new AMap.Heatmap(map,{
					radius: 25, //给定半径
            		opacity: [0, 0.8]
				});
				heatmap.setDataSet({
					data:path
				});
			});
		},
		// 收缩地图容器
		shrinkMapContainer:function (flag) {
			var $mapContainer=$("#mapContainer");
			var flag_left=parseInt($mapContainer.css("left"));

			if (!!flag) {
				if (flag_left!==450) {
					$mapContainer.animate({
						"top":"0",
	    				"left":"450px",
	    				"width":($("body").width()-450)+"px"
					},300);
				}
			} else {
				if (flag_left!==0) {
					$mapContainer.animate({
						"top":"0",
	    				"left":"0",
	    				"width":"100%"
					},300);
				}	
			}
		},
		// 公交数据处理，生成默认线路
	    busDataProcess:function (data,selectLine) {
			var v_this=this;

			var startPot=null,
				endPot=null,
				busArr=[],
				lineCounts=data.lineInfo.length,
				pathItem=[];			
			// 处理数据
			for (var i=0;i<lineCounts;i++) {
				pathItem=data.lineInfo[i].path;
				startPot=pathItem[0];
				endPot=pathItem[pathItem.length-1];
				busArr=pathItem;
				// 绘制所选路线
				if (i===selectLine) {
					v_this.drawbusLine(busArr,startPot,endPot);
				}
			}
			
		},
		// 切换公交线路
		changeBusLine:function (event) {
			var v_this=this;
			var map=v_this.map;
			var curEle=event.currentTarget;

			var index=+$(curEle).parent(".linepath").data("index"),
				pathItem=v_this.busData.lineInfo[index].path,
				startPot=pathItem[0],
				endPot=pathItem[pathItem.length-1],
				busArr=pathItem;

			if (index!==v_this.selectLine) {
				// 清空地图
				map.clearMap();
				v_this.drawbusLine(busArr,startPot,endPot);
				v_this.selectLine=index;
			}

			$(curEle).next(".linepath_list").slideToggle(500);
			$(curEle).parent(".linepath").siblings().find(".linepath_list").slideUp(300);
		},
		// ===========备用函数=========  服务 公交查询   
		busSearch:function (queryCity,queryNum,selectLine) {
			var v_this=this;
			var map=v_this.map;

			map.plugin("AMap.LineSearch",function () {
				var lineS=new AMap.LineSearch({
					city:queryCity,
					pageIndex:1,
					pageSize:20,
					extensions:"all"
				});

				lineS.search(queryNum,function (status,result) {
					if (status==="complete") {
						console.log(result);
						// 更新公交数据信息
						v_this.busData=result;
						// 处理返回的公交数据，并绘制公交路线
						v_this.busDataProcess(result,selectLine);
						// 更新公交路线信息
						v_this.pathList=result.lineInfo;
						// 显示结果列表面板
						v_this.showBusPanel(true);
						
					} else if (status==="no_data") {
						$("body").createAlert("(⊙o⊙)… &nbsp;&nbsp; 没有找到数据！");
					}
					 else {
					 	$("body").createAlert("(⊙︿⊙) &nbsp;&nbsp; 出错了呀！","<p>"+result+"</p>");
						console.warn(result);
					}
				});
			});
		},
		// 查询公交线路
		queryBusLine:function (queryCity,queryNum) {
			var selectLine=0;
			var v_this=this;
			var map=v_this.map;

			if (queryCity && queryNum) {

				// 收缩地图容器
				v_this.shrinkMapContainer(true);
				// 清空地图
				map.clearMap();
				// 查询线路
				map.plugin("AMap.LineSearch",function () {
					var lineS=new AMap.LineSearch({
						city:queryCity,
						pageIndex:1,
						pageSize:20,
						extensions:"all"
					});

					lineS.search(queryNum,function (status,result) {
						// 去除loading样式
						v_this.isBusLoading=false;

						if (status==="complete") {
							
							// 更新公交数据信息
							v_this.busData=result;
							// 处理返回的公交数据，并绘制公交路线
							v_this.busDataProcess(result,selectLine);
							// 更新公交路线信息
							v_this.pathList=result.lineInfo;
							// 显示结果列表面板
							v_this.showBusPanel(true);
							
						} else if (status==="no_data") {
							$("body").createAlert("(⊙o⊙)… &nbsp;&nbsp; 没有找到数据！");
							// 展开地图容器
							v_this.shrinkMapContainer(false);
						}
						 else {
						 	$("body").createAlert("(⊙︿⊙) &nbsp;&nbsp; 出错了呀！","<p>"+result+"</p>");
						 	// 展开地图容器
							v_this.shrinkMapContainer(false);
							console.warn(result);
						}
					});
				});
			} 	
		},
		// 查询公交站
		queryBusStation:function (val) {
			var v_this=this;
			var map=v_this.map;

			// 收缩地图容器
			v_this.shrinkMapContainer(true);
			// 清空地图
			map.clearMap();
			// 服务 站点查询
			map.plugin("AMap.StationSearch",function () {
				var station=new AMap.StationSearch({
					city:v_this.curCity,
					pageIndex:1,
					pageSize:20
				});

				var kw=val;
				station.search(kw,function (status,result) {
					// 去除loading样式
					v_this.isBusLoading=false;

					if (status==="complete") {
						console.warn("TEST 301");
						console.log(result);
						v_this.stationInfo=result.stationInfo;
						// 显示站点列表面板
						v_this.showBusStationPanel(true);
						// 生成点标记
						result.stationInfo.forEach(function (item,index) {
							var marker=new AMap.Marker({
								map:map,
								position:item.location,
								label:{
									offset:new AMap.Pixel(0,-25),
								},
								icon:new AMap.Icon({
									size:new AMap.Size(25,34),
									image:"http://ditu.amap.com/assets/img/poi-marker.png",
									imageSize:new AMap.Size(437,267),
									imageOffset:new AMap.Pixel(-359,-3)
								})
							});
							map.setFitView();
						});
					} else if (status==="no_data") {
						$("body").createAlert("(⊙o⊙)… &nbsp;&nbsp; 没有找到数据！");
						// 展开地图容器
						v_this.shrinkMapContainer(false);
					} else {
						$("body").createAlert("(⊙︿⊙) &nbsp;&nbsp; 出错了呀！","<p>"+result+"</p>");
						// 展开地图容器
						v_this.shrinkMapContainer(false);
						console.warn(result);
					}
				});
			});

		},
		// 查询公交线路或公交站
		queryBusOrBusline:function () {
			var v_this=this;

			var inputVal=$("#queryLineInput_kw").val().trim();
			var re_busline=/((\d+路?)|(号线))/g;
			var re_bus=/(公交站|地铁站)/g;

			// 实时更新数据
			v_this.lineNum=inputVal;

			// 判断是否重复查询
			if (v_this.old_curCity!==v_this.curCity || v_this.old_lineNum!==v_this.lineNum) {
				
				// 样式 loading
				v_this.isBusLoading=true;

				if (!!re_busline.test(inputVal)) {
					console.warn("查询公交线路");
					// 关闭公交站点面板
					v_this.showBusStationPanel(false);
					// 查询公交线路
					v_this.queryBusLine(v_this.curCity,v_this.lineNum);
					// 显示清除路线按钮
					v_this.isClearBusResult=true;
				} else if (!!re_bus.test(inputVal)) {
					console.warn("查询公交站");
					// 关闭公交线路面板
					v_this.showBusPanel(false);
					// 查询公交站点
					v_this.queryBusStation(inputVal);
					// 显示清除路线按钮
					v_this.isClearBusResult=true;
				} else if (inputVal.length>0) {
					console.warn("按公交站点搜索");
					// 关闭公交线路面板
					v_this.showBusPanel(false);
					// 查询公交站点
					v_this.queryBusStation(inputVal);
					// 显示清除路线按钮
					v_this.isClearBusResult=true;
				} else {
					console.warn("输入框内容为空");
					// 关闭公交线路面板
					v_this.showBusPanel(false);
					// 关闭公交站点面板
					v_this.showBusStationPanel(false);
					// 去除loading样式
					v_this.isBusLoading=false;
					// 隐藏清除路线按钮
					v_this.isClearBusResult=false;
					// 展开地图容器
					v_this.shrinkMapContainer(false);
					$("body").createAlert("O__O \"… &nbsp;&nbsp; 请输入完整内容！");
				}
			}
			// 更新旧标记
			v_this.old_lineNum=v_this.lineNum;
			v_this.old_curCity=v_this.curCity;

		},
		// 点击线路标签查询公交线路
		queryBusLineByClickSpan:function (event) {
			var v_this=this;
			var map=v_this.map;

			var curEle=event.currentTarget;
			v_this.lineNum=curEle.innerHTML;
			// 关闭公交站点面板
			v_this.showBusStationPanel(false);	
			// 清空地图
			map.clearMap();
			// loading样式
			v_this.isBusLoading=true;
			// 查询公交线路
			v_this.queryBusLine(v_this.curCity,v_this.lineNum);
		},
		// 生成指定点标记
		magnifyMarker:function (event) {
			var v_this=this;
			var map=v_this.map;

			var curEle=event.currentTarget;
			var location=[curEle.dataset.lng,curEle.dataset.lat];
			var content=curEle.dataset.content;
			// 生成点标记
			var marker=new AMap.Marker({
				map:map,
				position:location,
				label:{
					offset:new AMap.Pixel(0,-25),
				}
			});
			// 生成信息窗口
			var infoWindow=new AMap.InfoWindow({
				position:location,
				isCustom:false,
				closeWhenClickMap:true,
				content:content,
				offset:new AMap.Pixel(0,-20)
			});

			infoWindow.open(map,location);
			// map.setCenter(location);
			map.setZoomAndCenter(13,location);
			// 清除旧点标记
			v_this.oldMarker.setMap(null);
			// 覆盖旧点标记
			v_this.oldMarker=marker;
		},
		// 清空出行规划输入框
		clearInput:function (flag) {
			var v_this=this;

			if (flag==="S") {
				v_this.sPosition="";
				v_this.selectPoint="START";
				v_this.startClearBtn="none";
			} else if (flag==="E") {
				v_this.ePosition="";
				v_this.selectPoint="END";
				v_this.endClearBtn="none";
			}

		},
		// 显示 | 隐藏 清空按钮
		showClearBtn:function (curEle) {
			var v_this=this;

			var inputVal=curEle.value.trim();
			var pointFlag=curEle.dataset.point;

			if (pointFlag==0) {
				if (!!inputVal) {
					v_this.startClearBtn="block";
				} else {
					v_this.startClearBtn="none";
				}
			} else if (pointFlag==1) {
				if (!!inputVal) {
					v_this.endClearBtn="block";
				} else {
					v_this.endClearBtn="none";
				}
			}
		},
		// 服务 出行规划
		routeSearch:function (driveMethod,drivePolicy) {
			var v_this=this;
			var map=v_this.map;

			var sPoint=v_this.sPosition.trim();
			var ePoint=v_this.ePosition.trim();
			// 判断起点、终点是否相同
			if (sPoint===ePoint) {
				// 去除loading
				v_this.isRouteLoading=false;
				$("body").createAlert("/(T o T)/~~ &nbsp;&nbsp; 路线太短！");
			} else {
				// 判断是否重复查询
				if (v_this.old_sPosition!==sPoint || v_this.old_ePosition!==ePoint || drivePolicy!==-1) {
					// 收缩地图容器
					v_this.shrinkMapContainer(true);
					// 清除地图所有覆盖物
					map.clearMap();
					// 清空出行规划结果面板
					$("#routePanel").html(" ");
					// 服务 不同出行方式路径查询
					switch (driveMethod) {
						case "transfer":
							AMap.service("AMap.Transfer",function () {
								var transfer=new AMap.Transfer({
									map:map,
									city:v_this.curCity,
									policy:drivePolicy || 0,
									nightflag:true,
									extensions:"all",
									panel:"routePanel"
								});
					
								transfer.search([{keyword:sPoint},{keyword:ePoint}],function (status,result) {
									// 去除loading
									v_this.isRouteLoading=false;

									if (status==="complete") {
										console.log(result);
									}
								});
							});
							break;
						case "walking":
							AMap.service("AMap.Walking",function () {
								var walking=new AMap.Walking({
									map:map,
									panel:"routePanel"
								});
					
								walking.search([{keyword:sPoint},{keyword:ePoint}],function (status,result) {
									// 去除loading
									v_this.isRouteLoading=false;

									if (status==="complete") {
										console.log(result);
									}
								});
							});
							break;
						case "driving":
							AMap.service("AMap.Driving",function () {
								var driving=new AMap.Driving({
									map:map,
									policy:drivePolicy || 0,
									showTraffic:true,
									extensions:"all",
									panel:"routePanel"
								});
					
								driving.search([{keyword:sPoint},{keyword:ePoint}],function (status,result) {
									// 去除loading
									v_this.isRouteLoading=false;

									if (status==="complete") {
										console.log(result);
									}
								});
							});
							break;
						case "riding":
							AMap.service("AMap.Riding",function () {
								var riding=new AMap.Riding({
									map:map,
									policy:drivePolicy || 0,
									panel:"routePanel"
								});
					
								riding.search([{keyword:sPoint},{keyword:ePoint}],function (status,result) {
									// 去除loading
									v_this.isRouteLoading=false;

									if (status==="complete") {
										console.log(result);
									}
								});
							});
							break;
						default:
							console.error("%cERROR SWITCH","color:#f00;");
							// 去除loading
							v_this.isRouteLoading=false;
							break;
					}
					
					// 显示出行路径面板
					v_this.showRoutePanel(true);

				}
			}
				
			// 更新旧起点、旧终点、旧出行方式标记
			v_this.old_sPosition=sPoint;
			v_this.old_ePosition=ePoint;
			v_this.old_driveMethod=driveMethod;
		},
		// 路径查询
		queryRoutePlan:function (driveMethod) {
			var v_this=this;

			// 判断输入框非空
			if (v_this.sPosition && v_this.ePosition) {
				// loading样式
				v_this.isRouteLoading=true;
				// 路径搜索
				v_this.routeSearch(driveMethod);
			} else {
				$("body").createAlert("(⊙﹏⊙)b &nbsp;&nbsp; 请输入完整内容！");
			}

		},
		// 改变出行方式
		changeRoutePlan:function (event) {
			var v_this=this;

			var curEle=event.currentTarget;
			var curMethod=curEle.dataset.driveMethod;

			// 高亮当前li
			v_this.addActive(curEle);
			// 判断出行方式是否改变
			if (v_this.driveMethod!==curMethod) {
				// 查询路径
				v_this.queryRoutePlan(curMethod);
			}
			// 更新出行方式
			v_this.driveMethod=curMethod;
		},
		// 交换起点、终点
		changeSEpoint:function () {
			var v_this=this;

			// a=[b,b=a][0];
			v_this.sPosition=[v_this.ePosition,v_this.ePosition=v_this.sPosition][0];

			// 判断输入框非空
			if (v_this.sPosition && v_this.ePosition) {
				// loading样式
				v_this.isRouteLoading=true;
				// 查询路径
				v_this.routeSearch(v_this.driveMethod);
			}
		},
		// 初始化 公交查询面板
		initBusQuery:function () {
			var v_this=this;
			var map=v_this.map;

			var $drivingBtn=$("#drivingBtn");
			var $backBtn=$("#backBtn");
			var $query_linesearch=$(".query_linesearch");
			var $query_more=$(".query_more");
			// 收起公交查询面板，并展开路径规划查询面板
			$query_linesearch.slideUp(300,function () {
				$query_more.slideDown(300);
			});
			// 收起公交线路结果面板
			v_this.showBusPanel(false);
			// 收起公交站点结果面板
			v_this.showBusStationPanel(false);
			// 清除旧标记
			v_this.old_curCity="";
			v_this.old_lineNum="";
			// 清除地图所有覆盖物
			map.clearMap();

			// =========移动端=========
			if (v_this.isMobile) {
				// 隐藏 工具箱
				v_this.showTopControllBar(false);
			}

		},
		// 初始化 路径查询面板
		initRouteQuery:function () {
			var v_this=this;
			var map=v_this.map;

			var $drivingBtn=$("#drivingBtn");
			var $backBtn=$("#backBtn");
			var $query_linesearch=$(".query_linesearch");
			var $query_more=$(".query_more");
			// 收起路径规划查询面板，并展开公交查询面板
			$query_more.slideUp(300,function () {
				$query_linesearch.slideDown(300);
			});
			// 清除出行路径结果面板数据
			$("#routePanel").html(" ");
			// 隐藏出行路径面板
			v_this.showRoutePanel(false);
			// 禁止路径查询
			v_this.isOpenRouteQuery=false;
			// 清空起点、终点
			v_this.sPosition='';
			v_this.ePosition='';
			// 清除旧标记
			v_this.old_sPosition='1';
			v_this.old_ePosition='2';
			// 清除地图所有覆盖物
			map.clearMap();
			// 展开地图容器
			v_this.shrinkMapContainer(false);
		},
		// 输入提示
		autoComplete:function (self) {
			var v_this=this;
			var map=v_this.map;

			map.plugin("AMap.Autocomplete",function () {
				var auto=new AMap.Autocomplete({
					city:v_this.curCity,
					datatype:"poi"
				});
				auto.search(self.value,function (status,result) {
					if (status==="complete") {
						if (result.info==="OK") {
							v_this.suggestList=result.tips;
						}
					}
				});
			});
		},
		// 清除搜索提示列表
		clearSuggestList:function () {
			var v_this=this;

			// 隐藏搜索提示列表
			v_this.isShowSuggestPanel=false;
			// 清空搜索提示数据
			v_this.suggestList=[];
		},
		// 将提示结果放入搜索框中
		pushSuggestInput:function (suggestName) {
			var v_this=this;

			v_this.selectPoint==="END"?v_this.ePosition=suggestName:v_this.sPosition=suggestName;
			// 隐藏提示结果面板，并清除提示信息
			v_this.clearSuggestList();
		},
		// 清除查询结果
		clearBusResult:function () {
			var v_this=this;
			var map=v_this.map;

			// 隐藏清除结果按钮
			v_this.isClearBusResult=false;
			// 清空地图
			map.clearMap();
			// 展开地图容器
			v_this.shrinkMapContainer(false);
			// 收起公交线路结果面板
			v_this.showBusPanel(false);
			// 收起公交站点结果面板
			v_this.showBusStationPanel(false);

			// ==============移动端===========
			if (v_this.isMobile) {
				// 显示 工具箱
				v_this.showTopControllBar(true);
			}
		},
		// 起点、终点keyup事件
		inputPointKeyUp:function (event) {
			var v_this=this;

			var curEle=event.currentTarget;
			// 显示提示面板
			v_this.isShowSuggestPanel=true;
			// 输入提示
			v_this.autoComplete(curEle);
			// 删除按钮显示 | 隐藏
			v_this.showClearBtn(curEle);
		},
		// 搜索指定策略的出行路径，并且添加高亮样式
		routeSearchAndAddActive:function (driveMethod,drivePolicy,event){
			var v_this=this;

			// loading样式
			v_this.isRouteLoading=true;
			// 路径查询
			v_this.routeSearch(driveMethod,drivePolicy);
			// 添加高亮样式
			v_this.addActive(event.currentTarget);
		},
		// 显示城市选择面板
		showCitySelectPanel:function (boo) {
			var v_this=this;

			var $cityListPanel=$("#cityListPanel");
			!!boo?$cityListPanel.slideDown(500):$cityListPanel.slideUp(500);
			v_this.isShowCitySelectPanel=boo;
		},
		// 更改当前城市
		changeCurCity:function (event) {
			var v_this=this;
			var map=v_this.map;

			var adcode=event.currentTarget.value || event.currentTarget.getAttribute("adcode");
			var flag=event.currentTarget.getAttribute("showpanel");
			// 防止重复修改
			if (v_this.curAdcode!==adcode) {
				// 初始化天气信息
				v_this.AMap_weather.weather='无';
				v_this.AMap_weather.temperature='--';
				v_this.AMap_weather.windDirection='--';
				v_this.AMap_weather.windPower=0;
				// 设置当前城市
				map.setCity(adcode);
				v_this.curAdcode=adcode;
				// 获取当前城市
				map.getCity(function (result) {
					// 更新当前城市
					v_this.curCity=result.city || result.province;
					// 更新当前天气
					v_this.searchWeather && v_this.searchWeather(result); // result={province:'',city:''}
				});
			}
			// 判断是否收起城市列表面板
			if (!flag) {
				// 关闭城市列表面板			
				v_this.showCitySelectPanel(false);
			}
		},
		// 更改地图缩放大小
		changeMapZoom:function (n) {
			var v_this=this;
			var map=v_this.map;

			if (n===1) {
				map.zoomIn();
			} else if (n===-1){
				map.zoomOut();
			}
		},
		// 显示 | 隐藏 清除地图覆盖物按钮
		showClearMapBtn:function (isShow) {
			var v_this=this;

			var $map_clearMap=$("#map_clearMap");
			// 判断移动端
			var style_left=v_this.isMobile?"-115%":"102%";

			if (!!isShow) {
				$map_clearMap.css("display","block").animate({
					"left":style_left,
					"opacity":1
				},300);
			} else {
				$map_clearMap.animate({
					"left":"60%",
					"opacity":0
				},300,function () {
					$map_clearMap.css("display","none");
				});
			}
		},
		// 清除地图所有覆盖物
		clearMapOverlay:function () {
			var v_this=this;
			var map=v_this.map;

			map.clearMap();
			// 隐藏 清除地图覆盖物按钮
			v_this.showClearMapBtn(false);
		},
		// 改变地图样式
		changeMapStyle:function (style) {
			var v_this=this;
			var map=v_this.map;

			map.setMapStyle(style);
			v_this.mapStyle=style;
		},
		// 显示地图样式列表
		showMapStyleList:function (boo) {
			var v_this=this;

			var $mapStyleList=$("#mapStyleList");

			if (boo) {
				$mapStyleList.slideDown(300);
				v_this.isOpenThisFunc['mapstyle']=true;
			} else {
				$mapStyleList.slideUp(300);
				v_this.isOpenThisFunc['mapstyle']=false;
			}
		},
		// =========附加功能=======
		// 显示榆次区所有的公交线路
		showYCAllBusLine:function () {
			var v_this=this;
			var map=v_this.map;

			var $allbuslineTitle=$("#allbuslineTitle");

			// 初始化
			map.clearMap();
			// 显示 | 隐藏标题
			$allbuslineTitle.slideToggle(500);	

			if (!this.flag) {
				// 绘制榆次区的边界
				if (!localStorage.getItem("bounds")) {
					console.log("网络行政边界数据");
					$.ajax({
						url:"../AMap-Vue/json/boundaries.json",
						method:"GET",
						success:function (xrh,status,result) {
							var bounds=result.responseJSON.boundaries;
							// 把数据存到本地
							localStorage.setItem("bounds",JSON.stringify(bounds));
							// 绘制行政区边界
							v_this.drawDistrictBounds(bounds);
						}
					});
				} else {
					console.log("本地行政边界数据");
					// 绘制行政区边界
					v_this.drawDistrictBounds(JSON.parse(localStorage.getItem("bounds")));	
				}
				// 绘制榆次区的所有公交线路
				if (!localStorage.getItem("busLineData")) {
					console.info("网络所有公交线路数据");
					$.ajax({
						url:"../AMap-Vue/json/busline.json",
						method:"GET",
						success:function (xhr,status,result) {
							var busLineData=result.responseJSON;
							// 把数据存到本地
							localStorage.setItem("busLineData",JSON.stringify(busLineData));
							// 绘制所有公交线路
							for (var key in busLineData) {
								if (busLineData[key].length!==0) {
									v_this.drawGeoLine(busLineData[key],{
										color:v_this.makeRandomHexColor(),
										linename:key
									});
								}
							}
						}
					});
				} else {
					console.info("本地所有公交线路数据");
					var busLineData_local=JSON.parse(localStorage.getItem("busLineData"));
					// 绘制所有公交线路
					for (var key in busLineData_local) {
						if (busLineData_local[key].length!==0) {
							v_this.drawGeoLine(busLineData_local[key],{
								color:v_this.makeRandomHexColor(),
								linename:key
							});
						}
					}
				}
			} else {
				map.clearMap();
			}

			this.flag=!this.flag;

		},
		// test
		indexQueryBusLine:function (selector) {
			var v_this=this;
			
			// 显示主页
			v_this.isShowMainPage=true;
			// 更新输入框的value值
			v_this.lineNum=$(selector).val().trim();
			$("#queryLineInput_kw").val(v_this.lineNum);
			// 查询公交线路or站点
			v_this.queryBusOrBusline();
		}
	},
	mounted:function () {
		this.$nextTick(function () {
			// init scope
			var v_this=this; // vm	保存this指向		
	
			// ===============================全局函数==================================

			window.G_fun={
				// 设置终点
				setEndPoint:function (str) {
					// 收起公交查询面板，并展开路径规划查询面板
					var $query_linesearch=$(".query_linesearch");
					var $query_more=$(".query_more");
					$query_linesearch.slideUp(300,function () {
						$query_more.slideDown(300);
					});
					// 隐藏公交线路结果面板
					v_this.showBusPanel(false);
					// 隐藏公交站点结果面板
					v_this.showBusStationPanel(false);
					// 开启路径查询
					v_this.isOpenRouteQuery=true;
					// 设置终点
					v_this.ePosition=str;
					// 设置起点 我的位置
					v_this.sPosition=v_this.curAddress || "定位失败";
					// 查询路径
					// loading
					v_this.isRouteLoading=true;
					v_this.routeSearch(v_this.driveMethod);
				},
				// 判断是否是移动端 width<=768px
				judgeMobile:function () {
					return $("body").width()<=768;
				}
			};

			// 判断是否是移动端
			v_this.isMobile=G_fun.judgeMobile();

			// 事件 窗口缩放
			$(window).resize(function () {
				// 判断是否是移动端
				v_this.isMobile=G_fun.judgeMobile();
			});

			// =================================加载地图==================================================

			var init_mapStyle="light"; // 初始化地图样式
			var map=new AMap.Map("mapContainer",{
				center:[116.398129,39.907988],
				zoom:12,
				resizeEnable:false, // 移动端
				isHotspot:true,
				lang:"zh_cn",
				mapStyle:init_mapStyle, // normal（默认样式）、dark（深色样式）、light（浅色样式）、fresh(osm清新风格样式)、blue_night
				rotateEnable:false, // 移动端
				animateEnable:false, // 移动端
				jogEnable:false, // 移动端,
				showIndoorMap:false,
				features:['road','point'] // 移动端
			});
			v_this.map=map; // map
			v_this.mapStyle=init_mapStyle; // mapStyle

			var oldMarker=new AMap.Marker(); // 旧点标记标志
			v_this.oldMarker=oldMarker;
			
			// ====================================插件 定位城市==========================================
			
			AMap.plugin(["AMap.CitySearch"],function () {
				var citySearch=new AMap.CitySearch();
				map.addControl(citySearch);
				citySearch.getLocalCity(function (status,result) {
					if (status==="complete") {
						var strLocal=result.rectangle;
						map.setCenter(v_this.strToArr(strLocal));
						v_this.curCity=result.city;
						v_this.curAdcode=result.adcode;
						v_this.curAddress=result.province+" "+result.city;
						// 执行定位后的回调函数
						callback();
						// 提示框
						$("body").createTip("当前城市是："+result.province+" "+result.city,"info");

						console.log("%c当前城市是："+result.province+" "+result.city,"font-size:20px;color:#f20;");
						console.log("%c位置是："+v_this.strToArr(strLocal),"font-size:16px;color:#080;");
					} else {
						// 提示框
						$("body").createTip("定位失败","warn");

						console.log("%c定位失败","color:#f20;");
						console.log(result);
					}
				});
			});

			// 输入自动提示
			var autoComplete_indexPage;
			var autoComplete_mainPage;

			// 定位后回调函数
			function callback() {
				// 公交线路输入提示
				map.plugin(["AMap.Autocomplete"],function () {
		  			// 首页 公交线路输入提示
		  			autoComplete_indexPage=new AMap.Autocomplete({
		            	city:v_this.curCity,
		                input:"indexInput_kw",
		                datatype:"busline|bus"
		            });
		  			// 主页 公交线路输入提示
		            autoComplete_mainPage=new AMap.Autocomplete({
		            	city:v_this.curCity,
		                input:"queryLineInput_kw",
		                datatype:"busline|bus"
		            });
	  			});
			}

			// ============================插件 精确定位===========================
			
			AMap.plugin('AMap.Geolocation', function() {
		        var geolocation=new AMap.Geolocation({
		            enableHighAccuracy: true,//是否使用高精度定位，默认:true
		            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
		            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		            buttonPosition:'RB'
		        });
		        // 添加控件
		        map.addControl(geolocation);
		        // 开始定位
		        geolocation.getCurrentPosition();
		        // 回调函数
		       	geolocation.on('complete',onComplete);
		       	geolocation.on('error',onError);
		    });

		    //定位成功回调
		    function onComplete(data) {
		    	var address=data.addressComponent;
		    	// 提示框
		    	$("body").createTip("定位城市："+address.province+address.city,"info");
		        // 更新当前的具体位置信息
		        v_this.curAddress=data.formattedAddress;
		        // 弹出信息窗体
		        var infoWindow=new AMap.InfoWindow({
		        	position:data.position,
		        	offset:new AMap.Pixel(0,-8),
		        	content:('<h4>您在：</h4>'+'<p>'+data.formattedAddress+'</p>'),
		        	closeWhenClickMap:true,
		        	autoMove:true
		        });
		        infoWindow.open(map);

		        console.log("%c定位城市："+address.province+address.city,"color:#f00;");
		        console.log("%c具体位置："+data.formattedAddress,"color:#f00;");
		        console.log("%c经纬度："+data.position.getLng()+","+data.position.getLat(),"color:#f20;");
		        
		    }

		    //定位失败回调
		    function onError(data) {
		    	// 提示框
		    	$("body").createTip("精确定位失败","warn");

		    	console.warn("精确定位失败");
		    	console.log(data);
		    }			

		    // ==============================服务 天气查询=============================
			
			AMap.service("AMap.Weather",function () {
				var weatherlive=new AMap.Weather();
				var old_city='未知市';

				var searchWeather=function (result) {
					// 防止重复请求
					if (old_city!==(result.city || result.province)) {
						// 更新行政区信息
						if (result.province.length===0) {
							v_this.AMap_weather.province='暂无信息';
							v_this.AMap_weather.city='';
						} else {
							v_this.AMap_weather.province=result.province || result.city || '暂无信息';
							v_this.AMap_weather.city=result.city || '';
						}
						// 排除港澳台的天气查询
						if (!/[香港|澳门|台湾]/g.exec(result.province)) {
							// 查询天气信息
							weatherlive.getLive((result.city || result.province),function (errorStatus,result) {	
								if (!errorStatus) {
									// 更新天气信息
									v_this.AMap_weather.weather=result.weather;
									v_this.AMap_weather.temperature=result.temperature;
									v_this.AMap_weather.windDirection=result.windDirection;
									v_this.AMap_weather.windPower=result.windPower;
								} else {
									// 提示框
									$("body").createTip("没有此区域的天气信息","warn");
									// 初始化天气信息
									v_this.AMap_weather.weather='无';
									v_this.AMap_weather.temperature='--';
									v_this.AMap_weather.windDirection='--';
									v_this.AMap_weather.windPower=0;

									console.warn("没有天气");
									console.log(result);
								}
							});
						}
					}
					// 更新旧城市标记
					old_city=result.city || result.province;
				};
				// 暴露函数到vm中
				v_this.searchWeather=searchWeather;
				// 初始化 默认查询当前城市天气
				v_this.searchWeather({province:v_this.curCity,city:v_this.curCity});
			});

			// ===========================服务 行政区查询=============================
			
			AMap.plugin("AMap.DistrictSearch",function () {
				var district=new AMap.DistrictSearch({
					level:"province",
					showbiz:true,
					extensions:"all",
					subdistrict:1
				});
				// 搜索行政区函数
				var searchDistrict=function (kw,callback) {
					district.search(kw,function (status,result) {
						if (status==="complete") {
							var citylist=result.districtList[0].districtList || result.districtList; // 兼容台湾省
							callback(citylist);
						}
					});
				};
				// 搜索34个省、直辖市、自治区   中国 adcode="100000"
				searchDistrict("100000",function (provinceList) {
					v_this.Data_provinceList=provinceList;
				});
				// 搜索各级下属地级市
				$("#selectProvince").on("change",function () {
					var kw=this.value;
					v_this.Data_cityList=[{name:"",adcode:""}];
					// 搜索地级市
					searchDistrict(kw,function (cityList) {
						v_this.Data_cityList=cityList;
					});
				});

			});

			// =============================地图图层====================================

			// 卫星图层
			var satellite=new AMap.TileLayer.Satellite({
				map:map,
				zIndex:2,
				opacity:1
			});
			// 默认隐藏
			satellite.hide();

			// 路网图层
			var roadnet=new AMap.TileLayer.RoadNet({
				map:map,
				zIndex:3,
				opacity:1
			});
			// 默认隐藏
			roadnet.hide();

			// 实时交通图层
			var traffic=new AMap.TileLayer.Traffic({
				map:map,
				zIndex:4,
				opacity:1,
				autoRefresh:false,
				interval:180
			});
			// 默认隐藏
			traffic.hide();

			// 3D楼块图层 zoom>=17 显示
			// var building=new AMap.Buildings();
			// building.setMap(map);

			// 自定义栅格图层  叠加google地图
			var tileUrl_google='http://mt{1,2,3,0}.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galil';
			var titleUrl_amap='http://webrd0{1,2,3,4}.is.autonavi.com/appmaptile?size=1&scale=1&style=8&x=[x]&y=[y]&z=[z]';
			var tilelayer=new AMap.TileLayer({
				map:map,
				tileSize:256,
				getTileUrl:tileUrl_google,
				errorUrl:titleUrl_amap,
				zIndex:1,
				opacity:1
			});
			// 默认隐藏
			tilelayer.hide();

			// 点击事件 触发图层显示
			$("#TileLayer_Satellite").on("click",function () {
				var isShow=v_this.isOpenThisFunc['satellite'];
				if (!isShow) {
					// 卫星图层显示
					satellite.show();
					// 路网图层显示
					roadnet.show();
					// 更新图层开启的状态
					v_this.isOpenThisFunc['satellite']=true;
					v_this.isOpenThisFunc['roadnet']=true;
					// 样式 路网显示的动画
					$("#TileLayer_RoadNet").css("display","block").animate({
						"opacity":1,
						"left":"-50px"
					},300);
				} else {
					// 隐藏卫星图层
					satellite.hide();
					// 隐藏路网图层
					roadnet.hide();
					// 更新图层关闭状态
					v_this.isOpenThisFunc['satellite']=false;
					v_this.isOpenThisFunc['roadnet']=false;
					// 样式 路网隐藏的动画
					$("#TileLayer_RoadNet").animate({
						"opacity":0,
						"left":0
					},300,function () {
						$("#TileLayer_RoadNet").css("display","none");
					});
				}		
			});
			$("#TileLayer_RoadNet").on("click",function () {
				var isShow=v_this.isOpenThisFunc['roadnet'];
				if (!isShow) {
					roadnet.show();
					v_this.isOpenThisFunc['roadnet']=true;
				} else {
					roadnet.hide();
					v_this.isOpenThisFunc['roadnet']=false;
				}
			});
			$("#TileLayer_Traffic").on("click",function () {
				var isShow=v_this.isOpenThisFunc['traffic'];
				if (!isShow) {
					traffic.show();
					v_this.isOpenThisFunc['traffic']=true;
				} else {
					traffic.hide();
					v_this.isOpenThisFunc['traffic']=false;
				}
			});
			$("#TileLayer").on("click",function () {
				var isShow=v_this.isOpenThisFunc['tilelayer'];
				if (!isShow) {
					tilelayer.show();
					v_this.isOpenThisFunc['tilelayer']=true;
				} else {
					tilelayer.hide();
					v_this.isOpenThisFunc['tilelayer']=false;
				}
			});

			// ===========================事件 地图热点===============================

			map.on("hotspotclick",function (result) {
				// 显示POI信息
				var content=`<div class="infowindow-poi"><span class="poi-name">`+result.name+`</span><span class="poi-btn" onclick="G_fun.setEndPoint('`+result.name+`')">到这去</span></div>`;
				var infoWindow=new AMap.InfoWindow({
					position:result.lnglat,
					isCustom:true,
					content:content,
					closeWhenClickMap:true,
					offset:new AMap.Pixel(0,-15)
				});
				infoWindow.open(map);
				// 判断是否允许选点 查询路径
				if (!!v_this.isOpenRouteQuery) {
					// 地图选点
					if (v_this.selectPoint==="START") {
						v_this.sPosition=result.name;
						v_this.startClearBtn="block";
					} else if (v_this.selectPoint==="END") {
						v_this.ePosition=result.name;
						v_this.endClearBtn="block";
					} else {
						v_this.sPosition="";
						v_this.ePosition="";
					}
					// 判断输入框非空
					if (v_this.sPosition && v_this.ePosition) {
						// loading 样式
						v_this.isRouteLoading=true;
						// 查询路径
						v_this.routeSearch(v_this.driveMethod);
					}
				}
			});

			// ============================事件 地图缩放 ================================
			
			map.on("zoomchange",function () {
				var maxZoom=v_this.isMobile?19:18;
				v_this.mapZoom=map.getZoom();

				if (v_this.mapZoom===maxZoom) {
					$("#zoomIn").addClass("ban");
				} else {
					$("#zoomIn").removeClass("ban");
				}
				if (v_this.mapZoom===3) {
					$("#zoomOut").addClass("ban");
				} else {
					$("#zoomOut").removeClass("ban");
				}
			});

			// ==================================事件 地图移动=============================

			// 地图移动，更新信息
			map.on("mapmove",function () {
				// 获取当前城市
				map.getCity(function (result) {
					// 更新当前城市
					v_this.curCity=result.city || result.province;
					// 更新自动提示的城市
					autoComplete_mainPage && autoComplete_mainPage.setCity(result.city || result.province);
					// 更新当前天气
					v_this.searchWeather && v_this.searchWeather(result); // result={province:'',city:''}
				});
			});
			// =================================控件 比例尺==============================
			
			AMap.plugin("AMap.Scale",function () {
				var scale=new AMap.Scale();
				map.addControl(scale);
			});

			// ===================================插件 工具类=========================
			
			// 工具类 距离量测
			AMap.plugin("AMap.RangingTool",function () {
				var rangingTool=new AMap.RangingTool(map,{
					lineOptions:{
						strokeColor:"#080",
						strokeOpacity:0.8,
						strokeWeight:3,
						strokeStyle:"solid",
						showDir:false
					},
					tmpLineOptions:{
						strokeColor:"#666",
						strokeOpacity:0.8,
						strokeWeight:3,
						strokeStyle:"dashed",
						showDir:false
					}
				});
				
				// 测量开启
				$("#mouseTool_measureLine").on("click",function () {
					rangingTool.turnOn();
					v_this.isOpenThisFunc['measureline']=true;
				});
				// 监听end事件，测量结束后关闭测量功能
				rangingTool.on("end",function () {
					rangingTool.turnOff();
					v_this.isOpenThisFunc['measureline']=false;
					// 显示 清除地图覆盖物按钮
					v_this.showClearMapBtn(true);
				});

			});

			// 工具类 面积量测
			AMap.plugin("AMap.MouseTool",function () {
				var mousetTool=new AMap.MouseTool(map);
				// 测量开启
				$("#mouseTool_measureArea").on("click",function () {
					mousetTool.measureArea({
						strokeColor:"#333",
						strokeOpacity:0.85,
						strokeWeight:2,
						fillColor:"#9c3",
						fillOpacity:0.8
					});
					v_this.isOpenThisFunc['measurearea']=true;
				});
				// 监听draw事件，测量结束后关闭测量功能
				mousetTool.on("draw",function () {
					mousetTool.close(); // 关闭鼠标工具操作，并清除地图覆盖物
					v_this.isOpenThisFunc['measurearea']=false;
					// 显示 清除地图覆盖物按钮
					v_this.showClearMapBtn(true);
				});
			});


			// ============================ 移动端 ===================================
			
			// 移动端 拉起路线详情页
			var slideMore=function ($slideEle,ey0,ey1) {
				if (ey1-ey0<0) {
					// 上滑
					$slideEle.animate({
						"top":0
					},300);
				} else {
					// 下滑
					$slideEle.animate({
						"top":"70%"
					},300);
				}
			};
			var slideToggle=function ($slideEle,ey0,ey1) {
				if (ey1-ey0<0) {
					// 上滑
					$slideEle.slideUp(300);
				} else {
					// 下滑
					$slideEle.slideDown(300);
				}
			};

			// 路径结果面板 滑动事件
			(function () {
				var $slideEle=$("#container_routePanel");
				var $slideBar=$slideEle.find(".slidebar").eq(0);

				$slideBar.on("touchstart",function (ev) {
					var ey0=ev.touches[0].clientY;
					$slideBar.one("touchmove",function (ev) {
						var ey1=ev.touches[0].clientY;
						slideMore($slideEle,ey0,ey1);
					});
				});
			}());
			// 线路结果面板 滑动事件
			(function () {
				var $slideEle=$("#container_linePath");
				var $slideBar=$slideEle.find(".slidebar").eq(0);

				$slideBar.on("touchstart",function (ev) {
					var ey0=ev.touches[0].clientY;
					$slideBar.one("touchmove",function (ev) {
						var ey1=ev.touches[0].clientY;
						slideMore($slideEle,ey0,ey1);
					});
				});
			}());
			// 站点结果面板 滑动事件
			(function () {
				var $slideEle=$("#container_stationPanel");
				var $slideBar=$slideEle.find(".slidebar").eq(0);

				$slideBar.on("touchstart",function (ev) {
					var ey0=ev.touches[0].clientY;
					$slideBar.one("touchmove",function (ev) {
						var ey1=ev.touches[0].clientY;
						slideMore($slideEle,ey0,ey1);
					});
				});
			}());
			// 路径查询面板 滑动事件
			(function () {
				var $slideEle=$("#drivingQueryPanel");
				var $slideBar=$slideEle.next(".driving_slidepanel").eq(0);

				$slideBar.on("touchstart",function (ev) {
					var ey0=ev.touches[0].clientY;
					$slideBar.one("touchmove",function (ev) {
						var ey1=ev.touches[0].clientY;
						slideToggle($slideEle,ey0,ey1);
					});
				});
			}());


			// ===================================测试================================
			

			




			// ==================TEST==============
			
				



			
		});
	}
});
// ===========================Vue.js END==================================
