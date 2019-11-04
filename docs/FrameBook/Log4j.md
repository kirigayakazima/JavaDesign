# Log4j
 
### 使用步骤
```Java{2}
1.导入log4j-xxx.jar
2.在src下新建log4j.properties(路径和名称都不允许改变)
```
### log4j输出级别
```Java{2}
fatal(致命错误)>error(错误)>warn(警告)>info(普通信息)>debug(调试信息)
可以在log4j.properties中的第一行控制输出级别
也可以控制输出目的地
//表示控制台和文件地能够输出
log4j.rootCategory=INFO,CONSLOE,LOGFILE
```
log4j中可以输出指定内容日志（控制某个局部内容的日志级别）
```Java{2}
1.命名级别（包级别）:<mapper> namespace属性中除了最后一个类名
例如：namespace="cpm.qym.mapper.PeopleMapper"包级别是com.qym.mapper，需要在log4j.propeties中配置如下,现在总体中调出Error，不输出无用信息，然后在设置某个指定位置为DEBUG
log4j,rootCategory=ERROR,CONSLOE,LOGFILE
log4j.logger.com.qym.mapper=DEBUG

2.类级别，namespace属性值，namespace类名
3.方法级别，使用namespace属性值+标签id属性值
```
### 常用表达式
```Java{2}
%c 包名+类名
%d{YYYY-MM-dd HH:mm:ss} 时间
%L 行号
%m  信息
%n  换行
```
### 用法展示
```Java{2}
log4j.rootCategory=DEBUG, CONSOLE,LOGFILE

log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
log4j.appender.CONSOLE.layout.ConversionPattern=-%p-%d{yyyy/MM/dd HH:mm:ss,SSS}-%l-%L-%m%n

log4j.appender.LOGFILE=org.apache.log4j.FileAppender
log4j.appender.LOGFILE.File=D:/axis.log
log4j.appender.LOGFILE.Append=true
log4j.appender.LOGFILE.layout=org.apache.log4j.PatternLayout
log4j.appender.LOGFILE.layout.ConversionPattern=-%p-%d{yyyy/MM/dd HH:mm:ss,SSS}-%l-%L-%m%n

```
### <settings>标签
```Xml{2}
1.在mybatis全局配置文件中通过<settings>标签控制mybatis全局开关
2.在mybatis.xml中开启log4j
<settings>
    <setting name="logImpl" value="LOG4J">
</settings>
```
## AOP
### 功能
```
原有功能：切点
前置通知：在切点之前执行的功能：before advice
后置通知：在切点之后执行的功能：after advice
如果切点执行过程中出现异常，会触发异常通知 throws advice
所有功能总称为切面
织入：把切面嵌入到原有的功能的过程叫做织入
```

依赖包

<a href="https://sm.ms/image/enjGpsIoiHM6yC7" target="_blank"><img src="https://i.loli.net/2019/11/03/enjGpsIoiHM6yC7.png" alt="591_ZV_A_H9`C_6VBHL_~_O.png"></a>


```Java{2}
//新建通知类
    /*新建前置通知类
    arg0: 切点方法对象 Method 对象
    arg1: 切点方法参数
    arg2:切点在哪个对象中
    */
        public class MyBeforeAdvice implements MethodBeforeAdvice {
            @Override
            public void before(Method arg0, Object[] arg1, Object arg2) throws Throwable {
                System.out.println("执行前置通知");
            }
        }
    /*新建后置通知类
    arg0: 切点方法返回值
    arg1:切点方法对象
    arg2:切点方法参数
    arg3:切点方法所在类的对象
    */
        public class MyAfterAdvice implements AfterReturningAdvice {
            @Override
            public void afterReturning(Object arg0, Method arg1,Object[] arg2, Object arg3) throws Throwable {
            System.out.println("执行后置通知");
            }
        }
```
