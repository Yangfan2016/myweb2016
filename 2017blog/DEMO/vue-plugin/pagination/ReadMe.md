# Vue 分页组件


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
            <td>Events</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>pageNum</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>current</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>isJump</td>
            <td>2</td>
            <td>3</td>
        </tr>
    </tbody>
</table>

## 参考文献

1. MUSE-UI [http://www.muse-ui.org/#/pagination](http://www.muse-ui.org/#/pagination)   

