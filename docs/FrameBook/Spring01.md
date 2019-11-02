# Spring
```Java{2}
IoC/DI          控制反转/依赖注入
AOP             面向切面编程
声明式事务
```
### Spring框架runtime
```Java{2}
test:Spring提供测试功能
Core Container:核心容器，Spring启动最基本条件
    ---Beans:Spring负责创建类对象并管理对象
    ---Core:核心类
    ---Context:上下文参数，获取外部资源或管理注解等
    ---SpEI:expression.jar
AOP:实现aop功能需要依赖
Aspects:切面AOP依赖的包
Data Access/Integration:Spring封装数据访问层相关内容
    ---JDBC:Spring对JDBC封装后的代码
    ---ORM:封装了持久层框架的代码，例如Hibernate
    ---transactions:对象spring-tx.jar,声明式事务使用
WEB:需要Spring完成web相关功能时需要
    ===tomcat加载spring配置文件时需要有spring-web包
```
## IoC和DI
```Java{2}
applicactionContext.xml配置的信息最终存储到了Spring容器ApplicationContext中 
```
### xml文件配置

通过bean创建对象，默认是加载xml文件后对象就被创建了

index：参数的索引，从0开始

name：参数名

type：类型(区分关键字和封装类int和Integer)
#### 创建对象的三种方法
构造方法创建
```Xml{2}
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
        <!-- 这里的id指的是获取对象标识
        	class是创建那个类的对象
         -->
        <bean id="peo" class="com.qym.pojo.People">
            <constructor-arg index="0" type="int" name="id" value="清羽玄儿"></constructor-arg>
        	<constructor-arg index="1" type="java.lang.String" name="name" value="清舞玄儿"></constructor-arg>
        </bean>
</beans>
```
实例工厂

创建一个工厂，添加一个newInstance的方法方法返回一个People对象
```Java{2}
public static People newInstance(){
		return new People();
	}
```

xml配置
```Xml{2}
<bean id="factory" class="com.qym.pojo.PeopleFactory"></bean>
<bean id="peo1" factory-bean="factory" factory-method="newInstance"></bean>
```
静态工厂

创建一个工厂，添加一个newInstance的静态方法方法返回一个People对象

xml配置
```Xml{2}
<bean id="peo2" class="com.qym.pojo.PeopleFactory" factory-method="newInstance"></bean>
```
## 给Bean属性赋值
### 属性是基本数据类型或String等简单类型
```Xml{2}
<bean id="peo" class="com.qym.pojo.People">
    <property name="id" value="222"></property>
    <property name="name" value="玄儿"></property>
</bean>


<bean id="peo" class="com.qym.pojo.People">
    <property name="id">
        <value>456</value>
    </property>
    <property name="name">
        <value>玄儿</value>
    </property>
</bean>
```
### 属性是Set<?> List<?> 数组
```Xml{2}
<!--Set<?>-->
<bean id="peo" class="com.qym.pojo.People">
    <property name="sets">
        <set>
            <value>1</value>
            <value>2</value>
            <value>3</value>
            <value>4</value>
        </set>
    </property>
</bean>

<!--list<?>-->
<bean id="peo" class="com.qym.pojo.People">
    <property name="list">
        <list>
            <value>1</value>
            <value>2</value>
            <value>3</value>
            <value>4</value>
        </list>
    </property>
</bean>

<!--如果list中只有一个值-->
<bean id="peo" class="com.qym.pojo.People">
    <property name="list" value="1">
    </property>
</bean>

<!--array<?>-->
<bean id="peo" class="com.qym.pojo.People">
    <property name="strs">
        <array>
            <value>1</value>
            <value>2</value>
            <value>3</value>
            <value>4</value>
        </array>
    </property>
</bean>
```
### 属性是map
```Xml{2}
<bean id="peo" class="com.qym.pojo.People">
    <property name="map">
        <map>
            <entry key="a" value="b"></entry>
            <entry key="c" value="d"></entry>
        </map>
    </property>
</bean>
```
### 属性是Properties类型
```Xml{2}
<bean id="peo" class="com.qym.pojo.People">
    <property name="demo">
        <props>
            <pro key="a">value1</entry>
            <pro key="c">value2</entry>
        </props>
    </property>
</bean>
```

