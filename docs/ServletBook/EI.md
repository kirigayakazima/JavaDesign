# EI库
```
 传统方式获取作用域数据：
        缺点一：导入包
        缺点二：需要强转
        缺点三：获取数据的代码过于麻烦
使用EI表达式获取作用域数据：
    作用：获取作用域对象中的数据
        注意：获取的是pageContext、request、seesion、application四个对象中的数据，其他数据一概不理会，找到了则获取返回，找不到就什么都不做，也不报错
        语法：
            ${表达式}
            表达式：
                获取请求数据：
                    request对象存储了请求数据---->param.键名          返回值
                                             ---->paramvalues.键名    返回的是数组
                通过setAttribute方法存储到作用域对象中的数据
                    ${键名} 返回键名所对应方法值
                    注意：
                        如果存储的是普通字符串则直接返回
                        如果存储的是对象，则返回的是对象
                                获取对象中的数据：
                                    普通对象
                                        ${键名.属性名.属性名...}
                                    集合对象
                                        list集合--->${键名[角标]}
                                        map集合--->${键名.map集合存储的键名}
        作用域查找顺序：
            默认查找顺序：
            pageContext-->request-->session-->application
            注意：
                每次查找都是从小到大进行查找，找到了则获取，找不到就不继续找了
            指定查找：写哪一个就从那一个开始查找，依次往后面查找
                ${pageScope.键名}----${sessionScope.键名}---${requestScope.键名}----${applicationScope.键名}
        EI表达式的逻辑运算：
            ${逻辑表达式}   && || ！
            ${算术表达式}   + - * /
            ${关系表达式}   > < ==
            特殊：
                三目运算符
            注意：+指标是加法运算，不能用于字符串连接
        EI的空值判断：
            ${empty 键名}
            作用：
                判断键名对象的值是否存在有数据
        EI获取请求头数据和Cookie数据
            请求头数据：
                ${header}---->返回所有请求头的数据
                ${header['键名']}--->返回指定键名的数据
                ${headevalues['键名']}---> 返回指定的键名(同键不同值)的值的数组
            获取cookie数据：
                ${cookie}--->返回存储所有的cookie对象的map集合
                ${cookie.键名}--->返回指定的cookie对象
                ${cookie.键名.name}---> 返回指定的cookie对象存储的数据的键名
                ${cookie.键名.value}--->返回指定的cookie对象存储的数据的值
                    
```
# JSTL标签库
```
作用：用来提升JSP页面的逻辑代码的编码效率

    JSTL核心标签库
        1.导入包
        2.声明jstl标签库的引用 
            <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        3.内容：
             基本标签：
                //输出给客户端
                <c:out value="数据" default="默认值"></c:out>
                
                <c:set var="hello" value="world" scope="page"></c:set>
                    作用：存储数据到作用域对象中
                    var:存储键名
                    value:存储键值
                    scope:表示存储的作用域对象page request seesion application
                <c:remove var="hello" scpoe="page" />
                    作用：删除作用域的指定键的数据
                    var：表示要删除的键名
                    scope：表示要删除的作用域（可选）
                    注意：
                        如果不在作用域的情况使用该标签删除数据，会将四个作用域对象中的符合要求的数据全部删除
                <c:if test="${表达式}">
                        前端代码
                </c:if>
                    作用：进行逻辑判断，相当于java代码的分支判断
                    注意：
                        逻辑判断标签需要依赖于EI的逻辑运算，也就是表达式中涉及到的数据必须从作用域当中获取
                <c:choose>
                    <c:when test="">执行内容</c:when>
                    <c:when test="">执行内容</c:when>
                    <c:when test="">执行内容</c:when>
                    ...
                    <c:otherwise>执行内容</c:otherwise>
                </c:choose>
                    作用：用来进行多条件的逻辑判断，类似java的多分支语句
                    注意：
                        条件成立只会执行一次，都不成立则执行otherwise
                <c:foreach begin="1" end="4" step="2" varStatus="vs">
                    循环体
                </c:foreach>
                作用：
                    循环内容进行处理
                使用：
                    begin：声明循环开始位置
                    end：声明循环结束位置
                    step：设置步长
                    varStatus:声明vs变量记录每次循环的数据（角标，次数，是否是第一次或者最后一次循环）
                    ${vs.index}--->${vs.count}--->${vs.first}--->${vs.last}
                    items:声明要遍历的对象，结合EI表达式获取对象
                    var：声明变量记录每次循环的结果，存储在作用域
                    
```
