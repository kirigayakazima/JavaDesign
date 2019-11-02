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
```Xml{2}
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
```Xml{2}
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
```Java{2}
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
```Java{2}
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
```Xml{2}
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
```Java{2}
Context cxt=new InitialContext();
DataSource ds=(DataSource) cxt.looup("java:comp/env/test");
Connection conn=ds.getConnection();
```
<br>当关闭连接对象时，把连接对象归还给数据库连接池，把状态改变成IdIe
### 六、三种查询方式
```Java{2}
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
```Java{2}
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
```Java{2}
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
```Java{2}
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
```Xml{2}
在mapper.xml中代码
<select id="page" resultType="com.qym.pojo.People" parameterType="map">
    select * from people limit #{pageStart},#{pageSize}
</select>
```
### 三、别名
系统内置别名：把类型全小写
```Xml{2}
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
```Java{2}
//提交事务
session.commit();
//自动提交
openSession(true);
setAutoCommit(true);
```
mybatis底层是对JDBC的封装
```Xml{2}
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
## 接口绑定方案和多参数传递
作用：实现创建一个接口后把mapper.xml由mybatis生成接口的实现类通过调用接口对象就可以获取到mapper.xml中编写的sql<br>

*以后mybatis和spring整合的时候都是使用这个方案*
### 一、实现步骤
```Java{2}
-1.创建一个接口
    --接口包名和接口名与mapper.xml中的namespace属性的属性值要相同
    --在mybatis.xml中使用<package>标签进行扫描接口和mapper.xml
    --接口中方法名和mapper.xml标签的id属性的属性值要相同
```
### 二、接口问题
```Java{2}
mapper里面的接口被实例化了，需要给接口一个实例化对象，此处使用JDK的动态代理设计模式，面向接口的代理设计模式（必须要有接口）

select标签里面，如果多参数的时候不需要写parameterType


mapper包下面存放mapper.xml和mapper.java的接口

public interface mapper{
    //select标签里面的id必须是selAll了
    List<People> selAll();
    //Param表示可以使用字符串作为map的value 
    List<People> selById(@Param("one") String name,@Param("two") String decs);
}

```
代码实现步骤
```Xml{2}
---在mybatis.xml中的<mappers>下使用<package>

    <mappers>
        <package name="com.qym.mapper" />
    </mappers>

---在com.qym.mapper下新建接口
    public interface PeopleMapper{
        List<People> selAll();
    }
---在com.qym.mapper新建一个PeopleMapper.xml
    ---namespace必须和接口是全限定路径（包名+类名）
    ---id值必须和接口方法名相同
    ---如果接口中方法为多个参数，可以省略parameterType
        <mapper namespace="com.qym.mapper.PeopleMapper">
            <select id="selAll" resultType="People">
                select * from people
            </select>
        </mapper>
---多参数实现办法
    ---在接口中声明方法
        list<People> seleById(String name,String desc);
    ---在mapper.xml中添加
        ---#{}中使用0,1,2或者param1,param2
        <!-- 当多参数时，不需要写parameterType -->
        <select id="seleById" resultType="People">
            select * from people where desc=#{0} and name=#{1}
        </select>
---可以使用注解方式
    ---在接口中声明方法
        //mybatis把参数转换为map了，其中@Param("key")参数内容就是map的value
        List<People> seleByOther(@Param("one") String on,@Param("two") String tw);
    ---在mapper.xml中添加
        ---在#{}里面写的@Param("内容")参数中内容
        <select id="seleByOther" resultType="People">
            select * from People where desc=#{one} and name=#{two}
        </select>
```
## 动态SQL
在mapper.xml里面添加逻辑判断
```Xml{2}
---使用if标签
<select>
    select * from People where 1=1
    <!-- OGNL表达式，直接写key或对象的属性，不需要添加任何特殊字符 -->
    <if test="accin!=null and accin!=''">
        and accin=#{accin}
    </if>
    <if test="accout!=null and accout!=''">
        and accout=#{accout}
    </if>
