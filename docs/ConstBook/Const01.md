# 算法与数据结构
## 一、推导大O阶方法
推导大O阶：
1.用常数1取代运行时间中的所有加法常数
2.在修改后运行次数函数中，只保留最高阶项
3.如果最高阶项存在且不是1，则去除与这个项相乘的常数
### (1) 常数阶
时间复杂度为O(1)
 ```Java{2}
 int sum=0,n=100;
 sum=(1+n)*n/2;
 printf("%d",sum);
 ```
 ### (2) 线性阶
 时间复杂度为O(n),因为循环体要执行n次
 ```Java{2}
 int i;
 for(i=0;i<n;i++)
 {
     //时间复杂度为O(1)
 }
 ```
 ### (3) 对数阶
 时间复杂度为O(logn)
 ```Java{2}
 int count=1;
 while(count<n){
     count=count*2;
     //时间复杂度为O(1)
 }
 ```
 ### (4) 平方阶
 时间复杂度为O(n<sup>2</sup>)
 ```Java{2}
 int i,j;
 for(i=0;i<n;i++){
     for(j=0;i<n;j++){
         //时间复杂度为O(1)
     }
 }
 //如果修改为m则时间复杂度为O(m*n)
 ```
 
 ### (5) 常见的时间复杂度
执行次数函数 | 阶|非正式术语
---|---|---
12 | O(1)|常数阶
2n+3| O(n)|线性阶
3n<sup>2</sup>+2n+1| O(n<sup>2</sup>)|平方阶
5log<sub>2</sub>n+20| O(log*n*)|对数阶
2n+3nlog<sub>2</sub>n+19| O(*n*log*n*)|nlogn阶
6n<sup>3</sup>+2n<sup>2</sup>+3n+4| O(n<sup>3</sup>)|立方阶
2<sup>n</sup>| O(2<sup>n</sup>)|指数阶

时间复杂度从小到大:<br>
O(1)<O(log*n*)<O(*n*)<O(*n*log*n*)<O(*n*<sup>2</sup>)<O(*n*<sup>3</sup>)<O(2<sup>n</sup>)<O(*n*!)<O(*n*<sup>*n*</sup>)
## 二、线性表
### (1)常见线性表
线性表(List):零个或者多个数据元素的有限序列<br>
<br>线性表的长度应该小于等于数组长度，这样可以减少性能的损耗<br><br>往线性表中插入数据的时候，插入位置后面的所有的数据都要往后挪动一位，同时要保证插入后的线性表长度要小于数组长度，插入的位置也要合理，不然会报错<br><br>在删除数据的时候，删除位置后面的所有数据都要向前挪动一位，如果删除位置不合理，则报错

优点 | 缺点
---|---
无须为表示表中元素之间的逻辑关系而增加额外的储存空间 | 插入和删除操作需要移动大量元素
可以快速地存取表中任一位置的元素| 当线性表长度变化比较大时，难以确定储存空间的容量
便于查找|造成储存空间的碎片
### (2)线性表的链式储存结构
有很多个结点，每个结点都有一个指针头，左后一个结点的指针为空，通常设置为null或者^表示，第一个结点称作为头结点

头指针 | 头结点
---|---
头指针是指链表指向第一个结点的指针，若链表有头结点，则指向头结点的指针 | 头结点是为了操作的统一和方便而设立的，放在第一元素的结点之前，其数据域一般无意义(也可以存放链表的长度)
头指针具有标识作用，所以常用头指针冠以链表的名字 | 有了头结点，在对第一元素结点前插入结点和删除第一结点，其操作与其他结点的操作就统一了
无论链表是否为空，头指针均不为空，头指针是链表的必要元素|头结点不一定是链表必须要素

### (3)单链表的插入和删除
 需要先把需要插入的数据的头指向原来的后一位，然后再将原来的前一位指向插入的数据的内容，否则操作相反会导致后一位没有上级
 ```
 //正确的插入方式
 s->next=p->next;
 p->next=s;
 ```
 
