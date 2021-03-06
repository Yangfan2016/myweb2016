# 微信扫码登录原理解析

> 扫码登录是现在流行的登录方式，使用这种方式及其方便，而且安全 

## 扫码登录流程

![look.jpg](https://upload-images.jianshu.io/upload_images/538-623026f12e28b0fa.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/659)

## 原理
1. 获取唯一的uuid, 以及包含uid信息的二维码

    ![wx-qrcode-getuuid.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/wx-qrcode-getuuid.JPG)
```js
    // 获取uuid
    getUUID: function() {
        var e = t.defer();
        return window.QRLogin = {},
        $.ajax({
            url: i.API_jsLogin,
            dataType: "script"
        }).done(function() {
            200 == window.QRLogin.code ? e.resolve(window.QRLogin.uuid) : e.reject(window.QRLogin.code)
        }).fail(function() {
            e.reject()
        }),
        e.promise
    }
```  

2. 浏览器轮询服务器，获取扫码状态  

```js
// 查看扫码状态
checkLogin: function(e, a) {
    var n = t.defer()
        , a = a || 0;
    return window.code = 0,
    window.checkLoginPromise = $.ajax({
        url: i.API_login + "?loginicon=true&uuid=" + e + "&tip=" + a + "&r=" + ~new Date,
        dataType: "script",
        timeout: 35e3
    }).done(function() {
        new RegExp("/" + location.host + "/");
        if (window.redirect_uri && window.redirect_uri.indexOf("/" + location.host + "/") < 0)
            return void (location.href = window.redirect_uri);
        var e = {
            code: window.code,
            redirect_uri: window.redirect_uri,
            userAvatar: window.userAvatar
        };
        n.resolve(e)
    }).fail(function() {
        n.reject()
    }),
    n.promise
}
```

3. 根据服务器返回的扫码状态，进行相应的操作

   - 408 扫码超时  如果手机没有扫码或没有授权登录，服务器会阻塞约25s，然后返回状态码 408 -> 前端继续轮询
    ![wx-qrcode-408-25s.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/wx-qrcode-408-25s.JPG)
    ![wx-qrcode-408.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/wx-qrcode-408.JPG)
    - 400 二维码失效 大约5分钟的时间内不扫码，二维码失效
    ![wx-qrcode-400.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/wx-qrcode-400.JPG)
    - 201 已扫码  如果手机已经扫码，服务器立即返回状态码和用户的基本信息 （window.code=201,window.code.userAvator="..."），-> 前端继续轮询  
    ![wx-qrcode-201.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/wx-qrcode-201.JPG)
    - 200 已授权 如果手机点击了确认登录，服务器返回200及token -> 前端停止轮询, 获取到token，重定向到目标页
    ![wx-qrcode-200.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/wx-qrcode-200.JPG)


```js
// 根据服务器返回的扫码状态，进行相应的操作
function o(c) {
    switch (c.code) {
    case 200:
        t.newLoginPage(c.redirect_uri).then(function(t) {
            var o = t.match(/<ret>(.*)<\/ret>/)
                , r = t.match(/<script>(.*)<\/script>/)
                , c = t.match(/<skey>(.*)<\/skey>/)
                , s = t.match(/<wxsid>(.*)<\/wxsid>/)
                , l = t.match(/<wxuin>(.*)<\/wxuin>/)
                , d = t.match(/<pass_ticket>(.*)<\/pass_ticket>/)
                , f = t.match(/<message>(.*)<\/message>/)
                , u = t.match(/<redirecturl>(.*)<\/redirecturl>/);
            return u ? void (window.location.href = u[1]) : o && "0" != o[1] ? (alert(f && f[1] || "登陆失败"),
            i.report(i.AUTH_FAIL_COUNT, 1),
            void location.reload()) : (e.$emit("newLoginPage", {
                Ret: o && o[1],
                SKey: c && c[1],
                Sid: s && s[1],
                Uin: l && l[1],
                Passticket: d && d[1],
                Code: r
            }),
            void (a.getCookie("webwx_data_ticket") || n.report(n.ReportType.cookieError, {
                text: "webwx_data_ticket 票据丢失",
                cookie: document.cookie
            })))
        });
        break;
    case 201:
        e.isScan = !0,
        n.report(n.ReportType.timing, {
            timing: {
                scan: Date.now()
            }
        }),
        t.checkLogin(e.uuid).then(o, function(t) {
            !t && window.checkLoginPromise && (e.isBrokenNetwork = !0)
        });
        break;
    case 408:
        t.checkLogin(e.uuid).then(o, function(t) {
            !t && window.checkLoginPromise && (e.isBrokenNetwork = !0)
        });
        break;
    case 400:
    case 500:
    case 0:
        var s = a.getCookie("refreshTimes") || 0;
        s < 5 ? (s++,
        a.setCookie("refreshTimes", s, .5),
        document.location.reload()) : e.isNeedRefresh = !0;
        break;
    case 202:
        e.isScan = !1,
        e.isAssociationLogin = !1,
        a.setCookie("login_frequency", 0, 2),
        window.checkLoginPromise && (window.checkLoginPromise.abort(),
        window.checkLoginPromise = null ),
        r()
    }
    e.code = c.code,
    e.userAvatar = c.userAvatar,
    a.log("get code", c.code)
}
```

## 总结
  - 轮询采用的是JSONP的形式，排除了跨域问题
  - 轮询采用的后台根据扫码情况阻塞前台请求，优化轮询及减少前端的无效轮询
  
## 注意
AUTHOR:Yangfan2016
LICENSE:MIT
