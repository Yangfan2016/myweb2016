# SNS


### 方法概览

```js

SNS={
	ajax:function () {...},
	layer:{...},
	makeAuth:function () {...},
}

```



### 简单使用

#### 1. 使用ajax （**内部已集成认证信息，无需再在headers加认证信息**）

```js

SNS.ajax({
    url:"/api/group",
    method:"GET",
    data:{                     
        page: 1,
        size: 6,
        order: "lit_desc", 
    },
    headers:{"author":"who am i"}, // 可以添加额外的请求头信息
    success:function (data) {
        // todo
    },
    error:function (err) {  // 可选参数
        // todo
    }
});

```


#### 2. 单独生成认证头信息

```js

SNS.makeAuth();   // @return  {appid:"",timestamp:""...}

```


#### 3. 单独使用SNS.layer

```js

// 生成

var lay=SNS.layer.load("#t1"); // 返回一个唯一标识符，用于关闭时使用

// 关闭指定弹层

SNS.layer.close(lay);

// 关闭所有弹层

SNS.layer.closeAll();


```

### 完整文档

1. SNS.ajax


**PS** 基于axios的封装，除文档提到的参数，还有params参数已内部处理同一为data参数外， 其他参数一律和axios相同
<table>
	<tr>
		<th>参数</th>
		<th>类型</th>
		<th>解释</th>
	</tr>
	<tr>
		<td>url</td>
		<td>String</td>
		<td>请求地址</td>
	</tr>
	<tr>
		<td>method</td>
		<td>String</td>
		<td>请求方法 "GET POST ..."  默认为GET</td>
	</tr>
	<tr>
		<td>data</td>
		<td>Object || String</td>
		<td>请求数据</td>
	</tr>
	<tr>
		<td>success</td>
		<td>Function </td>
		<td>成功回调 参数data <br/></td>
	</tr>
	<tr>
		<td>error</td>
		<td>Function</td>
		<td>失败回调 参数err</td>
	</tr>
	<tr>
		<td>cancelAllRequest</td>
		<td>Boolean</td>
		<td>值为true 时 ，取消除当前请求的所有请求, 如只需取消当前请求，请看表格下方的代码示例</td>
	</tr>
	<tr>
		<td>error</td>
		<td>Function</td>
		<td>失败回调</td>
	</tr>
	<tr>
		<td>layer</td>
		<td>Object</td>
		<td>加此参数后，会在HTTP请求加载前自动生成局部弹层，HTTP请求加载完自动消失   el:需要加弹层的DOM 的CSS选择器  ,setting:弹出层配置，与SNS.layer参数相同</td>
	</tr>
</table>


```js

var source=SNS.ajax(config); // config 配置如下

source.cancel(); // 取消当前请求

```



2. SNS.layer

```js

var flag=SNS.layer.load(el,config);

// el 为需要加弹层的DOM 的CSS选择器 必需参数
// el为 0 时，全屏弹层
// config 为配置参数  可选参数
config={
	shade:0.5  // 遮罩层的背景透明度 范围 0-1,
	timeout:1*1000 //   超时关闭  毫秒
}

SNS.layer.close(flag);

SNS.layer.closeAll();

```


