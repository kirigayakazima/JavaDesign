# 配置文件
SpringBoot使用一个全局的配置文件，配置文件名是同定的

配置文件的作用：修改SpringBoot自动配置的默认值

application.properties

application.yml

## yml的用法
### 值的写法
字面量：普通的值（数字，字符串，布尔）
```yaml{3}
k:v：字面直接来写：
    字符串默认不用加上单引号或者双引号；
    ""：双引号；不会转义字符串里面的特殊字符；特殊字符会作为本身想表示的意思name:"zhangsan\n lisi"：输出；zhangsan 换行 lisi
    "：单引号；会转义特殊字符，特殊字符最终只是一个普通的字符串数据name:‘zhangsan\n lis'：输出；zhangsan\n lisi
```
### 对象、Map（属性和值）（键值对）
```yaml{3}
k:v：在下一行来写对象的属性和值的关系:
    注意缩进对象还是k:v的方式
    friends：
        lastName:zhangsan
        age：20
        
    行内写法：
    friends:{lastName:zhangsan，age：18}
```
### 数组（List、Set）：用-值表示数组中的一个元素
```yaml{3}
pets：
    -cat
    -dog
    -pig
行内写法:
pets:[cat，dog，piglT
```
### bean实体类的两种配置方式
<details>
    <summary>对应Person实体类的yml配置</summary>
    
    
```yaml{3}
person:
last-name: hello
age: 18
boss: false
birth: 2019/12/06
maps: {k1:v1,k2:v2}
lists:
- 玄儿
- xuaner
dog:
name: xiaogou
age: 1

```
    
</details>

<details>
  <summary>使用@ConfigurationProperties(prefix="person")</summary>
  Person实体类其他位置不需要改变
  
```Java{3}
@Component
@ConfigurationProperties(prefix = "person")

```
</details>

<details>
  <summary>使用@Value("${person.last-name}")</summary>
  删除Person实体类的@ConfigurationProperties注解
  
  
```Java{3}
@Component

在对应的数据成员上面加上对应的@Value注解
@Value("${person.last-name}")
private String lastName;

也可以直接使用对应的值传入
@Value("#{11*2}")
private Intger age;

@Value("true")
private Boolean boss;
```
</details>


功能 |@ConfigurationProperties|@Value
---|---|---
松散绑定(松散语法) | 支持|不支持
SpEL| 不支持|支持
JSR303数据校验|支持|不支持
复杂类型封装|支持|不支持

**配置文件yml还是properties他们都能获取到值**

**如果说，我们只是在某个业务逻辑中需要获取一下配置文件中的某项值，使用@Value**

**如果说，我们专门编写了一个javaBean来和配置文件进行映射，我们就直接使用@ConfigurationProperties**

<details>
    <summary>松散语法</summary>
    
    ```
    yml中出现
    last-name: hello
    
    @ConfigurationProperties会自动转换成lastName
    
    @Value中只能和yml中的配置一一对应
    ```
    
</details>

<details>
    <summary>SpEL</summary>
    
    ```Java{2}
    实体类中@Value中出现
    @Value("#{11*2}")
    可以进行计算
    
    但是@ConfigurationProperties导入的ymlz中不能使用
    
    ```
    
</details>

<details>
    <summary>JSP303数据校验</summary>
    
    ```
    在实体类上面添加一个@Validated注解
    在实体类内部的数据成员上添加@Email
    表明这个数据只能是email格式的，不是这个格式的会报错
    ```
    
</details>
