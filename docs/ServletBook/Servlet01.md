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
```
Servlet的常见错误：
    404错误：资源未找到
        原因一：在请求地址中的servlet的别名书写错误
        原因二：在虚拟项目名称拼写错误
    500错误：内部服务器错误
        错误一：
            java.lang.ClassNotFoundException:com.bjsxt.servlet.ServletMothod
            解决：
              在web.xml中校验servlet类的全限定路径是否拼写错误
        错误二：
            因为service方法体的代码执行错误导致，逻辑错误
            解决：
                根据错误提示对service方法体中的代码进行修改
    405错误：请求方式不支持
        原因：
            请求方式和servlet中的方法不匹配导致的
        解决：
            尽量使用service方法进行请求处理，不要使用service方法中调用父类的service方法
```
## 六、Request对象
服务器接收到了浏览器的请求后，会创建一个Request对象，对象中存储了此次请求相关的请求数据，服务器在调用Servlet时会将创建的Request对象作为实参传递给Servlet的方法，比如：service方法
```Java{2}
request对象：
        作用：request对象中封存了当前请求的所有请求信息
        使用：获取请求头数据
                req.getMethod();
                req.getRequestURL();
                req.getScheme();
              获取请求行数据
                req.getHeader("");
                req.getHeaderNames();
              获取用户数据   
                req.getParameter("uname");
        注意：
              request对象由tomcat服务器创建，并作为实参传递给处理请求的servlet的service方法 
``` 

``` Java{2}  
    //获取请求方式
        String method=req.getMethod();
		System.out.println(method);
		//获取请求URL
		StringBuffer url=req.getRequestURL();
		System.out.println(url);
		//获取请求URL
		String uri=req.getRequestURI();
		System.out.println(uri);
		//获取请求协议
		String h=req.getScheme();
		System.out.println(h);
		//获取请求行数据
		
		//获取指定的请求行信息
		String value=req.getHeader("aaa");
		//没有这个键，返回null
		System.out.println(value);
		
		Enumeration e=req.getHeaderNames();
		while (e.hasMoreElements()) {
			String name=(String) e.nextElement();
			String value2=req.getHeader(name);
			System.out.println(name+""+value2);
			
		}
		//获取用户数据
		String name=req.getParameter("uname");
		String pwd=req.getParameter("pwd");
		System.out.println(name+""+pwd);
		String[] favs=req.getParameterValues("fav");
		if (favs!=null) {
			for (String fav : favs) {
				System.out.println(fav);
			}
		}
		//获取所有的用户请求数据的键的枚举集合---req.getParameterName()
```

```Java{2}
Response对象：
	    设置响应头
 		    setHeader(String name,String value);	//在响应头里面添加响应信息，但是同键会覆盖
 		    addHeader(String name,String value);	//在响应头里面添加响应信息，但是不会覆盖
 		设置响应状态
 			sendError(int num,String msg);			//自定义响应状态码
 		设置响应实体
 			resp.getWrite().write(String str);		//响应具体的数据给浏览器

        //响应处理结果
			//设置响应头
			resp.setHeader("mouse", "1");
			resp.setHeader("mouse", "2");
			resp.addHeader("key", "3");
			resp.addHeader("key", "4");
			//设置响应编码格式,下面两种都可以
			resp.setHeader("content-type", "text/html;charset=utf-8");
			resp.setContentType("text/html;charset=utf-8");
			//设置响应状态码
			resp.sendError(405,"this is a error");
			//设置响应实体,里面不能写中文
			resp.getWriter().write("this is response study");
```
## 七、一个简单的登录页面的Demo(所有的Servlet样板)
目录格式
```
src___com___bjsxt
               |____dao
               |     |____Impl
               |     |       |____LoginDaoImpl.java
               |     |       |
               |     |       |____RegisterDaoImpl.java
               |     |
               |     |____LgoinDao.java       
               |     |
               |     |____RegisterDao.java
               |
               |____pojo
               |      |____User.java
               |
               |
               |
               |
               |
               |
               |____service
               |     |____Impl
               |     |       |____MethodServiceImpl.java
               |     |       |
               |     |       |____RegisterServiceImpl.java
               |     |
               |     |____MethodService.java     
               |     |
               |     |____RegisterService.java
               |
               |____servlet
                     |____MethodServlet.java
                     |
                     |____RegisterServlet.java       
                     |
                     |____MyServlet.java

WebRoot
    |____Method.jsp
    |
    |____Register.jsp

```
具体实现<br>
[代码链接](https://github.com/kirigayakazima/JavaDemo/tree/master/%E4%B8%80%E4%B8%AA%E5%B0%8F%E7%9A%84%E7%99%BB%E5%BD%95%E6%B3%A8%E5%86%8C%E9%AA%8C%E8%AF%81%E9%80%BB%E8%BE%91)
```
1.判断u是否为null， 不为null，就能够成功注册或者登陆
2.设置接口service和Dao
3.具体实现都在Impl里面
4.设置一个User,存放uanme，pwd，uid，数据准备和数据库里面的一样，方便存取
5.在Dao接口的实现里面，进行数据库的操作，记得build path，添加jar包
6.在Dao接口实现里面，注意的是，jdbc的操作，应该关闭流，返回结果应该是u，在设置注册账号的时候，应该注意的是判断账号没有注册后，应该进行账号的添加，然后进行账号的查找，赋给u，防止出现注册账号成功，但是页面显示的是failed。
```
