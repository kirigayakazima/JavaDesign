# Servlet

## 一、 HTTP协议
超文本传输协议(HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议，所有的WWW文件都必须遵守这个标准
```
请求协议
1.请求行:方法(GET/POST)、URL、协议/版本
2.请求头:(Request/Header)
3.请求正文穿的

响应协议
1.状态行:方法(GET/POST)、URL、协议/版本
2.响应头(Response Header)
3.响应正文
```
## 二、基本概念
### (1) post
post请求数据在请求实体中进行发送，在url中看不到具体的请求数据，安全，适合数据量大的数据发送
### (2) get
get请求数据会以？的形式隔开拼接在请求头中，不安全，没有请求实体部分
### (3) 响应
```
响应格式的结构：
    响应头：HTTP版本、状态码、状态消息
    响应头：消息报头、客户端使用的附加信息
    空行：响应和响应实体之间的，必须要有
    响应式题：正文，服务器返回给浏览器的信息
```
### (4) 状态码
```
200 OK                          //客户端请求成功
400 Bad Request                 //客户端请求有语法错误，不能被服务器所理解
401 Unauthorized                //请求未经授权，这个状态码必须和WWW-Authenticate报头域一起使用
403 Forbidden                   //服务器收到请求，但是拒绝提供服务
404 Not Found                   //请求资源不存在，eg：输入了错误的URL
500 Internal Server Error       //服务器发生不可预期的错误
503 Server Unavailable          //服务器当前不能处理客户端的请求，一段时间后可能恢复正常
```

## 三、服务器
```
\bin        -存放启动和关闭Tomcat的可执行文件
\conf       -存放Tomcat的配置文件
\lib        -存放库文件
\logs       -存放日志文件
\temp       -存放临时文件
\webapps    -存放web应用
\work       =存放JSP转化后的Servelt文件
```
安装方法
必须依赖于JDK，如果闪退，那么在startup.bat里面第一行添加
```
SET JAVA_HOME=(JDK安装目录)
SET CATALINA_HOME=(Tomcat解压后的目录)
```
## 四、Servlet技术
狭义的Servlet是指Java实现的一个接口，广义的Servlet是指任何实现了Servlet接口的类，一般理解为后者。<br>
```
特点：
    运行在支持java的应用服务器上
    Servlet的实现遵循了服务器能够识别的规则，也就是服务器会自动的根据请求调用对应的servlet进行请求处理
使用：
    1.创建java普通类，继承HttpServlet类
    2.覆写service方法
    3.在service方法中写逻辑代码
    4.在webRoot下的WEB-INF文件夹下的web。xml文件中配置servlet
运行流程：
    url:http://localhost:8080/project/my
    url:虚拟项目名/servlet的别名
    组成:服务器地址:端口号/虚拟项目名(webapps下的文件夹的名称)/servlet的别名(要执行的servlet的url-pattern)
    
浏览器发送请求到服务器，服务器根据请求url地址中的url信息在webapps目录下找到对应的项目文件夹，然后在web.xml中检索对应的servlet，找到后调用并执行Servlet
```
## 五、生命周期
```
-Servlet的生命周期
        1.如果没有配置从第一次调用到服务器关闭
        2.如果Servlet在web.xml中配置了load-on-startup，生命周期为服务器启动到服务器关闭
        init方法是在Servlet进行初始化的一个方法，会在Servlet第一次加载进行存储时执行
        destory方法是在servlet被销毁时执行，也就是服务器关闭时
        
        
初始化方法，在servlet第一次加载内容的时候被调用
service方法是真正处理请求的方法
destory方法是销毁时的方法
```
```
Service方法和doGet方法和doPost方法的区别
    Service方法：可以处理get/post方式的请求，优先调用这个方法覆盖其他方法
    doGet方法：
        处理get请求的方法
    doPost方法：
        处理post请求的方法
注意：
    如果在覆写的service方法中，调用了父类的service方法，则service方法调用完后，会再次根据请求方式相应的doGet和doPost方法执行，所以一般情况下不在覆写的service方法中调用父类的service方法，避免出现405错误
//这个方法会先调用父类的service方法，然后根据请求的不同去调用不同请求对应的方法
super.service(rep,reqs)；



```

