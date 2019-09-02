#类与对象
对象变量不包含对象，只能够引用对象
```Java{2}
String str=new String("清羽玄儿");             //str是对象变量，清羽玄儿这个字符串是字符串对象，str引用该字符串
```
## 一、GregorianCalendar类
```Java{2}
new GregorianCalendar();                    //可以传参年月日
/*使用get方法获取GregorianCalendar对象的对应时间*/
GregorianCalendar time=new GregorianCalendar();
int month=time.get(Calendar.MONTH;
int weekday=time.get(Calendar.DAY_OF_WEEK);
/*使用set方法来设置想要的时间,可以一起设置年月日*/
deadLine.set(Calendar.YEAR,2019);
deadLine.set(Calendar.MONTH,8);
deadLine.set(Calendar.DAY_OF_MONTH,30)
```
## 二、自定义类
需要成员变量，建议写上空构造，避免在某些情况下发生一些隐蔽的问题。

注意在自定义类当中，为了不破坏封装性，不应该在公有方法里面返回私有的对象，这样会导致外部接受该变量的时候通过改变器改变该原对象的属性。

一个方法不可能改变基本数据类型的参数，但是对象引用作为参数就不一样了，可能会被改变

## 三、final
被final修饰的不能被改变

##  四、 无参构造器
如果自定义一个类的时候没有写构造器，那么系统会自动分配一个无参构造器，这个构造器将所有的实例设置为默认值。
所有的数值型设为0，布尔型设为false，对象设为null。
如果只写了一个带参数的构造器，那么在实例化的时候出现不带参数的实例化的时候，就会报错，所以建议在写构造器的时候带上一个无参构造器

## 五、 初始化块
在一个类的声明中，可以包含多个代码块，只要构造类的对象，这些块就会被执行。

## 六、 类的职责
类的名字和方法要能够体现他们的职责，类的单一职责，将过多职责的类分解开。



