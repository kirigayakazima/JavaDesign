# 异步js和xml技术 
异步刷新技术，用来在当前页面响应不同的请求内容
```javascript{2}
解决：
    1.在后台服务器端将多次响应内容重新拼接成一个jsp页面，响应，但是这样会造成很多响应内容被重复的响应，资源浪费
//一个简单的ajax响应

function getData(){
    //创建ajax引擎对象
    var ajax;
    if(window.XMLHttpRequest){
        //判断一下这个对象是否存在，这个是火狐
        ajax=new XMLHttpRequest();
    }else{
        //兼容ie6,7
        ajax=new ActiveXObject("Msxm12.XMLHtTTP");
    }
    //复写onreadystatechange函数
    ajax.onreadystatechange=function(){
    //判断ajax状态码
    if(ajax.readyState==4){
            //获取响应内容
            var result=ajax.responseText;
            //获取div元素对象
            var showdiv=document.getElementById("showdiv");
            showdiv.innerHTML=result;
          }
    }
    //发送请求
    ajax.open("get","ajax");
    //保证兼容性
    ajax.send(null);
}

```

readyState值| 含义
---|---
0| 表示XMLHttpRequest已建立，但还未初始化，这时尚未调用open方法
1| 表示open方法已经调用，但未调用send方法(已创建，未发送)
2|表示send方法已经调用，其他数据未知
3|表示请求已经成功发送，正在接收数据
4|表示数据已经成功接收


Http状态码(响应状态码) | 含义
---|---
200| 请求成功
404 | 请求资源未找到
500|内部服务器错误
## Ajax学习
```javascript{2}
1.ajax的概念
    局部刷新技术，不是一个新技术，是多种技术的组合，浏览器端的技术
2.ajax的作用
    实现在当前结果页中显示其他请求的响应内容
3.ajax的使用
    ajax的基本流程
        //创建ajax对象
        //复写onreadystatechange函数
            //判断ajax状态码
                //判断响应状态码 
                    //获取响应内容(响应内容的格式
                        //普通字符串
                        //json
                        //XML数据
                    //处理响应(js)操作文档
        //发送请求
            //get请求
                get的请求实体拼接在url后面，用？隔开，键值对
                ajax.open("get","ajax?uname=张三&pwd=123");
                ajax.send(null);
            //post请求
                有单独的请求实体,同时form表单里面要加上enctype这个属性， 填上默认值
                ajax.open("post","ajax");
                ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                ajax.send("name=张三&pwd=123");
4.ajax的同步异步
    ajax.open(method,url,async);
    async:设置同步或者是异步执行
            默认是true，表示异步
```
