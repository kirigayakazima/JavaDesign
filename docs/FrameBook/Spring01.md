# Spring
```
IoC/DI          控制反转/依赖注入
AOP             面向切面编程
声明式事务
```
### Spring框架runtime
```
test:spring提供测试功能
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
```
applicactionContext.xml配置的信息最终存储到了Spring容器ApplicationContext中 
```
### xml文件配置

通过bean创建对象，默认是加载xml文件后对象就被创建了

index：参数的索引，从0开始

name：参数名

type：类型(区分关键字和封装类int和Integer)
#### 创建对象的三种方法
构造方法创建
```
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
```
public static People newInstance(){
		return new People();
	}
```

xml配置
```
<bean id="factory" class="com.qym.pojo.PeopleFactory"></bean>
<bean id="peo1" factory-bean="factory" factory-method="newInstance"></bean>
```
静态工厂

创建一个工厂，添加一个newInstance的静态方法方法返回一个People对象

xml配置
```
<bean id="peo2" class="com.qym.pojo.PeopleFactory" factory-method="newInstance"></bean>
```
## 给Bean属性赋值
### 属性是基本数据类型或String等简单类型
```
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
```
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
```
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
```
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
```
<bean id="peo" class="com.qym.pojo.People">
    <property name="desk" ref="desk"></property>
</bean>

<bean id="desk" class="com.qym.pojo.Desk">
    <property name="id" value="1"></property>
    <property name="price value="2"></property>
</bean>
```
