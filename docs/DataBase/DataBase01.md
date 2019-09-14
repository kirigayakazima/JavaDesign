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
## 五、批处理
-Batch<br>
-对于大量的批处理，建议使用Statement，因为PreparedStatement的预编译空间有限，当数据量特别大时，会发生异常
```Java{2}
//批量处理代码,下次数据放少点，避免卡死
package com.bjsxt.jdbc;

import java.sql.*;

public class Demo05 {
	public static void main(String[] args) {
		Connection conn=null;
		java.sql.Statement stmt=null;
		ResultSet ps=null;
		try {
			//加载驱动类
			Class.forName("com.mysql.jdbc.Driver");
			conn=(Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","123456");
			conn.setAutoCommit(false);//设置为手动提交
			
			stmt=conn.createStatement();
			long start=System.currentTimeMillis();
			for(int i=0;i<20000;i++) {
				stmt.addBatch("insert into t_user (username,pwd,regTime) values ('清羽"+i+"',666666,now())");
			}
			long end=System.currentTimeMillis();
			System.out.println("插入时间为"+(end-start)+"ms");
			stmt.executeBatch();
			conn.commit();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}catch (SQLException e) {
			e.printStackTrace();
		}finally {
			try {
				if (conn!=null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			try {
				if (stmt!=null) {
					stmt.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			try {
				if (ps!=null) {
					ps.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}   
}

```
## 六、事务基本概念
### (1) 事务的四大特点(ACID)
```Java{2}
-atomicity(原子性)
    -表示一个事务内的所有操作是一个整体，要么全部成功，要么全部失败
-consistency(一致性)
    -表示一个事务内有一个操作失败时，所有更改过的数据都必须回滚到修改前的状态
-isolation(隔离性)
    -事务查看数据时数据所在的状态，要么是另一并发事务修改它之前的状态，幺妹是另一事物修改它之后的状态，事务不会查看中间状态的数据
-durability(持久性)
    -持久性事务完成之后，它对于系统的影响是永久性的
```

```Java{2}
//代码实现，这里是个错误示范，数据库并不会插入数据，而是回滚到上次的状态
package com.bjsxt.jdbc;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;


import com.mysql.jdbc.Connection;

public class Demo06 {
	public static void main(String[] args){
		Connection conn=null;
		try {
			//加载驱动类
			Class.forName("com.mysql.jdbc.Driver");
			conn=(Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","123456");
			
			String sql="insert into t_user (username,pwd) values (?,?,?)";//?占位符
			PreparedStatement ps=conn.prepareStatement(sql);
			ps.setObject(1, "清羽玄儿");//把id大于2的返回
			ps.setObject(2, "清舞玄儿");
			ps.execute();
			System.out.println("插入了1个用户");
			try {
				Thread.sleep(6000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			PreparedStatement ps1=conn.prepareStatement(sql);
			ps1.setObject(1, "清羽玄儿新1");
			ps1.setObject(2, "清舞玄儿新1");
			ps.execute();
			System.out.println("插入2个用户");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			try {
				conn.rollback();
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}   
}

```
## 七、时间类型
```Java{2}
java.util.Date
    -子类：java.sql.Date                //表示年月日
    -子类：java.sql.Time                //表示时分秒
    -子类：java.sql.Timestamp           //表示年月日时分秒
```

```Java{2}
//代码实现
/*可以加上一个for循环，在时间上定义一个random，然后操作数据，实现不同时间的用户数据*/
package com.bjsxt.jdbc;

import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Time;

import com.mysql.jdbc.Connection;

public class Demo07 {
	public static void main(String[] args){
		Connection conn=null;
		try {
			//加载驱动类
			Class.forName("com.mysql.jdbc.Driver");
			conn=(Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","123456");
			
			String sql="insert into t_user (username,pwd,regTime,lastLoginTime) values (?,?,?,?)";//?占位符
			PreparedStatement ps=conn.prepareStatement(sql);

			ps.setObject(1,"清羽玄儿");
			ps.setObject(2, "123456");
			
			Date date=new Date(System.currentTimeMillis());
			Time stamp=new Time(System.currentTimeMillis());
			
			ps.setDate(3, date);
			ps.setTime(4, stamp);
			
			ps.execute();
			System.out.println("插入了1个用户");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}   
}

```
## 八、CLOB(Character Large Object)
```Java{2}
-用于存储大量文本数据
-大字段有些特殊，不同数据库处理方式不一样，大字段的操作常常是以流的方法来处理的，而非一般的字段，一次即可读出数据
Mysql中的相关类型
-TINYTEXT最大长度为255字符的TEXT列
-TEXT[(M)] 最大长度为65535字符的TEXT列
-MEDIUMTEXT最大长度为16777215字符的TEXT列
-LONGETEXT最大长度为4294967295或4GB字符的TEXT列

//将程序中的字符串输入到数据库的CLOB字段中
//将字符串转换为字节，再将字节装换为字节流，再将字节流转换为输入流
ps.setClob(2,new BufferedReader(new InputStreamReader(new BtyeArrayInputStream("aabbbac".getBytes()))))

//或者正常的读取盘符
ps.setClob(2,new FileInputStream("D:/...."))
```
## 九、BLOB(Binary Large Object)
```Java{2}
-用于存储大量二进制数据
-大字段有些特殊，不同数据库处理方式不一样，大字段的操作常常是以流的方法来处理的，而非一般的字段，一次即可读出数据
Mysql中的相关类型
-TINYBLOB最大长度为255字符的TEXT列
-BLOB[(M)] 最大长度为65535字符的TEXT列
-MEDIUMBLOB最大长度为16777215字符的TEXT列
-LONGEBLOB最大长度为4294967295或4GB字符的TEXT列

//把图片文件存入
ps.setBlob(2,new FileInputStream("D:/...."))
```
## 十、JDBCUtil
```Java{2}
//封装
package com.bjsxt.jdbc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;



public class JDBCUtil {
	static Properties pros=null;
	static {//加载JDBCUtil类的时候调用
		pros=new Properties();
		try {
			pros.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("db.properties"));
		} catch (IOException e) {
			// TODO: handle exception
		}
	}
	public static Connection getMysql() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			return (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/testjdbc","root","123456");
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	public static void close(ResultSet rs,PreparedStatement ps,Connection conn) {
		try {
			if (ps!=null) {
				ps.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			if (conn!=null) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			if (rs!=null) {
				rs.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}

```

```Java{2}
package com.bjsxt.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Demo10 {
	public static void main(String[] args) {
		Connection conn=null;
		ResultSet rs=null;
		PreparedStatement ps=null;
		try {
			conn=JDBCUtil.getMysql();
			ps=conn.prepareStatement("insert into t_user (username) values (?)");
			ps.setString(1, " qingyu");
			ps.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JDBCUtil.close(rs, ps, conn);
		}
	}
}

```

```Java{2}
//配置文件
mysqlURL:jdbc:mysql://loaclhost:3306/sorm
mysqlDriver:com.mysql.jdbc.Driver
mysqlUser:root
mysqlPwd:123456
```
## 十一、ORM(Object Relationship Mapping)的基本思想
```Java{2}
-表结构跟类对应：表中字段和类的属性对应；表中记录和对象对应
-让javabean的属性名和类型尽量和数据库保持一致
-一条记录对应一个对象，将这些查询到的对象放到容器中(List,Set,Map)
//使用Object[]封装一条记录 
//使用一个List<Object[]>存储多条记录

//使用Map来封装一条消息
//使用List<Map>存储多条记录

//使用javabean来封装一条记录
//使用List<javabean>存储多条记录
```


