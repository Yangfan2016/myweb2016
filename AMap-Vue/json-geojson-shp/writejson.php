<?php  
	header('content-type:text/html;charset=utf8');

	$dir='./GEOJSON';
	$filename=$_POST['filename'].'.geojson';
	// 转换编码，防止windows 中文名乱码
	$filename=iconv('utf-8','gbk',$filename);

	if (!file_exists($dir)) {
		mkdir($dir);
	}

	$str=$_POST['str'];
	$handle=fopen($dir.'/'.$filename,"w");
	fwrite($handle,$str);
	fclose($handle);
	echo $dir.'/'.$filename;
	
?>