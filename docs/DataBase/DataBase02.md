# MySql入门
## 一、基本操作
```
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
```
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
```
//对名字进行按照字母顺序排序
select username from t_user order by username;
//对多个列进行排序
select username, pwd from t_user order by username, pwd;
//降序排列
select pwd from t_user order by pwd DESC;
```
## 四、过滤数据
```
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
```
//使用and同时约束两个属性
select username, pwd from t_user where username!='ee' and pwd >=20;
//使用or
select usernmae, pwd from t_user where username='ee' or pwd >789;
```
### (1) 优先级
and的优先级大于or
可以自行使用()进行优先级运算
### (2)IN操作符
```
//只取id为4和9的，并且按照pwd排序,用法和or差不多，
select username, pwd from t_user where id IN (4,9) order by pwd;
```
### (3)not操作符
```
//取id非4和9的其他数据，not在这种简单的语句中没有什么优势，但是在复杂的语句中非常占有优势
select usernanme, pwd from t_user where id not IN (4,9) order by pwd;
```
## 六、通配符过滤
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
```
## 七、正则表达式
### (1)普通指令
```
//检索列usernmae其中包含1000的所有行
select username, pwd from t_user where uername regexp '1000' order by uername;
//like和regexp的区别在于前者是匹配整个列，后者不能匹配整个列,正则表达式的匹配不区分大小写
//正则表达式中使用or语句
regexp '1000|2000';
//匹配1或者2或者3
 regexp '[123]';
 regexp '1|2|3';
//匹配1-9，a-z
regexp '[1-9]'
regexp 'a-z'
```
### (2)特殊匹配符
```
//特殊匹配符.使用的时候必须使用 \\把它转义，当做前导,
regexp '\\.'                //表示检索.
regexp '\\-'                //表示检索-
regexp '\\f'                //换页
regexp '\\n'                //换行
regexp '\\r'                //回车
regexp '\\t'                //制表
regexp '\\v'                //纵向制表
regexp '\\\'                //表示检索\

//重复元字符
*                           //0个或者多个匹配
+                           //1个或者多个匹配(等于{1,})
?                           //0个或者1个匹配(等于{0,1})
{n}                         //指定数目的匹配
{n,}                        //不少于指定数的匹配
{n,m}                       //匹配数目的范围(m的范围不超过255)
```
### (3)定位符
```
^                           //文本的开始
$                           //文本的结尾
[[:<:]]                     //词的开始
[[:>:]]                     //词的结尾
```
## 八、创建计算手段
### (1)拼接
```
//输出是ee(123456)这种形式
select Concat(username, '(',pwd,')') from t_user order by username;
//还可以使用RTrim去掉右侧空格，LTrim去掉左侧空格,Trim去掉所有空格
select Concat(RTrim(username),'(',LTrim(pwd),')') from t_user order by username;
```
### (2)使用别名
```
//首行显示为excel
select Concat(RTrim(username),'(',RTrim(pwd),')') as excel from t_user order by username;
```
### (3)执行算数计算
```
//此处使用t_price这个表，显示一个新的列expan_price,并且排序
select name,price,weight,price*weight as expan_price from t_price where num =1 order by expan_price;
```
## 九、使用数据处理函数
### (1)常用文本处理函数
```
Left()                      //返回串左边的字符
Length()                    //返回串的长度
Locate()                    //找出穿的一个子串
Lower()                     //将串转化为小写
LTrim()                     //去掉左边的空格
Right()                     //返回右边的串
RTrim()                     //去掉串右边的空格
Soundex()                   //返回串的SOUNDEX值
SubString()                 //返回子串的字符
Upper()                     //将串转换为大写
//全部化成大写
select username,Upper(username) as upper_username from t_user order by username;
//查找和ax发音相似的
select username, pwd from t_user where Soundex(username)=Soundex('ax');

```
### (2)时间函数
```
//建议使用以下形式的,使用Date是一个好习惯
select username, pwd from t_user where Date(regTime)='2005-09-01';
```
### (3)数值处理函数
```
Abs()
Cos()
Exp()
Mod()
Pi()
Rand()
Sin()
Sqrt()
Tan()
```
## 十、数据汇总
```
AVG()                   //返回某列的平均值
COUNT()                 //返回某列的行数
MAX()                   //返回某列的最大值
MIN()                   //返回某列的最小值
SUM()                   //返回某列值之和
```
## 十一、分组数据
```
//使用语句查看不同组的信息
select num, Count(*) as num_Com from t_price group by num;
```
### (1) 过滤分组
```
//having能够兼容所有where的操作
//使用having过滤获得组内成员数量大于2的分组
select num,Count(*) as num_Com from t_price group by num having Count(*)>2;
```
### (2) 分组和排序

