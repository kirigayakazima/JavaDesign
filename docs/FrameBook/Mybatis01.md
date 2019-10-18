# Mybatis
规范：<br>
持久层：dao  persist   mapper
<br>
实体层：entity  model  bean  javabean  pojo
<br>
业务逻辑：service  biz
<br>
控制器：controller  servlet  action  web
<br>
过滤器：filter
<br>
监听器：listener
<br>
异常：exception
## 环境搭建
### 一、导入jar

包名 | 作用
---|---
asm | Cglib依赖的包
cglib | 动态代理包
commons-logging|日志包
javassist|字节码解析包也是cglib的依赖包
log4j|日志包
log4j-api|日志包
log4j-core|日志包
mybatis|Mybatis核心包
slf4j-api|日志包
slf4j-log4j12|日志包
### 二、配置xml文件
在src路径下配置一个xml文件，必须添加
```
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- default应用environment的id，当前使用的环境 -->
	<environments default="default">
	<!-- 声明可以使用的环境，即数据库类型 -->
		<environment id="default">
		<!-- 使用原生JDBC事务 -->
			<transactionManager type="JDBC"></transactionManager>
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.jdbc.Driver"/>
				<property name="url" value="jdbc:mysql::/localhost:3306/407"/>
				<property name="uername" value="root"/>
				<property name="password" value="123456"/>
			</dataSource>
		</environment>
	</environments>
	<mappers>
	    <mapper resource="com/qym/mapper/FlowerMapper.xml"/>
	</mappers>
</configuration>
```
然后在mapper目录下新建一个xml，配置编写sql语句
```
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namesapce:理解成实现类的全路径(包+类名)-->
<mapper namespace="a.b">
    <!--id:方法
        parameterType:定义参数类型
        resultType:返回值类型
        
        如果方法返回值是list，在resultType中写list的泛型，因为mybatis是对jdbc封装，一行一行读取数据
    -->
    <select id="selAll" resultType=""com.qym.pojo.Flowers>
    select * from t_flower
    </select>
</mapper>
```
```
工厂模式
InputStream is =Resources.getResourceAsStream("mybatis.xml");
//使用工厂设计模式
SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(is); 
//生产SqlSession
SqlSession session=factory.openSession();

List<Flowers> list =session.selectList("a.b.selAll");
for(FLowers flower:list){
    System.out.println(flower.toString());
}
session.close();
```

