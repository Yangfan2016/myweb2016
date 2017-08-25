# Mustache.js 入门使用[转]


## 前言：
之前的一个项目里面就有用到这个前台的渲染模版，当时挺忙的也没时间抽空总结一下，刚好上周项目里又用到这个轻量型的渲染模版，真心感觉很好用，因此就总结一下使用心得，算是一个入门级别的指引吧。

### 1.  Mustache 概述
Mustache是基于JavaScript实现的模版引擎，类似于jQuery Template，但是这个模版更加的轻量级，语法更加的简单易用，很容易上手。

### 2.  Mustache 具体的使用
下面就具体讲一下Mustache的使用。在开始讲之前，需要先从Git hub上获取相关的mustache.js文件，获取文件之后，新建一个解决方案，目录如下：

 

然后就开始具体的使用，首先需要在页面的head标签内引用jQuery.js 和Mustache.js两个脚本文件，主要有以下几个方面（以下演示的方法均在head标签中的script代码块中）：


#### 2.1 简单的对象绑定展示

 
```js


$(function () {  
    var user = { name: "Olive", age: 23, sex: "girl" };  
    var template = "My name is  {{name}} ,I'm  {{age}} ,Sex is {{sex}}";  
    var view = Mustache.render(template, user);  
    $("#user_info").html(view);  
            
});
     

```　　


1. 语法解释：              
- Mustache的语法很简单，用两个大括号标记要绑定的字段即可，“{{}}”；

- 大括号内的字段名称要和Mustache.render方法中的第二个参数中的对象的属性名一致

- 主要的渲染方法为Mustache.render，该方法有两个参数，第一个为要渲染的模版，也就是上例中的template，第二个就是数据源也就是上例中的user对象

 

#### 2.2 对象数组循环渲染展示


```js

var users = { 
    result: [
        { name: "Only", age: 24, sex: "boy" },  
        { name: "for", age: 24, sex: "boy" },  
        { name: "Olive", age: 23, sex: "girl" }  
    ]  
};  
var template = "<div><table cellpadding=0 cellspacing=0 class='tb' ><tr><td>Name</td><td>Age</td><td>Sex</td></tr>{{#result}}<tr><td>{{name}}</td><td>{{age}}</td><td>{{sex}}</td></tr>{{/result}}</table><div>";  
var views = Mustache.render(template, users);  
$("#users_info").html(views);  

```


l  语法解释：