## DI
DI和IoC类似，当一个类需要依赖另一个类对象时，把B赋值给A的过程叫做依赖注入
```Xml{2}
<bean id="peo" class="com.qym.pojo.People">
    <property name="desk" ref="desk"></property>
</bean>

<bean id="desk" class="com.qym.pojo.Desk">
    <property name="id" value="1"></property>
    <property name="price value="2"></property>
</bean>
```
## Spring整合Mybatis
### 依赖

![I1_CRT92_RDN6XYE69PM_6J.png](https://i.loli.net/2019/10/30/IQ7Jw5rzo1keEZs.png)
### xml配置文件
```Xml{2}
<!--数据源封装类，数据源：获取数据库连接，spring-jdbc.jar包中-->
<bean id="dataSour" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/408"></property>
    <property name="username" value="root"></property>
    <property name="password" value="123456"></property>
</bean>
<!--把SqlSessionFactory工厂创建，并且注入mysql连接-->
<bean id="factory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <!--数据库连接信息来源于dataSource-->
    <property name="dataSource" ref="dataSour"></property>
</bean>
<!--此时连接已经创建，并且工厂创建完毕-->
<!--扫描器相当于mybatis.xml中的mappers标签下的package标签,扫描com.qym.mapper包后会给对应接口创建对象-->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!--要扫描那个包-->
    <property name="basePackage" value="com.qym.mapper"></property>
    <!--这里要让扫描和factory产生关联，把factory注入，让factory存到扫描的所有资源-->
    <property name="sqlSessionFactory" ref="factory"></property>
</bean>
<!--由spring管理service实现类-->
<bean id="airService" class="com.qym.service.impl.AirServiceImpl">
    <!--这里的airMapper是mapper下的注解，注入airMapper注解-->
    <property name="airMapper" ref="airMapper"></property>
</bean>
```
### 代码编写
```
---pojo不变
---mapper包下必须使用接口绑定方案或者注解方案（必须有接口）
---Service接口和Service实现类不变
    ---需要在Service实现类中声明Mapper接口对象，并生成get/set方法
---Spring无法管理Servlet
```
## spring初步整合Mybatis实现简单登录验证
[源码](https://github.com/kirigayakazima/JavaDemo/tree/master/spring%E6%95%B4%E5%90%88mybatis%E6%9C%89%E9%AA%8C%E8%AF%81%E7%A0%81%E7%9A%84%E7%99%BB%E5%BD%95)

### 验证码Servlet
```Java{2}
private UserService userService;
	@Override
	public void init() throws ServletException {
		ApplicationContext ac= (ApplicationContext) WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
		userService=ac.getBean("userService",UserServiceImpl.class);
	}
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		req.setCharacterEncoding("utf-8");
		String code=req.getParameter("code");
		String codeSession=req.getSession().getAttribute("code").toString();
		if(codeSession.equals(code)){
			String username=req.getParameter("username");
			String password=req.getParameter("password");
			User user=new User();
			user.setUsername(username);
			user.setPassword(password);
			User user1=null;
			user1=userService.login(user);
			if (user1!=null) {
				System.out.println("登陆成功了");
				resp.sendRedirect("main.jsp");
			}else {
				System.out.println("用户名错误");
				req.setAttribute("error", "用户名或者密码不正确");
				req.getRequestDispatcher("index.jsp").forward(req, resp);
			}
		}else {
			System.out.println("验证码错误");
			req.setAttribute("error", "验证码错误");
			req.getRequestDispatcher("index.jsp").forward(req, resp);
			}
		}
```

### 登录Servlet
```Java{2}
private UserService userService;
	@Override
	public void init() throws ServletException {
		ApplicationContext ac= (ApplicationContext) WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext());
		userService=ac.getBean("userService",UserServiceImpl.class);
	}
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		req.setCharacterEncoding("utf-8");
		String code=req.getParameter("code");
		String codeSession=req.getSession().getAttribute("code").toString();
		if(codeSession.equals(code)){
			String username=req.getParameter("username");
			String password=req.getParameter("password");
			User user=new User();
			user.setUsername(username);
			user.setPassword(password);
			User user1=null;
			user1=userService.login(user);
			if (user1!=null) {
				System.out.println("登陆成功了");
				resp.sendRedirect("main.jsp");
			}else {
				System.out.println("用户名错误");
				req.setAttribute("error", "用户名或者密码不正确");
				req.getRequestDispatcher("index.jsp").forward(req, resp);
			}
		}else {
			System.out.println("验证码错误");
			req.setAttribute("error", "验证码错误");
			req.getRequestDispatcher("index.jsp").forward(req, resp);
			}
		}
```
