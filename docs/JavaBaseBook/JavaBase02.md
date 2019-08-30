# Java高级基础
## 一、类与对象
对象变量不包含对象，只能够引用对象
```
String str=new String("清羽玄儿");             //str是对象变量，清羽玄儿这个字符串是字符串对象，str引用该字符串
```
### （1）GregorianCalendar类
```
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
### （2）自定义类
需要成员变量，建议写上空构造，避免在某些情况下发生一些隐蔽的问题。

注意在自定义类当中，为了不破坏封装性，不应该在公有方法里面返回私有的对象，这样会导致外部接受该变量的时候通过改变器改变该原对象的属性。

一个方法不可能改变基本数据类型的参数，但是对象引用作为参数就不一样了，可能会被改变

### （3）final
被final修饰的不能被改变








































```
super.f();                  /*直接调用父类的方法*/
super.value;                /*直接调用父类的成员属性*/
super();                    /*调用父类的构造属性，这句话永远是构造器里面的第一句话*/
```
