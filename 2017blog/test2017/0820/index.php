<?php  
header("Content-type:text/html;charset=UTF8");

$filename="./XML-20141217.xml";
// 读取文件
$file=file_get_contents($filename);
// 计算文件大小
$filesize=filesize($filename);

$str=$file;
echo mb_strlen($str)."<br />"; // 中文按一个字符算（多字节的字符被计为 1）
$s=timeStamp();
$str=preg_replace('/(\n|\t|\r)+/', '', $str); // 去 \n \r \t
$str=preg_replace('/\>\s+\</', '><', $str); // 去 标签之间空格
$str=preg_replace('/\{(.+?)\}/', '$1', $str); // 替换 {...}   .? 非贪婪模式
$e=timeStamp();
echo mb_strlen($str)."<br />";
echo (($e-$s)*1000)."ms<br />";
// 写入文件
file_put_contents(__DIR__."/XML-new.xml",$str);

// 计算时间差
function timeStamp() {
	$arr=explode(" ",microtime());
	return $arr[0];
}

?>