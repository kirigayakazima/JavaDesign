# MySql入门
## 一、基本操作
```Java{2}
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