order by | group by
---|---
排序产生的输出| 分组行，但是输出可能不是分组的顺序
任意列都可以使用使用（甚至非选择的列也可以使用）| 只可能使用选择列或者表达式列，而且必须使用每个选择列表达式
不一定需要|如果与聚焦函数一起使用列，则必须要使用

## 十二、使用子查询
###  利用子查询进行过滤
```
//返回num为2的price的所有数据
select num,name,price from t_price where price IN(select price from t_price where num='2');

//先找到customer为Tom的所有数据，然后在在这些数据里面找到对应的num数据，在通过num数据找到对应的全部数据
select num,name,price,price*weight as Price from t_price where num IN(select num from t_price where customer IN(select customer from t_price where customer='Tom'));
```
## 十三、联结表
### (1)创建联结
不能删除where，where很重要，不然就找不到想要的数据，所有的联结里面都应该具有where语句
```
//查找出t_user和t_price这两个表中有相同的num的数据
select name,price from t_user,t_price where t_user.num=t_price.num;
```
### (2)内部联结
```
//用法和where差不多，只是更规范
select name,price from t_user INNER JOIN t_price ON t_user.num=t_price.num;

```
### (3) 连接多个表
联结的表越多，性能越低，因此不要联结不必要的表

## 十四、创建高级联结
### (1)使用别名
更加方便操作
### (2)不同类型的联结
目前为止使用的所有联结都是自然联结
```
//自联结
select p1.num,p1.name from t_user as p1,t_user as p2 where p1.num=p2.num and p2.num='1';

```

