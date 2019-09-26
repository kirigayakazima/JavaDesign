# 算法与数据结构
## 一、推导大O阶方法
推导大O阶：
1.用常数1取代运行时间中的所有加法常数
2.在修改后运行次数函数中，只保留最高阶项
3.如果最高阶项存在且不是1，则去除与这个项相乘的常数
### (1) 常数阶
时间复杂度为O(1)
 ```
 int sum=0,n=100;
 sum=(1+n)*n/2;
 printf("%d",sum);
 ```
 ### (2) 线性阶
 时间复杂度为O(n),因为循环体要执行n次
 ```
 int i;
 for(i=0;i<n;i++)
 {
     //时间复杂度为O(1)
 }
 ```
 ### (3) 对数阶
 时间复杂度为O(logn)
 ```
 int count=1;
 while(count<n){
     count=count*2;
     //时间复杂度为O(1)
 }
 ```
 ### (4) 平方阶
 时间复杂度为O(n<sup>2)
 ```
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
