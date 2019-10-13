# 过滤器
```
作用：
    对服务器接受请求资源和响应给浏览器的资源进行管理保护Servlet
使用：
    创建一个实现Filter接口的普通java类
    复写接口方法
        init方法
        doFilter方法
            在doFilter方法中添加chain.doFilter(request,response);
        将数据流转给servlet
        destory方法
    在webX.xml中配置过滤器
        <filter>
            <filter-name>myFilter</filter-name>
            <filter-class>com.bjsxt.filter.MyFilter</filter-class>
        </filter>
        <filter-mapping>
            <filter-name>myFilter</filter-name>
            <url-pattern>/*</url-pattern>
        </filter-mapping>
    注意：
        url-pattern:/*
            表示拦截所有请求
         url-pattern:*.do
            表示所有以.do结尾的请求，一般是用来进行模块拦截处理的
         url-pattern:/url
            表示拦截指定url的请求，针对某个Servlet的请求进行拦截，保护Servlet
过滤器的生命周期：
    服务器的启动到服务器关闭
执行：
    浏览器发起请求到服务器，服务器接收到请求后，根据url信息在web.xml中找到对应的过滤器执行doFilter方法，该方法对此次请求进行处理后如果符合要求则放行，放行后，如果还有符合要求的过滤器则继续进行过滤，找到执行对应的servlet进行请求处理，servl对请求处理完毕后，也就service方法结束了，还需要继续返回相应的doFilter方法继续执行
案例：
    统一编码格式设置
    session管理
    权限设置
    资源管理（统一水印，和谐词汇等等）
    
    
//判断session
    HttpSession hs=((HttpServletRequest) request).getSession();
    if(hs.getAttribute("user")==null){
        //如果session为空，那么就直接重定向给login
        ((HttpServletResponse) response).sendRedirect("/login.jsp");
        
    }else{
        //如果存在。那就放行
        chain.doFilter(request,response);
    }
```
# 监听器
```
作用：
    监听作用域对象request 、session、application的创建】销毁和内容的改变
使用：
    创建一个实现了指定接口的java类
        监听Servlet--->ServletRequestListener
            requestInitialized(ServletRequestEvent sre)//创建
            requestDestoryed(ServletRequestEvent sre)//销毁 
        监听Servlet--->ServletRequestAttributeListener
            attributeAdded(ServletRequestAttributeEvent srae)
            attributeRemoved(ServletRequestAttributeEvent srae)
            attributeReplaced(ServletRequestAttributeEvent srae)
            注意：形参可以获取被监听的数据
            srae.getName();
            srae.getValue();
        监听session--->HttpSessionListener
            sessionCreated(HttpSessionEvent se)
            sessionDestroyed(HttpSessionEvent se)
        监听session--->HttpSessionAttributeListener 监听session数据的变更
            attributeAdded(HttpSessionBindingEvent event)
            attributeRemoved(HttpSessionBindingEvent event)
            attributeReplaced(HttpSessionBindingEvent event)
            注意：形参可以获取被监听的数据
            event.getName();
            event.getValue();
        监听application--->ServletContextListener
            contextInitialized(ServletContextEvent sce)
            contextDestroyed(ServletContextEvent sce)
            注意：形参可以获取被监听的数据
            sce.getName();
            sce.getValue();
        监听application数据的变更
            attributeAdded(ServletContextAttributeEvent event)
            attributeRemoved(ServletContextAttributeEvent event)
            attributeReplaced(ServletContextAttributeEvent event)    
        在web.xml配置监听器
            <listener>
                <listener-class>com.bjsxt.listener</listener-class>
            </listener>
    案例：
        统计当前在线人数
        统计网页浏览器次数
```
