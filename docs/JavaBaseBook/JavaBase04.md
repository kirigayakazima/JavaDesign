# 接口与内部类

## (1) 接口
```Java{2}
public interface Comparable
{
    int compareTo(Object other);
}
//改进为泛型类型
public interface Comparable<T>
{
    int compareTo(T other);
}
```
接口中的方法自动属于public，因此在接口中声明方法时，不必要提供public关键字,但是实现接口时，要把方法声明为public

要让一个类实现一个借口，需要两步：将类声明为实现给定的接口；对接口中所有方法进行定义。
```Java{2}
class Employee implements Comparable{}
```
接口不是类，只能由子类实现，接口也可以被继承
### （2）抽象类
```Java{2}
//抽象类在声明过程不需要实现，实现由子类进行
abstract class Comparable
{
    //具体方法    
}
class Employee extends Comparable
{
    //具体方法的实现
}
```
一个抽象类只能扩展一个类，比如Comparable这个抽象类已经扩展了Employee这个类，那么他就能再扩展另外的类。

*Java的类不支持多继承，但是接口支持多继承*
接口可以提供多重继承的大多数好处，同时还能避免多重继承的复杂性和低效性。

### (3) 对象克隆
当拷贝一个变量时，原始变量和拷贝变量会引用同一个对象，这个时候改变一个变量所引用的对象的时候将会对另一个变量产生影响.
