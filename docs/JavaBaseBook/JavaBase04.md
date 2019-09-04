 # 接口与内部类
 
 ## 一、 接口
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
 ## 三、抽象类
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
 
 ## 四、 对象克隆
 当拷贝一个变量时，原始变量和拷贝变量会引用同一个对象，这个时候改变一个变量所引用的对象的时候将会对另一个变量产生影响.
```Java{2}
//默认的克隆操作室浅拷贝，他并没有克隆包含在对象中的内部对象
//在Object类中，clone方法被声明为protected，因此无法直接调用anObject.clone()
//建议实现一个Cloneable接口，将clone重新定义为public，并且调用super.clone()
class Employee implements Cloneable
{
    public Employee clone() throws CloneNotSupportedException
    {
        return (Employee)super.clone();
    }
}
//只要在clone中含有没有实现Cloneable接口的对象，那么就会抛出一个异常。将上面的换成捕获异常
//这种写法比较适合final类
class Employee implements Cloneable
{
    public Employee clone()
    {
        try{
            return (Employee)super.clone();
        }catch(CloneNotSupportedException e){
            e.printStackTrace();
            return null;
        }
    }
}
//克隆不建议使用，尽可能不使用
```
数组内的是深拷贝，所以修改其中一个，并不会对另一个造成影响，使用了Java序列化的功能，这种机制很安全，但是效率较低。
## 五、 接口和回调
```Java{2}
//Timer构造器,每隔1秒钟执行一次listener
class TimePrinter implements ActionListener
{
    public void actionPerformed(ActionEvent event)
    {
        Date now=new Date();
        System.out.println("现在时间是:"+now);
        Toolkit.getDefaultToolkit().beep();
    }
}
ActionListener listener=new TimePrinter();
Timer t=new Timer(1000,listener);
t.start();
```
## 六、 内部类
只有内部类是私有类，而常规类只可以具有包可见性，或者公有可见性
```Java{2}
//对上面的打印函数进行封装
class TalkingClock
{
    //时间变量
    private int times;
    private boolean beep;
    public TalkingClock(int times,boolean beep){
        this.times=times;
        this.beep=beep;
    }
    public void start(){
        ActionListener listener=new TimePrinter();
        Timer t=new Timer(times,listener);
        t.start();
        //添加一个退出窗口,必须加上这个，不然无法打印时间
        JOptionPane.showMessageDialog(null,"Quit Program?");
        System.exit(0);
    }
    public class TimePrinter implements ActionListener
    {
        public void actionPerformed(ActionEvent event){
            Date now=new Date();
            System.out.println("现在的时间为:"+now);
            if(beep){
                Toolkit.getDefaultToolkit().beep();
            }
        }    
    }
}
public class test{
    public static void main(String[] args){
        TalkingClock talk=new TalkingClock(10000,true);
        takl.start();
    }
}
```
内部类的特殊使用语句 
```Java{2}
 // 创建一个新的TimePrinter 对象
 TalkingClock JK=new TalkingClock(1000,true);
 TalkingClock.TimerPrinter listener=JK.new TimePrinter();
 //在外围类的作用域外时，可以这样引用内部类
 OuterClass.InnerClass
```
对于上面的内部类只被 start方法使用过一次，这个时候为了提高代码的封装性，可以将内部类修改为局部内部类，将TimePrinter类放在start方法内部，这个时候除了start方法，其余任何方法都不知道该类的存在。

*局部类还有一个优点，它不仅能够访问外部类，还能够访问局部变量，不过那些局部变量必须被声明为final*

*匿名内部类*

因为匿名内部类没有名字，所以不能有构造方法，取而代之的是将构造器参数传递给父类的构造器，在内部类实现接口的时候不能有任何构造参数。

*静态内部类*

有时候为了把一个类隐藏在另一个类内部，并不需要内部类引用外围类对象。因此可以将内部类声明为static，以便取消产生的引用。
