(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{200:function(s,t,a){"use strict";a.r(t);var n=a(0),r=Object(n.a)({},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"异步js和xml技术"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异步js和xml技术","aria-hidden":"true"}},[s._v("#")]),s._v(" 异步js和xml技术")]),s._v(" "),a("h2",{attrs:{id:"了解ajax技术"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#了解ajax技术","aria-hidden":"true"}},[s._v("#")]),s._v(" 了解Ajax技术")]),s._v(" "),a("p",[s._v("异步刷新技术，用来在当前页面响应不同的请求内容")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("解决：\n    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.")]),s._v("在后台服务器端将多次响应内容重新拼接成一个jsp页面，响应，但是这样会造成很多响应内容被重复的响应，资源浪费\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//一个简单的ajax响应")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getData")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//创建ajax引擎对象")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("XMLHttpRequest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//判断一下这个对象是否存在，这个是火狐")]),s._v("\n        ajax"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("XMLHttpRequest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//兼容ie6,7")]),s._v("\n        ajax"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ActiveXObject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Msxm12.XMLHtTTP"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//复写onreadystatechange函数")]),s._v("\n    ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("onreadystatechange")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//判断ajax状态码")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("readyState"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//获取响应内容")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" result"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("responseText"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//获取div元素对象")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" showdiv"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"showdiv"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            showdiv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("innerHTML"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//发送请求")]),s._v("\n    ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"get"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ajax"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//保证兼容性")]),s._v("\n    ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br")])]),a("table",[a("thead",[a("tr",[a("th",[s._v("readyState值")]),s._v(" "),a("th",[s._v("含义")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("0")]),s._v(" "),a("td",[s._v("表示XMLHttpRequest已建立，但还未初始化，这时尚未调用open方法")])]),s._v(" "),a("tr",[a("td",[s._v("1")]),s._v(" "),a("td",[s._v("表示open方法已经调用，但未调用send方法(已创建，未发送)")])]),s._v(" "),a("tr",[a("td",[s._v("2")]),s._v(" "),a("td",[s._v("表示send方法已经调用，其他数据未知")])]),s._v(" "),a("tr",[a("td",[s._v("3")]),s._v(" "),a("td",[s._v("表示请求已经成功发送，正在接收数据")])]),s._v(" "),a("tr",[a("td",[s._v("4")]),s._v(" "),a("td",[s._v("表示数据已经成功接收")])])])]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("Http状态码(响应状态码)")]),s._v(" "),a("th",[s._v("含义")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("200")]),s._v(" "),a("td",[s._v("请求成功")])]),s._v(" "),a("tr",[a("td",[s._v("404")]),s._v(" "),a("td",[s._v("请求资源未找到")])]),s._v(" "),a("tr",[a("td",[s._v("500")]),s._v(" "),a("td",[s._v("内部服务器错误")])])])]),s._v(" "),a("h2",{attrs:{id:"ajax学习"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ajax学习","aria-hidden":"true"}},[s._v("#")]),s._v(" Ajax学习")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.")]),s._v("ajax的概念\n    局部刷新技术，不是一个新技术，是多种技术的组合，浏览器端的技术\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.")]),s._v("ajax的作用\n    实现在当前结果页中显示其他请求的响应内容\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.")]),s._v("ajax的使用\n    ajax的基本流程\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//创建ajax对象")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//复写onreadystatechange函数")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//判断ajax状态码")]),s._v("\n                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//判断响应状态码 ")]),s._v("\n                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//获取响应内容(响应内容的格式")]),s._v("\n                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//普通字符串")]),s._v("\n                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//json")]),s._v("\n                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//XML数据")]),s._v("\n                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//处理响应(js)操作文档")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//发送请求")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//get请求")]),s._v("\n                "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("get")]),s._v("的请求实体拼接在url后面，用？隔开，键值对\n                ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"get"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ajax?uname=张三&pwd=123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//post请求")]),s._v("\n                有单独的请求实体"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("同时form表单里面要加上enctype这个属性， 填上默认值\n                ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"post"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ajax"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setRequestHeader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Content-Type"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"application/x-www-form-urlencoded"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n                ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"name=张三&pwd=123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4.")]),s._v("ajax的同步异步\n    ajax"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("method"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("async"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    async"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("设置同步或者是异步执行\n            默认是"),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("，表示异步\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br")])])])},[],!1,null,null,null);t.default=r.exports}}]);