```
//外部联结,可以使用RIGHT和LEFT
select t_user.num,t_price.name from t_user RIGHT OUTER JOIN t_price ON t_price.name=t_user.name;
```
## 十五、组合查询
### (1)使用UNION
使用UNION必须由两条或者以上的select语句才能够使用
```
//连接两个select语句
select num,name,price from t_price where id>4 and id<8 UNION select num, name from t_user where id>5 and id<8;
```
### (2)包含或取消重复的行
UNION默认去重，使用UNION ALL可以取消默认行为
### (3)对组合查询结果排序
只能使用一条order语句，因此只能放在最后一个select后面，但是order是属于最后一条语句的
## 十六、全文本搜索
```
//扩展搜索
select note_text from productnotes where match(note_text) Against('anvils' WITH QUERY EXPANSION);
//布尔文本搜索
select note_text from productnotes where Match(note_text) Against('heavy' IN BOOLEAN MODE);
//为了匹配heavy但不包含任意以rope开始的词的行，可以使用以下查询
select note_text from productnotes where Match(note_text) Against('heavy -rope*' IN BOOLEAN MODE);

+               //包含，词必须存在
-               //排除，词必须不出现
>               //包含，而且增加等级值
<               //包含，且减少等级值
()              //把词组成子表达式(允许这些子表达式作为一个组被包含，排除，排列等)
~               //取消一个词的排序值
*               //词尾的通配符
""              //定义一个短语(与单个词的列表不一样，它匹配整个短语以便包含或排除这个短语)
```
## 十七、插入数据
### (1)插入一个完整的行
```
//建议使用这种提供列名的方法，以免出现不必要的错误
insert into t_price(id,num,name,price,weight,customer) values('12','4','Apple','5.1','5.2','Ray');
//提高性能，降低insert语句的优先级，在insert后面加上LOW_PRIORITY
insert low_priority into
```
### (2)插入多个行
可以使用多个语句，在每个语句后面加上;隔开，或者在values里面再加上一个(),每一个()就是一组数据
### (3)插入检索出的数据
把一条select语句插入到表中，形成所谓的insert select
```
//把t_prices这个表的内容导入到t_price这个表当中,前提是t_prices中的id在price当中没用过
insert into t_price(id,num,name,price,weight,customer) select id,num,name,price,weight,customer from t_prices;
```
## 十八、更新和删除数据
### (1)更新数据
```
update t_price set name='last' where id='13';
update t_price set name='last',num='3' where id='13';
```
### (2)删除数据
```
//一定要小心，不能省略where，不然数据库就没有了,只是删除表里面的内容，而不是删除表本身
delete from t_price where id='13';
```
## 十九、创建和操作表
### (1)创建
```
//auto_increment    自动增加
create table t_price(
id          int         not null auto_increment,
num         int         not null,
name        char(50)    null.
price       double      null,
weight      double      null.
customer    char(50)    null,
primary key(id)
)engine=InnoDB;
```
### (2)引擎类型
所有的create table语句都要以ENGINE=InnoDB结尾，当然也可以使用其他的几个引擎<br>
InnoDB是一个可靠的事务处理引擎，它不支持全文本搜索
MEMORY在功能等同于MyISAM,但是由于数据储存在内存(不是在磁盘)中，速度很快(特别适合于临时表)<br>
MyISAM是一个性能极高的引擎，它支持全文本搜索，但不支持事务处理<br>
### (3)表操作
```
//给这个表添加一个新的列，
alter table t_prices add prices double;
//删除刚刚新添加的咧
alter table t_price drop column prices;
//删除表
drop table t_user;
//重命名表
rename table t_user to t_users;
```
## 二十、使用视图
### (1) 视图
```
//使用限制，视图必须命名唯一，不能给视图取与别的视图或者表相同的名字
//从两个表当中选择出username,name,price这几个属性，同时对这几个属性进行限制
select username,name,price from t_user,t_price where t_user.id=t_price.id and t_user.num=t_price.num and t_price.num='1';
```
## 二十一、安全管理
### (1)创建账号
```
//查看user,必须在mysql这个数据库中进行查看,以下操作都在mysql中进行操作
select user from user;
//创建一个用户名为xuaner密码为19990301的账户
create user xuaner identified by '19990301';
//修改用户名
rename user xuaner to qingyu;
//删除用户名
drop user qingyu;
//查看账户的权限
show grants for xuaner;
//给xuaner这个账户设置mydb2这个数据库里面所有的表的只读的权限
grant select  on mydb2.* to xuaner;
//使用revoke撤销赋予xuaner的权限
revoke select on mydb2.* from xuaner;
//更改密码，并且进行加密，新的摩玛必须使用Password()加密
set password for xuaner=Password('199903');
//也可以使用set password =Password('123456');来修改自己的密码，不加以修改root密码，免得忘了
```
## 二十二、备份数据
### (1)维护数据库
```
//检查t_user这个表的表键是否正确
analyze table t_user;
//发现并且恢复问题
check table t_user,t_price;

//诊断启动问题
--help显示帮助一个选项列表
--safe-mode装在减去某些最佳配置的服务器
--verbose显示全文本消息(为获得更详细的帮助消息与--help联合使用)
--version显示版本信息然后退出
```
### (2)查看日志文件
```
-错误日志。通常命名为hostname.err，位于data目录，此日志名可以用--log-error命令行选项更改
-查询日志，可能很大，不应该长期使用，通常命名为hostname.log，位于data目录，此名字可以用--log命令行选项更改
-二进制日志，通常命名为hostname-bin,位于data目录，此名字可以用--log-bin命令行选项更改
-缓慢查询日志，执行缓慢的任何查询，通常命名为hostname-slow.log，位于data目录，可以使用--log-slow-queries命令行选项更改
```

