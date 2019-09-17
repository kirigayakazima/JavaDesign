# MySql入门
## 一、基本操作
```Mysql{2}
//针对本机的mysql数据库，登录语句
mysql -hlocalhost -uroot -p123456
//显示数据库
show databases;
//选择数据库
use mydb2;
//查看数据库里面的表
show tables;
//查看表里面的列,describe的用法和show一样 
show columns from t_user;
describe t_user;
//用于显示广泛的服务器状态信息
show status;
//显示赋予用户的安全权限
show grants;
//显示创建特定数据库
show create database mydb2;
//显示创建特定表
show create table t_user;
//显示服务器错误或者警告
 show errors;
 show warning;
```
## 二、检索
```Mysql{2}
//检索一个列
select pwd from t_user;
//检索多个列
select pwd, username from t_user;
select * from t_user;
//检索列中的唯一行
select distinct pwd form t_user;
//限制返回行数
select pwd from t_user limit 1;
//加入检索start位置,第一个参数是start，第二个是要返回的行数个数
select pwd from t_user limit 1,1;           //返回第二行
//使用完全限定表名(绝对表名)
select pwd from mydb2.t_user;
```
## 三、排序
```Mysql{2}
//对名字进行按照字母顺序排序
select username from t_user order by username;
//对多个列进行排序
select username, pwd from t_user order by username, pwd;
//降序排列
select pwd from t_user order by pwd DESC;
```
## 四、过滤数据
```Mysql{2}
//过滤出pwd为456的数据
select pwd, username from t_user where pwd=456;
//where操作符
=                       //等于
<>                      //不等于
!=                      //不等于
<                       //小于
<=                      //小于等于
>                       //大于
>=                      //大于等于
between                 //在指定的两个值之间

//同样检查username也可以
select username, pwd from t_user where username ='ee';
//使用 between
select username,pwd from t_user where pwd between 44 and 789;
select pwd from t_user where pwd is null;
```
## 五、组合过滤
```Mysql{2}
//使用and同时约束两个属性
select username, pwd from t_user where username!='ee' and pwd >=20;
//使用or
select usernmae, pwd from t_user where username='ee' or pwd >789;
```
### (1) 优先级
and的优先级大于or
可以自行使用()进行优先级运算
### (2)IN操作符
```Mysql{2}
//只取id为4和9的，并且按照pwd排序,用法和or差不多，
select username, pwd from t_user where id IN (4,9) order by pwd;
```
### (3)not操作符
```Mysql{2}
//取id非4和9的其他数据，not在这种简单的语句中没有什么优势，但是在复杂的语句中非常占有优势
select usernanme, pwd from t_user where id not IN (4,9) order by pwd;
```
### 六、通配符过滤
*通配符不要过度使用*
```
//取出以e开头的数据
select username, pwd from t_user where username like 'e%';
//取出含有x的数据
select username, pwd from t_user where username like '%x%';
//取出以s开头e结尾的数据
select username, pwd from t_user where username like 's%e';
//_的用法和%一样，但是只能匹配单个字符,匹配se开头的数据
select username, pwd from t_user where username like '_se'
