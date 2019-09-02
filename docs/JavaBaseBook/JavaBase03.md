# 继承
父类和子类是之间，子类的功能比父类多，父类有的属性和方法，子类都有。
## 一、 super方法
```Java{2}
super.f();                  /*直接调用父类的方法*/
super.value;                /*直接调用父类的成员属性*/
super();                    /*调用父类的构造属性，这句话永远是构造器里面的第一句话*/
```
## 二、 多态
对象变量是多态的
```Java{2}
Manager boss=new Manager();
Employee[] staff=new Employee[3];
staff[0]=boss;
/*可以用boss调用Manager内部方法,但是不能使用staff[0]调用方法。简单地说，子类的方法父类不一定有，但是父类的方法子类一定有*/
//可以使用父类接收创建一个子类
Employee bos=new Manager();//后面记得转化成对应的才能使用相应的方法和属性
//郑重转化是一种很忌讳发生的情形，不建议常用，用的时候记得转化回来
```
## 三、 动态绑定
当子类调用f()方法的时候，如果子类中没有该方法，那么就是上一级的父类当中去找，还没有就接着去更上一级的父类中去找。直到找到为止。找不到则报错。
## 四、 阻止继承:final类和方法
final类中的方法子类都不能覆盖，因为final类中的方法自动变为final方法。将一个类定义为final类之后，只有其中的方法自动变为final，而不包括域。
## 五、 抽象类
```Java{2}
public abstract String getDerocation();     //抽象方法,只是占位，具体实现在子类中实现
abstract class Person{
  public abstract String getDerocation();
  //包含一个或者多个抽象方法的类也必须被定义为抽象类
}
/*注意子类继承抽象类的父类的时候，在实现构造方法的时候记得在第一句写上super方法。抽象方法更多的在接口当中出现*/
```
## 六、 修饰符
```Java{2}
private                 //仅对本类可见
public                  //对所有类可见
protected               //对本包和所有子类可见
默认                    //对本包可见
```
## 七、 Object类
Object类是所有类的父类 
## 八、 hashCode
散列码没有规律
## 九、 泛型数组列表
```Java{2}
ArrayList<Employee> staff=new ArrayList<Employee>();
ArrayList<Employee> staff=new ArrayList<>();                  //或者使用这种样式
staff.add(new Employee(...));                                 //给staff添加对象
staff.size();                                                 //返回数组的长度，有点类似a.length();
staff.set(i,"清羽玄儿");                                      //设置第i个元素，相当于 a[i]="清羽玄儿";
staff.get(i);                                                //使用get方法获取第i个元素，需要用对应的类创建一个对象变量接收这个获取的元素
staff.remove(i);                                             //移除第i个元素
```
## 十、 对象包装器和自动装箱
总共有9种，前六种派生于公共的父类Number
*对象包装器是不可变的，一旦构造了包装器，就不允许更改包装在其中的值，同时对象包装器类还是final，因此不能定义他们的子类*
```Java{2}
Integer
Long
Float
Double
Short
Byte
Character
Void
Boolean
```
如果要定义一个整形数组列表
```Java{2}
ArrayList<Integer> list=new ArrayList<>();//效率还高
list.add(3);
/*会被自动装箱*/
list.add(Iteger.valueOf(3));
int n=list.get(i);
/*会被自动拆箱*/
int n=list.get(i).intValue();
/*比较两个包装器对象的时候建议使用equals方法，而不是用==，避免出现意料之外的隐蔽错误*/
```
```Java{2}
//radix表示进制
int intValue();                         //返回int型
static String toString(int i);          //返回String型
static String toString(int i,int radix);
static int parseInt(String s);          //返回整型
static int parseInt(String s,int radix);
static Integer valueOf(String s);       //返回Integer对象
static Integer valueOf(String s,int radix);
Number parse(String s);                 //返回数字型
```
## 十一、 继承设计的技巧
1.将公共操作和域放在超类
2.不要使用受保护的域
3.使用继承实现"is-a"的关系
4.除非使所有的继承方法都有意义，否则不要使用继承
5.在覆盖方法时，不要改变预期行为
6.使用多态，而非类型信息
7.不要过多使用反射
