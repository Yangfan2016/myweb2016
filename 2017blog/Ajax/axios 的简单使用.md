# axios 的简单使用


#### 完整使用文档 [https://github.com/Yangfan2016/myweb2016/blob/master/2017blog/Ajax/axios%E5%85%A5%E9%97%A8.md](https://github.com/Yangfan2016/myweb2016/blob/master/2017blog/Ajax/axios%E5%85%A5%E9%97%A8.md)


## HTTP:GET

```js


axios({
    url: "@Url.Content("~/api/v1/scholar/custom")",   // URL
    method: "GET",                                    // 请求方法
    params: {                                        // 只有 get方法传数据用 params 字段
        scholarId: "@user.Id" || -1,
        page: 1,  // 页数
        size: 4, // 每页显示的个数
        q: ""
    }
})
    .then(function (response) {                 // response  和jq  的response有所不同   axios的response返回的是 {code:200,data:{},config:{}...}
        if (response.data.Success == true) {     // 直接使用 response.data  得到后台返回的数据 例如 {Content:[],Total:0,Success:true}
            vm.groupData = response.data;
            vm.groupInfo = response.data.Content;
        } else {
            console.error('API-ERROR: ' + response.data.ErrorCode);
        }
    })
    .catch(function (error) {               // 捕捉请求失败的异常  这里可以写当ajax请求失败时应对处理
        console.warn("AJAX-ERROR: " + error);
    });


```

## HTTP:POST DELETE PUT ...

```js

axios({
    url:"@Url.Content("~/api/v1/scholar/focus")",     // URL
    method: "POST",                                   // 请求方法
    headers: { "Content-Type": "application/json" },   // 请求头
    data: JSON.stringify({                              // 数据
        "SourceScholarId": "@user.Id",
        "TargetScholarId": item.ScholarId
    })
})
    .then(function (response) {                         // 说明同上
        // 更新数据，渲染模板
        if (response.data.Success == true) {
            // todo
            console.log('%c关注成功', 'color:#080;');
            item.IsFocus = 1;
        } else {
            console.log('%c关注失败', 'color:#f20;');
            console.error("API-ERROR: " + response.data.ErrorCode);
        }
    })
    .catch(function (error) {
        console.error("AJAX-ERROR: " + error);
    });


```




