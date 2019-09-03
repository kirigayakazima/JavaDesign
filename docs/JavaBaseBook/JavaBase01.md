# 一、基本数据类型8种
## （1）4种整型

```Java{2}
int             //4个字节
short           //2个字节
long            //8个字节
byte            //1个字节
```
## （2）2种浮点类型
```Java{2}
float           //4个字节
double          //8个字节
```
## （3）char类型
```Java{2}
char            //单个字符
```
# 二、运算符
## 移位运算符
```Java{2}
>>              //将二进制位向右移
<<              //将二进制位向左移
```
# 三、 字符串String类
## （1）String类对象不可变字符串
## （2）字符串比较大小只能用equals，不能用==

```Java{2}
String A=new String("清羽玄儿");
String B=new String("QYXE");
A.equals("清舞玄儿");
B.equalsIgnoreCase("qyxe");         //不分大小写
```
## （3）字符串的检验
```Java{2}
if(A!=null&&A.equals("")){}         //必须先判断null，不然在字符串为null上调用方法会出错
```
## (4) 字符串的查找
```Java{2}
B.charAt(int index);                    //查找索引为index的，尽量不要使用char型，太低级，想要遍历代码点应该采用下面的方式

int cp=sentence.codePointAt(i);
if(Caracter.isSupplementaryCodePoint(cp)) i+=2;
else i++;


i--;                                //可以实现回退
if(Character.isSurrogate(sentence.charAt(i))) i--;
int cp=sentence.codePointAt(i);                 
```
## (5) StringBuilder和StringBuffer
这个类的前身是StringBuffer,前者效率高，如果字符都在单线程里面，建议使用这个；后者效率低，但是支持在多线程添加和删除字符。
```Java{2}
StringBuilder str=new StringBuilder();          //空字符串构造器
str.append("清羽玄儿");                         //添加字符串
```
# 四、io流
## (1) 输入
```Java{2}
Scanner sc=new Scanner(System.in);          
//输入可能包含空格
System.out.println(sc.nextLine());
//输入不包含空格
System.out.println(sc.nextLine());
//输入是整型
System.out.println(sc.nextInt());
//输入是浮点型
System.out.println(sc.nextFloat());
//输入是浮点型
System.out.println(sc.nextDouble());
//scanner的内容都会显示，所以不适合用于捕捉密码，用consloe进行密码的读取
Consloe cs=new Consloe();
String username=cs.readLine("username:");
char[] password=cs.readPassword("password:");
```
## (2) 打印输出，格式化输出
```Java{2}
int age=20;
String name="清羽玄儿";
String mes=String.format("hello,%s今年%d岁"+name，age);
```
## (3) 文件的输入输出
```Java{2}
Scanner sc=new Scanner(new File("test.txt"));          //创造新的文件，并且创造一个新的Scanner对象
Scanner ss=new Scanner(Paths.get("test.txt"));         //获取该地址，
```
# 五、控制语句
## （1）循环体中的标签break用法
```Java{2}
int i=0;                                               //跳转到mark位置，带标签的也可以跳出语句块，但是不能跳入语句块
mark:
while(){
    for(){
        break mark;
    }
}
```
# 六、大数值
## （1）BigInteger
能够实现任意精度的整型运算
```Java{2}
BigInteger a=BigInteger.valueof(100)；              //将整型转化成大整数
BigInteger c=a.add(b)；                             //进行加法计算      
BigInteger d=c.multiply(a);                         //进行乘法运算
BigInteger e=d.substrat(c);                         //进行减法计算
BigInteger f=e.dividi(d);                           //进行除法计算
BigInteger g=f.mod(e);                              //返回f和e的加减乘除和余数
int a=b.CompareTo(a);                               //比较a和b，相同返回0;b<a,返回负数;b>a,返回正数
static BigInteger vauleOf(long num);                //返回值等于num的大整数
```
## （2）BigDecimal
能够实现任意精度的浮点型运算
```Java{2}
BigDecimal a=BigDecimal.valueof(100)；              //将整型转化成大实数
BigDecimal c=a.add(b)；                             //进行加法计算      
BigDecimal d=c.multiply(a);                         //进行乘法运算
BigDecimal e=d.substrat(c);                         //进行减法计算
BigDecimal f=e.dividi(d);                           //进行除法计算
BigDecimal g=f.mod(e);                              //返回f和e的加减乘除和余数
int a=b.CompareTo(a);                               //比较a和b，相同返回0;b<a,返回负数;b>a,返回正数
static BigDecimal vauleOf(long num);                //返回值等于num的大实数
static BigDecimal vauleOf(long num，int scale);
 //返回值等于num或者num/(10的scale次方)的大实数
```
# 七、数组
## (1)可以使用for each循环
```Java{2}
String[] nums={"1","2","3","4","5","6"};
for(num:nums){
    System.out.println(num.toString());
}
```
## （2）数组的拷贝
```Java{2}
int[] num=nums;                                            //指向同一数组
num[5]=10;                                                 //现在nums[5]也为10
int[] array1=Arrays.copyOf(num,num.length);                //全拷贝,可以传三个参数，num,start,end
int
```
## (3) 命令行参数
main()里面有个String类数组，说明main接收了一个字符串数组，可以检测接收的该数组里面的元素是不是和文件名相关。
## （4）其他方法
```Java{2}
Array.sort();                                       //排序
Array.binarySearch(num，1);                         //查找num数组中的元素1并且返回索引，没有则返回负数
Array.binarySearch(num,start,end,1);                //在索引 start和end之间查找元素1并且返回索引，没有就返回负数
Array.fill(num,1);                                  //将num数组里面的元素值全部设置为1
Array.equals(num,nums);                             //如果两个数组的大小相同，并且下标相同的元素对应的元素值都相同那么返回true，否则返回false

```