</select>

---使用where标签,去掉第一个and
<select>
    select * from People
    <where>
        <if test="accin!=null and accin!=''">
            and accin=#{accin}
        </if>
        <if test="accout!=null and accout='">
            and accout=#{accout}
        </if>
    </where>
</select>

---使用choose where when组合标签,只会执行一个
<select>
    select * from People
    <where>
        <choose>
            <when test="accin!=null and accin!=''">
            and accin=#{accin}
            </when>
            <when test="accout!=null and accout!=''">
            and accout=#{accout}
            </when>
        </choose>
    </where>
</select>

---使用set标签，去掉最后一个逗号，如果<set>里面有内容生成set关键字，没有就不生成
    ---id=#{id}是为了防止<set>中没有内容，mybatis不生成set关键字
    <update>
        update People
        <set>
            id=#{id}
             <if test="accin!=null and accin!=''">
                and accin=#{accin}
            </if>
            <if test="accout!=null and accout='">
                and accout=#{accout}
            </if>
        </set>
    </update>
    
---使用trim标签
    ---prefix 在前面添加内容
    ---prefixOverrides 去掉前面内容
    ---suffix 在后面添加内容
    ---suffixOverrides 去掉后面内容
<select>
    select * from People
    <trim prefix="where" prefixOverrides="and">
</select>

<update>
    update People
    <trim prefix="set" suffixOverrides=",">
    a=a,
    </trim>
    where id=100
</update>

---使用bind标签，给参数重新赋值，场景：模糊查询、在原内容前或后添加内容
<select>
    <bind name="accin" value="'%'+accin+'%'">
    #{id}
</select>