如果配置后没有提示那么
window-->preference-->XML-->XML catalog-->add按钮添加本地dtd文件
<br>
mybatis的优点，不用编写实现类，只需要写sql语句
### 四、全局配置文件
```
1.全局配置文件中内容
    1.1 <transactionManager/>type属性可取值
            1.1.1  JDBC,事务管理使用JDBC原生事务管理方式
            1.1.2  MANAGED把事务管理转交给其他容器。原生JDBC事务setAutoMapping(false);    
    1.2 <dataSource/>可取值
            1.2.1  POOLED 使用数据库连接池
            1.2.2  UNPOOLED 不使用数据库连接池，和直接使用JDBC一样
            1.2.3  JNDI java命名目录接口技术
```
### 五、数据库连接池
1.在内存中开辟一块空间，存放多个数据库连接对象
<br>2.JDBC Tomcat Pool 直接由tomcat服务器产生数据库连接池
<br>3. active状态：当前连接对象被应用程序使用中
<br>ldle空间状态：等待应用程序使用
<br>4.使用数据库连接池的目的：在高频率访问数据库时，使用数据库连接池可以降低服务器系统压力，提升程序运行效果<br>小型项目不适用数据库连接池
<br>5.实现JDBC tomcat Pool数据库连接池的步骤
```
1.在web项目中的META-INF中存放context.xml

<context>
    <Resource
        driverClassName="com.mysql.jdbc.Driver"
        url="jdbc:mysql://localhost:3306/407"
        username="root"
        password="12456"
        //最多50个并发量，50个连接对象处于连接，其他的等待
        maxActive="50"
        //等待的个数
        maxIdle="20"
        name="test"
        auth="Container"
        maxWait="10000"
        type="javax.sql.DataSource"
    />
</context>
```
把项目发布到tomcat，数据库连接池产生了
<br>6.可以在java中使用indi获取数据库连接池中的对象
<br>Context：上下文接口，context.xml文件对象类型
<br>代码：
```
Context cxt=new InitialContext();
DataSource ds=(DataSource) cxt.looup("java:comp/env/test");
Connection conn=ds.getConnection();
```
<br>当关闭连接对象时，把连接对象归还给数据库连接池，把状态改变成IdIe
### 六、三种查询方式
```
1.selectList()返回值为List<resultType 属性控制>
    适用于查询结果都需要遍历的需求
    List<Flowers> list=session.selectList("a.b.selAll");
    for(Flower flower:list){
        System.out.println(flower.toString());
    }
2.selectOne()返回值Object
    适用于返回结果只是变量或一行数据时
    int count=session.selectOne("a.b.selById");
    Sysoem.out.println(count);
3.selectMap()返回值Map
    适用于需求需要在查询结果中通过某列的值渠道这行数据的需求
    Map<Object,object>map=session.selectMap("a.b.c","name123");
    System.out.println(map);
```
### 七、目录组成
```
src____mybatis.xml
|   |____com____qym
|               |
|               |
|               |____mapper
|               |       |________PeopleMapper.xml
|               |
|               |
|               |____pojo
|               |       |________People.java
|               |
|               |
|               |____service
|               |       |________PeopleService
|               |       |
|               |       |________Impl
|               |                   |________PeopleServiceImpl
|               |
|               |____servlet
|                       |________ShowServlet
|
|
|
|
|
|
WebRoot______________main
            |
            |________index.jsp    










```
## 属性
### 一、parameterType属性
```
1.在xxxMapper.xml中的<select><delete>等标签的parameterType可以控制参数类型

2.SqlSession的selectList()和selectOne()的第二个参数和selectMap()的第三个参数都表示方法的参数
---2.1示例：
    People p=session.selectOne("a.b.selById",1);
    System.out.println(p);
---2.2在Mapper.xml中可以通过#{}获取参数,可以使用索引1可以使用#{parameter1}
---#{0}和#{param 1}表示的含义相同，都是表示第一个参数
---如果只有一个参数(基本数据类型或者String)，mybatis对#{}中的内容没有要求，只要写内容即可
---如果参数对象#{属性名}，如果参数是map写成#{key}
<select id="selById" resultType="com.qym.pojo.People" parameterType="int">
    select * from people where id=#{0}
</select>

3.#{}和${}的区别（基本不用${}，面试相关）
---3.1#{}获取参数的内容支持索引获取，param1获取指定位置参数，并且sql使用？占位符
---3.2${}字符串拼接不使用？，默认找${内容}中的内容的get/set方法，如果写一个数字，那么就是一个数字

```
### 二、实现分页
```
java代码
//显示几个
int pageSize=2;
//第几页
int pageNumber=2;
//如果希望传递多个参数，可以使用对象或者map
Map<String,Object> map=new HashMap<>();
map.put("pageSize",pageSize);
map.put("pageStart",pageSize*(pageNumber-1));
List<People> p=session.selectList("a.b.page",map);
```
```
在mapper.xml中代码
<select id="page" resultType="com.qym.pojo.People" parameterType="map">
    select * from people limit #{pageStart},#{pageSize}
</select>
```
### 三、别名
系统内置别名：把类型全小写
```
//把com.qym.pojo.People这个用别名peo替换，之后再mapper.xml中可以通过peo引用People类
<typeAliases>
    <typeAlias type="com.qym.pojo.People" alias="peo" />
</typeAliases>


//直接给某个包所有类起个别名，别名为类名，区分大小写
<typeAliases>
    <package name="com.qym.pojo" />
</typeAliases>

```
## 实现新增和事务
功能：从应用程序角度出发，软件具有哪些功能
<br>业务：完成功能的逻辑，对应service中的一个方法
<br>事务：从数据库角度出发，完成业务是需要执行的SQL集合，统称为一个事务
<br>在mybatis中默认是关闭了JDBC的自动提交功能<br>
```
//提交事务
session.commit();
//自动提交
openSession(true);
setAutoCommit(true);
```
mybatis底层是对JDBC的封装
```
1.JDBC中的executeUpdate()执行新增，删除，修改的SQL返回值int，表示受影响的行数
2.mybatis中<insert> <delete> <update> 标签没有resultType属性，认为返回值都是int 
3.openSession()时Mybatis会创建一个SqlSession时同时创建一个Transaction(事务对象),同时autoCommit都为false
4.在事务中如果出现异常，那么需要回滚数据，使用session().rellback();
```

*核心代码serviceImpl实现*
```java{2}

@Override
	public PageInfo showAll(int pageSize, int pageNumber) throws IOException {
		//获取资源
		InputStream is=Resources.getResourceAsStream("mybatis.xml");
		//拿到资源后进行建造者工厂模式生产
		SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(is);
		//打开资源
		SqlSession session=factory.openSession();
		//开始进行资源利用
		//创建一个map对象
		//创建一个新的pojo对象，存储分页信息
		PageInfo pi=new PageInfo();
		pi.setPageSize(pageSize);
		pi.setPageNumber(pageNumber);
		
		Map<String, Object> map=new HashMap<>();
		map.put("pageStart", pageSize*(pageNumber-1));
		map.put("pageSize", pageSize);
		pi.setList(session.selectList("com.qym.mapper.FlowerMapper.selAll",map));
		long count=session.selectOne("com.qym.mapper.FlowerMapper.selByPage");
		pi.setTotal(count%pageSize==0?count/pageSize:count/pageSize+1);
		return pi;
	}
```
*核心代码servlet实现*
```java{2}

private FlowerService fs=new FlowerServiceImpl();
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		//先拿到size和number
		//此处判断一下是否有size和number
		String str1=req.getParameter("pageSize");
		//给个默认值,每页显示3个
		int pageSize=4;
		if (str1!=null&&!str1.equals("")) {
			pageSize=Integer.parseInt(str1);
		}
		
		String str2=req.getParameter("pageNumber");
		//给个默认值,一次显示一页
		int pageNumber=1;
		if (str2!=null&&!str2.equals("")) {
			pageNumber=Integer.parseInt(str2);
		}
		
		PageInfo pi=fs.showAll(pageSize, pageNumber);
		System.out.println(pi);
		req.setAttribute("pi", pi);
		req.getRequestDispatcher("index.jsp").forward(req, resp);
	}
```