-  对于对象数据Mustache也有其特殊的语法：{{#}}{{/}}，如果所给定的数据源是一个对象数组，则可以使用该语法，很方便的用来循环展示。

- 其中{{#}}标记表示从该标记以后的内容全部都要循环展示

- {{/}}标记表示循环结束。这种情况多用于table行的展示。

 

#### 2.3          判断对象为null（false/undefined）展示

```js

var users = { 
    result: [
        { name: null, age: 24, sex: "boy" },  
        { name: "for", age: 24, sex: "boy" },  
        { name: "Olive", age: 23, sex: "girl" }  
    ]  
};  
var template = "<div><table cellpadding=0 cellspacing=0 class='tb' ><tr><td>Name</td><td>Age</td><td>Sex</td></tr>{{#result}}<tr><td>{{#name}}{{name}}</td><td>{{age}}</td><td>{{sex}}{{/name}}</td></tr>{{/result}}</table><div>";  
var views = Mustache.render(template, users);  
$("#users_info1").html(views);  

```

l  页面呈现效果：

 

l  语法解释：

i.              上边我们有讲到{{#}}{{/}}这样的语法，除了上边的循环遍历之外，它还有另外的一层意思就是判空，如果{{#}}中的值为null或false或undefine则其标记内的内容则不展现

ii.              在代码示例中，users对象中的第一个对象名为null，所以在展示时，该条用户信息没有被展示。

iii.              有了判空的方法当然还有与之相反的方法{{^}}，该方法表示的意思与{{#}}意思相反。

#### 2.4 防止html转义展示
l  代码示例：

```js

var user = { name: "<h1>Olive</h1>" };  
var template = "my name is {{name}}";  
var view = Mustache.render(template, user);  
$("#user_name").html(view);<span style="line-height:1.5"> </span>  
            
            
```

l  页面呈现效果：

 

如果不在{{}}中加&，则效果如下：

 

l  语法解释：

i.              在某些时候，我们要绑定的数据源中可能会有一些html标记，如果单纯的采用{{}}这种方式来绑定的话，默认的会将html标记转义。为了解决防止绑定字段中的内容被转移我们可以这样做{{&}},这样就可以防止转义。




-----------------------------------------------




### 一、简单示例
代码：

```js

          function show(t) {
              $("#content").html(t);
          }

         var view = {
           title: 'YZF',
           cacl: function () {
               return 6 + 4;
            }
          };
        $("#content").html(Mustache.render("{{title}} spends {{cacl}}", view));


```

结果：

YZF spends 10

 

结论：

可以很明显的看出Mustache模板的语法，只需要使用{{和}}包含起来就可以了，里面放上对象的名称。

通过本示例也可以看出，如果指定的属性为函数的时候，不会输出函数里面的内容，而是先执行函数，然后将返回的结果显示出来。

 

 ### 二、不转义html标签


```js

             var view = {
                name: "YZF",
                 company: "<b>ninesoft</b>"
             };
             show(Mustache.render("{{name}} <br /> {{company}} <br />{{{company}}}<br/>{{&company}}", view));
             
```

 结果：



 

结论：

通过这个示例可以看出Mustache默认是会将值里面的html标记进行转义的，但是有时候我们并不需要。

所以这里我们可以使用{{{和}}}包含起来，或者是{{&和}}包含，那么Mustache就不会转义里面的html标记。

 

### 三、绑定子属性的值
代码：

```js

             var view = {
                 "name": {
                     first: "Y",
                     second: "zf"
                 },
                 "age": 21
             };
             show(Mustache.render("{{name.first}}{{name.second}} age is {{age}}", view));
             
```

 结果：



 

结论：

相信看到第一个示例的时候，就会有人想到能不能绑定子属性，如果你努力看下去了。

那么祝贺你，现在就是解决你的需求的方式，仅仅只需要通过.来使用子属性即可。

 

### 四、条件式选择是否渲染指定部分


```js

             var view = {
                 person: false
             };
             show(Mustache.render("eff{{#person}}abc{{/person}}", view));


```



 结果：



 

结论：

问题总是不断，如果我们还需要能够根据我们给的值，决定是否渲染某个部分。

那么现在就可以解决这个问题，当然还要提示的就是不仅仅是false会导致不渲染指定部分。

null，空数组，0，空字符串一样有效。语法上面比较简单，就是使用{{#key}} ... {{/key}}

来控制中间的内容。

 

### 五、循环输出


```js
             var view = {
                 stooges: [
                     { "name": "Moe" },
                     { "name": "Larry" },
                     { "name": "Curly" }
                 ]
             };
             show(Mustache.render("{{#stooges}}{{name}}<br />{{/stooges}}", view));


```

结果：



 

结论：

仅仅学会上面的方式，大部分地方你都解决了，但是还是会出现麻烦的地方。

就是循环输出，如果你一个一个写，相信会很烦躁，当然Mustache不会让我们失望，

它也给出了如何循环输出的方式，这里是将一个由对象组成的数组输出，如果我们

输出的是数组，就需要使用{{.}}来替代{{name}}。

 
### 六、循环输出指定函数处理后返回的值


```js

              var view = {
                  "beatles": [
                      { "firstname": "Johh", "lastname": "Lennon" },
                      { "firstname": "Paul", "lastname": "McCartney" }
                  ],
                  "name": function () {
                      return this.firstname + this.lastname;
                  }
              };
             show(Mustache.render("{{#beatles}}{{name}}<br />{{/beatles}}", view));



```

 结果：



 

结论：

循环输出是有了，但是我们还想后期进行加工。那么这个完全符合你的需要，因为Mustache会将

数组中的值传递给你的函数，输出你函数返回的值。这里我们可以看到最外层是数组，只要在里面

使用函数那么外层的数组就会作为这个函数的参数传递进去。

 

### 七、自定义函数



```js

             var view = {
                 "name": "Tater",
                 "bold": function () {
                     return function (text, render) {
                        return render(text) + "<br />";
                     }
                 }
             }
             show(Mustache.render("{{#bold}}{{name}}{{/bold}}", view));

```

 结果：



 

结论：

上面我们都是用的变量作为节，那么我们现在用函数作为节，会有什么效果呢。

它会调用我们函数返回的函数，将节中间的原始字符串作为第一个参数，默认

的解释器作为第二个参数，那么我们就可以自行加工。

 

### 八、反义节


```js

 var view = {
     "repos": []
     };
     
 show(Mustache.render("{{#repos}}{{.}}{{/repos}}{{^repos}}no repos{{/repos}}", view));
 
 
 ```
 
 结果：



 

结论：

上面我们也用节，但是仅仅只能选择是否输出某个部分。所以这里我们弥补一下。

如果我们使用了{{^和}}来定义节的话，那么这个部分只会在里面的值为空，null，

空数组，空字符串的时候才会显示。那么我们就可以实现了if else的效果了。

 

### 九、部分模板




```js


              var view = {
                  names: [
                      { "name": "y" },
                      { "name": "z" },
                     { "name": "f" }
                  ]
              };
              var base = "<h2>Names</h2>{{#names}}{{>user}}{{/names}}";
              var name = "<b>{{name}}</b>";
             show(Mustache.render(base, view, { user: name }));


```



 结果：



 

结论：

Mustache虽然节约了很多时间，但是我们定义了很多模板，但是彼此之间无法互相嵌套使用，也会造成繁琐。

所以这里我们还要介绍如何定义部分模板，用来在其他模板里面使用，这里使用其他模板的方式仅仅是{{>templetename}}。

最大的不同就是Mustache.render方法有了第三个参数。

 

### 十、预编译模板


```js

             Mustache.parse(template);
             //其他代码
             Mustache.render(template,view);

```





 