---使用foreach标签，循环参数内容，还具备在内容的前后添加内容，分隔符的功能，使用场景：in查询，批量新增中（mybatis中，foreach效率比较低）
    ---如果希望批量新增，SQL命令
    insert into People (default,1,2,3),(default,2,3,4)
    ---openSession必须指定(底层是JDBC的PreparedStatement.addBatch();
    factory.openSession(ExecutorType.BATCH);
    
    ---实例
        collection 要遍历的集合
        item 迭代变量 #{迭代变量名}获取内容
        open 循环后左侧添加的内容
        close 循环后右侧添加的内容
        separator 每次循环时，元素之间的分隔符
    <select id="" parameterType="" resultType="">
        select * from People where id in
        <foreach collection="" item="" open="(" close=")" separator=",">
    </select>
    
---使用sql标签和include标签
    ---某些sql片段如果希望复用，可以使用<sql>定义这个片段
    <select>
        select <include refid="mysql"></include>
        from People
    </select>
    
    <sql id="mysql">
        id,accin,accout,money
    </sql>
    
    ---在<select> <delete> <update> <insert>中使用<include>引用  
    <select>
        select <include refid="mysql"></include>
        from People
    </select>
        
```
## 线程容器 ThreadLocal
线程容器，给线程绑定一个Object内容后，只要线程不发生改变，可以随时取出object
<br>
改变线程，object就无法取出
```Java{2}
//改变线程 
final ThreadLocal<String> tl=new ThreadLoacl<>();
tl.set("测试");
new Thread(){
    public void run(){
        String result=tl.get();
        System.out.println("结果："+result);
    }
}.start();
```
factory实例化过程是一个比较耗费性能的过程，尽量保证只有一个factory
## 缓存
应用程序和数据库交互的过程是一个相对比较耗时的过程
<br>缓存存在的意义：让应用程序减少对数据库的访问，提升程序运行效率
```Java{2}
Mybatis中默认开启SqlSession缓存
    ---同一个SqlSession对象调用同一个<select>时，只有第一次访问数据库，第一次之后把查询结果缓存到SqlSession缓存区(内存)中
    ---缓存的是statement对象
        ---在mybatis中，一个<select>对应一个statement对象
    ---有效范围必须是同一个SqlSession对象
缓存流程
    ---先去缓存区中找是否存在statement
    ---返回结果
    ---如果没有缓存statement对象，去数据库中获取数据
    ---数据库返回查询结果
    ---把查询结果放到对应的缓存区中
SqlSessionFactory缓存
    ---二级缓存
    ---有效范围：同一个factory内那个SqlSession都可以获取
    ---当数据很少被修改，经常被使用的时候使用二级缓存

    ---在mapper.xml中添加
    ---如果不写readOnly="true"，则需要把实体类系列化
    <cache readOnly="true"></cache>
    ---当SqlSession对象close()或commit()时，会把SqlSession缓存的数据刷(flush)到SqlSessionFactory的缓存区当中
```
## 实现多表查询
```
---实现多表查询方式
    ---业务装配，对两个表编写表单查询语句，在业务把查询的两个结果进行关联
    ---使用Auto Mapping特性，在实现两个表联合查询时通过别名完成映射
    ---使用Myabtis的<resultMap>标签进行实现
---多表查询时，类中包干另一个类的对象的分类
    ---单个对象
    ---集合对象

```
### resultMap标签
```Xml{2}
---resultMap标签写在mapper.xml中,由程序员控制SQL查询结果与实体类的映射关系
    ---默认Mybatis使用Auto Mapping特性
        ---使用<resultType>标签时,<select>标签不写 resultType属性，而是使用resultMap属性引用<resultMap>标签
            ---mapper.xml配置
                <resultMap type="teacher" id="mymap">
                //主键使用 id 标签配置映射关系
                <id column="id" property="id1" />
                //其他列使用 result 标签配置映射关系
                <result column="name" property="name1"/>
                </resultMap>
                <select id="selAll" resultMap="mymap">
                    select * from teacher
                </select>
                
---使用resultMap实现关联单个对象(N+1)方式
    ---N+1查询方式，先查询出某个表的全部信息，根据这个表的信息查询到另一个表的信息
    ---与业务员装配的区别
        ---在service里面写的代码现在由mybatis装配
    ---实现步骤
        ---在主类Student中添加一个Teacher对象
        ---在Teacher.xml中提供一个查询
            <select id="selById" resultType="teacher" parameterType="int">
                select * from teacher where id=#{0}
            </select>
        ---在StudentMapper中做以下配置
            ---<association>装配一个对象时使用
            ---property:Teacher对象在Student类中的属性名
            ---select:通过那个查询来查询出这个对象的信息
            ---column:把当前表的那个列的值作为参数传递给另一个查询
            ---大前提使用N+1方式时如果列名和属性名相同可以不配置，但是不会返回对应的值，使用Auto mapping特性，但是mybatis默认只会给列专配一次
                <resultMap type="student" id="stuMap">
                    <id property="id" column="id"/>
                    <result property="name" column="name"/>
                    <result property="age" column="age"/>
                    <result property="tid" column="tid"/>
                    //如果关联一个对象
                    <association property="teacher" select="com.bjsxt.mapper.TeacherMapper.selById" column="tid"></association>
                </resultMap>
                <select id="selAll" resultMap="stuMap">
                    select * from student
                </select>
                
            //简化后得到
                <resultMap type="student" id="stuMap">
                    <result column="tid" property="tid"/>
                    // 如果关联一个对象
                    <association property="teacher" select="com.bjsxt.mapper.TeacherMapper.selById" column="tid"></association>
                </resultMap>
                <select id="selAll" resultMap="stuMap">
                    select * from student
                </select>
        
        ---使用resultMap实现关联单个对象(联合查询方式)
            ---只需要编写一个 SQL,在 StudentMapper 中添加下面效果
            --- <association/>只要专配一个对象就用这个标签
            --- 此时把<association/>小的<resultMap>看待
            --- javaType 属性:<association/>专配完后返回一个什么类型的对象.取值是一个类(或类的别名)
            <resultMap type="Student" id="stuMap1">
                <id column="sid" property="id"/>
                <result column="sname" property="name"/>
                <result column="age" property="age"/>
                <result column="tid" property="tid"/>
                <association property="teacher" javaType="Teacher" >
                <id column="tid" property="id"/>
                <result column="tname" property="name"/>
                </association>
            </resultMap>
            <select id="selAll1" resultMap="stuMap1">
                 select s.id sid,s.name sname,age age,t.itid,t.name tname FROM student s left outer join teacher t on s.tid=t.id
            </select>
            
        --- N+1 方式和联合查询方式对比
            --- N+1:需求不确定时6.2 联合查询:需求中确定查询时两个表一定都查询.
        ---N+1 名称由来
            --- 举例:学生中有 3 条数据
            --- 需求:查询所有学生信息级授课老师信息
            --- 需要执行的 SQL 命令
            --- 查询全部学生信息:select * from 学7.3.2 执行 3 遍 select * from 老师 where id=学生的外键
            --- 使用多条 SQl 命令查询两表数据时,如果希望把需要的数据都 查询出来,需要执行 N+1 条 SQl 才能把所有数据库查询出来
            ---缺点:效率低
            --- 优点: 如果有的时候不需要查询学生是同时查询老师.只需执行一个 select * from student;
            --- 适用场景: 有的时候需要查询学生同时查询老师,有的时候只需要查询学生.
            ---如果解决 N+1 查询带来的效率低的问题
            --- 默认带的前提: 每次都是两个都查询 使用两表联合查询.


---使用<resultMap>查询关联集合对象(N+1)
    ---在 Teacher 中添加 List<Student>
        public class Teacher {
        private int id;
        private String name;
        private List<Student> list;
    --- 在 StudentMapper.xml 中添加通过 tid 查询
        <select id="selByTid" parameterType="int"resultType="student">
            select * from student where tid=#{0}
        </select>
    ---在 TeacherMapper.xml 中添加查询全部
        ---<collection/> 当属性是集合类型时使用的标签. 
            <resultMap type="teacher" id="mymap">
                <id column="id" property="id"/>
                <result column="name" property="name"/>
                <collection property="list"
                select="com.bjsxt.mapper.StudentMapper.selByTid"
                column="id"></collection>
            </resultMap>
            <select id="selAll" resultMap="mymap">
                select * from teacher
            </select>
---使用<resultMap>实现加载集合数据(联合查询方式)
    ---在 teacherMapper.xml 中添加
        ---mybatis 可以通过主键判断对象是否被加载过 
        --- 不需要担心创建重复 Teacher
            <resultMap type="teacher" id="mymap1">
                <id column="tid" property="id"/>
                <result column="tname" property="name"/>
                <collection property="list" ofType="student" >
                    <id column="sid" property="id"/>
                    <result column="sname" property="name"/>
                    <result column="age" property="age"/>
                    <result column="tid" property="tid"/>
                </collection>
            </resultMap>
            <select id="selAll1" resultMap="mymap1">
                select t.id tid,t.name tname,s.id sid,s.namsname,age,tid from teacher t LEFT JOIN student s on t.id=s.tid;
            </select>
---使用 Auto Mapping 结合别名实现多表查询
    --- 只能使用多表联合查询方式. 5.2 要求:查询出的列别和属性名相同. 5.3 实现方式
        ---在 SQL 是关键字符,两侧添加反单引号
            <select id="selAll" resultType="student">
                select t.id `teacher.id`,t.name `teacher.name`,s.id id,s.name name,age,tid from student s LEFT JOIN teacher t on t.id=s.tid
            </select>
```     
### MyBatis 注解
```Java{2}
---MyBatis 注解
    ---注解:为了简化配置文件. 
    ---Mybatis 的注解简化 mapper.xml 文件
        ---如果涉及动态 SQL 依然使用 mapper.xml
    ---mapper.xml 和注解可以共存. 
    ---使用注解时 mybatis.xml 中<mappers>使用
        ---<package/>
        ---<mapper class=””/>
---实现查询
    @Select("select * from teacher")
    List<Teacher> selAll();
---实现新增
    @Insert("insert into teacher
    values(default,#{name})")
    int insTeacher(Teacher teacher);
---实现修改
    @Update("update teacher set name=#{name} where id=#{id}")
    int updTeacher(Teacher teacher);
---实现删除
    @Delete("delete from teacher where id=#{0}")
    int delById(int id);
---使用注解实现<resultMap>功能
    ---以 N+1 举例
        ---在 StudentMapper 接口添加查询
            @Select("select * from student where tid=#{0}")
            List<Student> selByTid(int tid);
        ---在 TeacherMapper 接口添加
        ---@Results() 相当于<resultMap>
        ---@Result() 相当于<id/>或<result/>
        ---@Result(id=true) 相当与<id/>
        ---@Many() 相当于<collection/>
    ---@One() 相当于<association/>
        @Results(value={
        @Result(id=true,property="id",column="id"),
        @Result(property="name",column="name"),
        @Result(property="list",column="id",many=@Many(select="com.bjsxt.mapper.StudentMapper.selByTid"))
        })
        @Select("select * from teacher")
        List<Teacher> selTeacher();
```
### 运行原理
```Java{2}
---运行过程中涉及到的类
    ---Resources MyBatis 中 IO 流的工具类
    ---加载配置文件
    ---SqlSessionFactoryBuilder() 构建器
        ---作用:创建 SqlSessionFactory 接口的实现类
    ---XMLConfigBuilder MyBatis全局配置文件内容构建器类
        ---作用负责读取流内容并转换为 JAVA 代码. 
    --- Configuration 封装了全局配置文件所有配置信息       ---全局配置文件内容存放在 Configuration 中
    ---DefaultSqlSessionFactory是SqlSessionFactory接扣的实现类
    ---Transaction 事务类
        ---每一个 SqlSession 会带有一个 Transaction 对象. 
    ---TransactionFactory 事务工厂
        ---负责生产 Transaction
    --- Executor MyBatis 执行器
        --- 作用:负责执行 SQL 命令
        --- 相当于 JDBC 中 statement 对象(或PreparedStatement或 CallableStatement)
        --- 默认的执行器 SimpleExcutor
        --- 批量操作 BatchExcutor
        --- 通过 openSession(参数控制)
    --- DefaultSqlSession 是 SqlSession 接口的实现类
    ---ExceptionFactory MyBatis 中异常工厂
```

流程

![image.png](https://i.loli.net/2019/10/26/5kwdHpFgQOKzhIn.png)

```Java{2}
解释
---在 MyBatis 运行开始时需要先通过 Resources加载全局配置文件.
---下面需要实例化 SqlSessionFactoryBuilder 构建器
---帮助 SqlSessionFactory接口实现类DefaultSqlSessionFactory.
---在实例化 DefaultSqlSessionFactory之前需要先创建XmlConfigBuilder解析全局配置文件流,并把解析结果存放在 Configuration 中.
---之后把Configuratin传递给 DefaultSqlSessionFactory.
---到此 SqlSessionFactory 工厂创建成功.
---由 SqlSessionFactory 工厂创建 SqlSession. 每次创建 SqlSession 时,都需要由 TransactionFactory创建Transaction对象,同时还需要创建 SqlSession 的执行器 Excutor,最后实例化DefaultSqlSession,传递给 SqlSession 接口. 
---根据项目需求使用 SqlSession 接口中的 API完成具体的事务操作.
---如果事务执行失败,需要进行rollback 回滚事务.
---如果事务执行成功提交给数据库.
---关闭 SqlSession
```
