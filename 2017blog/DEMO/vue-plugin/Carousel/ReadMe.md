# Vue-Carousel 轮播图组件


#### 属性

<table>
    <thead>
        <tr>
            <th>属性</th> 
            <th>说明</th> 
            <th>类型</th> 
            <th>默认值</th>
        </tr>
    </thead> 
    <tbody>
        <tr>
            <td>lunList</td>
            <td>轮播的内容</td>
            <td>Array</td>
            <td>必选参数</td>
        </tr>
        <tr>
            <td>eq</td>
            <td>轮播的起始值</td>
            <td>Number</td>
            <td>1</td>
        </tr>
        <tr>
            <td>isLoop</td>
            <td>是否无缝循环</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>isAutoPlay</td>
            <td>是否自动切换</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>playDelay</td>
            <td>切换的速度（毫秒）</td>
            <td>Number</td>
            <td>1500</td>
        </tr>
        <tr>
            <td>duration</td>
            <td>切换动画的时长（毫秒）</td>
            <td>Number</td>
            <td>500</td>
        </tr>
        <tr>
            <td>timingFunction</td>
            <td>切换动画的效果</td>
            <td>String</td>
            <td>"ease-in-out"</td>
        </tr>
        <tr>
            <td>delay</td>
            <td>切换动画的延时（毫秒）</td>
            <td>Number</td>
            <td>0</td>
        </tr>
    </tbody>
</table>


#### 事件

<table>
    <thead>
        <tr>
            <th>事件名</th> 
            <th>说明</th> 
            <th>返回值</th>
        </tr>
    </thead> 
    <tbody>
        <tr>
            <td>change</td> 
            <td>幻灯片切换时触发，目前激活的幻灯片的索引，原幻灯片的索引</td> 
            <td>val</td>
        </tr>
    </tbody>
</table>
