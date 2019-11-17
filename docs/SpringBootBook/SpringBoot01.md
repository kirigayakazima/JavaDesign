# 快速上手
配置完毕后，启动main即可看到内嵌tomcat在8080端口启动完毕
### pom.xml配置
```Xml{2}
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.5.9.RELEASE</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```
### 主程序
```Java{2}
//注解标明这是一个Spirng Boot应用
@SpringBootApplication
public class HelloWorldMainApplication {
    public static void main(String[] args) {
        //Spring 应用启动
        SpringApplication.run(HelloWorldMainApplication.class,args);
    }
}

```
### 控制层
```Java{2}
@Controller
public class HelloController {
    @ResponseBody
    @RequestMapping("/hello")
    public String hello(){
    return "hello world";
    }
}
```
## 简化部署
#### 打包完成后，可以直接使用java -jar 包名  的方式打开，jar包里面自带了tomcat环境
```Xml{2}
<!-- 这个插件可以将应用打包成一个jar包-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```
# pom.xml配置和入口
## 父项目
```Xml{2}
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.5.9.RELEASE</version>
</parent>

//上面这个依赖的父项目

//真正管理Spring Boot应用里面的所有依赖版本，即Spring Boot里面的仲裁中心，导入的依赖默认是不需要写版本的(没有在dependencies里面管理的依赖自然需要声明版本号)
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-dependencies</artifactId>
	<version>1.5.9.RELEASE</version>
	<relativePath>../../spring-boot-dependencies</relativePath>
</parent>
```
## 导入依赖
```Xml{2}
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```
**spring-boot-starter**-web

**spring-boot-starter**:spring-boot场景启动器，帮我们导入了Web模块正常运行所需要的组件

Spring Boot将所欲的功能场景都抽取出来，做成一个个的starters(启动器)。只需要在项目里面引入这些starter相关场景，所有依赖都会导入进来，要什么功能就导入什么场景的启动器

## 主程序类、主入口类
```Java{2}
//注解标明这是一个Spirng Boot应用
@SpringBootApplication
public class HelloWorldMainApplication {
    public static void main(String[] args) {
        //Spring 应用启动
        SpringApplication.run(HelloWorldMainApplication.class,args);
    }
}
```
**@SpringBootApplication**:Spring Boot 应用标注在某个类上说明这个类是Spring Boot的主配置类，Spring Boot就应该运行这个类的main方法，启动Spring Boot应用


```Java{2}
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {
```
**@SpringBootConfigruation**:Spring Boot的配置类:
标注在某个类上，这是表示一个Spring Boot的配置类

&emsp;&emsp;**@Configruation**:配置类上来标注这个注解

&emsp;&emsp;配置类----配置文件    
&emsp;&emsp;配置类也是容器中的一个组件,例如@Component组件


**@EnableAutoConfigruation**:开启自动配置功能

&emsp;&emsp;**@AutoConfigurationPackage**:自动配置包

&emsp;&emsp;&emsp;&emsp;@Import(AutoConfigurationPackages.Registrar.class)

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Spring的底层注解@Import,给容器中导入一个组件；导入的组件AutoConfigurationPackages.Registrar.class
 
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;将主配置类(@SpringBootApplication标注的类)的所在包以及下面所有子包里面的所有组件扫描到Spring容器

&emsp;&emsp;**@Import**(EnableAutoConfigurationImportSelector.class)

&emsp;&emsp;&emsp;&emsp;给容器导入组件

&emsp;&emsp;&emsp;&emsp;EnableAutoConfigurationImportSelector:导入那些组件的选择器，将所有需要导入的组件以全类名的方式返回，这些组件就会被添加到容器中

&emsp;&emsp;&emsp;&emsp;有了自动配置类，免去了手动编写配置注入功能组件等工作

&emsp;&emsp;&emsp;&emsp;SpringFactoriesLoader.loadFactoryNames(EnableAutoConfiguration.class.classLoader)

&emsp;&emsp;&emsp;&emsp;Spring Boot在启动的时候从类路径下的META-INF/spring.factories中获取EnableAutoConfiguration指定的值，将这些值作为自动配置类导入到容器中，自动配置类生效，帮我们自动配置工作 

&emsp;&emsp;&emsp;&emsp;J2EE的整体整合解决方案和自动配置都在spring-boot-autoconfiguration-1.5.9.RELEASE.jar
