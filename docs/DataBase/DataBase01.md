# MySql
## 一、Navicat客户端软件
## 二、MySql命令行操作

*当前在库里面建立了一个mydb2的库，可以随意查看*

在cmd中操作
使用root登录，默认是123456；自定义了一个名为testjdbc的数据库,注意下面的语句的分号需要带上
登录操作| mysql -hlocalhost-uroot-p123456
---|--- |
退出操作|exit
数据库操作 | 建库:create database testjdbc;<br>卸载库:drop database testjdbc;<br>显示所有数据库:show databases;<br>选择库:use testjdbc;
表操作|建表的sql语句:<br>显示库中的所有表:show tables;<br>显示某个表的内容:descible testjdbc;<br>插入信息:<br>insert into t_user (username,pwd,regTime) values ("qyxe",333.now());

## 三、JDBC(Java Database Connection)
访问数据库流程
先加载JDBC驱动，再建立与数据库连接，然后发送SQL查询，最后得到查询结果
```Java{2}
//Connection接口
-Connection与特定数据库的链接，在连接上下文中执行SQL语句并返回结果
-DriverManager的getConnection()方法建立在JDBC URL中定义的数据库Connection连接上
-连接MYSQL数据库:
        -Connection con=
         DriverManager.getConnection("jdbc:mysql://host:port/database","user","password");
-连接ORACLE数据库
        -Connection con=
         DriverManager.getConnection("jdbc:oracle:thin:@host:pport:database","user","password");
```

```Java{2}
//连接testjdbc数据库
package com.bjsxt.jdbc;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;

public class Demo01 {
	public static void main(String[] args) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			//这里使用之前创造好的testjdbc这个数据库
			//检测一下连接花了多少时间,建立连接（连接对象内部其实包含了一个Socket对象，是一个远程的连接，比较耗时，这是Connection对象管理的一个重点）
			//真正的开发中，为了提高效率，都会使用连接池来管理连接对象
			long start=System.currentTimeMillis();
			Connection conn=(Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","123456");
			long end=System.currentTimeMillis();
			System.out.println(conn);
			System.out.println("连接花费时间:"+(end-start)+"ms");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
```
## 四、Statement接口
```Java{2}
-用于执行静态SQL语句并返回它所生产结果的对象
-三种Statement类：
    -Statement:
        -由createStatement创建，用于发送简单的SQL语句（不带参数）
    -PreparedStatement:
        -继承自Statement接口，由prepareStatement创建，用于发送含有一个或者多个输入参数的SQL语句，PreparedStatement对象比Statement对象的效率更高，并且可以防止SQL注入，我们一般都用PreparedStatement
    -CallableStatement
        -继承自PreparedStatement，由方法prePareCall创建，用于电用存储过程
-常用的Statement方法
    -execute()                  //运行语句，返回是否含有结果集
    -executeQuery()             //运行select语句，返回ResultSet结果集  
    -executeUpdate()            //运行insert/update/delete操作，返回更新的行数
```

```Java{2}
//Statement代码实现
package com.bjsxt.jdbc;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;
import java.sql.Statement;
 
public class Demo02 {
	public static void main(String[] args) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection conn=(Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","123456");
			//实际用的很少，容易发生sql注入的危险  
			String idString="5 or 1=1";
			//如果把这个传进去，那么数据库会被清零
			
			//把sql添加到数据库
			Statement stmt= conn.createStatement();
			String sql="insert into t_user (username,pwd,regTime) values ('清羽',44,now())";
			stmt.execute(sql);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}   
}

```

```Java{2}
//PreparedStatement代码实现
package com.bjsxt.jdbc;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import com.mysql.jdbc.Connection;

public class Demo03 {
	public static void main(String[] args) {
		try {
			//加载驱动类
			Class.forName("com.mysql.jdbc.Driver");
			Connection conn=(Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","123456");
			
			String sql="insert into t_user (username,pwd,regTime) values (?,?,?)";//?是占位符
			PreparedStatement ps=conn.prepareStatement(sql);
			ps.setString(1, "清舞哦");
			ps.setString(2, "123456");
			ps.setObject(3, new Date());
			System.out.println("插一行记录");
			ps.execute();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}   
}

```
