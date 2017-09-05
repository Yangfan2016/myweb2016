# Vue 分页组件

Author: Yangfan  
CreateTime: 2017-08-31  
UpdateTime: 2017-09-05     
  
## 使用

```html

<page-nav v-bind="{
	'pageNum':pageTotal,
	  'current':curNum,
	  'isJump':true
	}" v-on:cur-page-change="getPageByNum"></page-nav>


```

## 参数说明

<table>
    <thead>
        <tr>
            <td>Props</td>
            <td>Type</td>
            <td>PS</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>pageNum</td>
            <td>Number</td>
            <td>总页数</td>
        </tr>
        <tr>
            <td>current</td>
            <td>Number</td>
            <td>当前页</td>
        </tr>
        <tr>
            <td>isJump</td>
            <td>Boolean</td>
            <td>是否启用跳转到指定页插件</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
        <tr>
            <td>Events</td>
            <td>PS</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>curPageChange</td>
            <td>页面切换时触发</td>
        </tr>
    </tbody>
</table>

## 参考文献

1. MUSE-UI [http://www.muse-ui.org/#/pagination](http://www.muse-ui.org/#/pagination)   

