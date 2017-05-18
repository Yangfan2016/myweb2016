<?php  

	$str=$_POST['str'];
	$handle=fopen("./json/boundaries.json","w");
	fwrite($handle,$str);
	fclose($handle);
	echo "写入完成";
?>