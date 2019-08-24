# 面向对象
## 一、优点
*灵活，多变，可拓展，可复用，方便维护。利用封装、继承、多态降低耦合。可以使用装饰器，不断添加新的东西，完成新的需求。*

### 简单的低耦合代码

```
package com.sxt.cn;
import java.util.Scanner;

/*
 * 
 * 
 *测试计算机的编写 
 * 
 */
public class theOne {
	//业务逻辑和界面逻辑的分离
	//计算逻辑
static double operation(double num1,String operator,double num2) {
		double result=0;
		try {
			switch(operator) {
			case "+": 
				result=num1+num2;
				break;
			case "-":
				result=num1-num2;
				break;
			case "*":
				result=num1*num2;
				break;
			case "/":
				try {
					result=num1/num2;
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("被除数为0");
				}
				break;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
/*注意这里使用Scanner,创建一个Scanner对象，捕捉键盘输入，
 * 这个隐藏问题nextLine方法会捕捉上一行的字符串，如果这句话
 * 不放在第一行程序就无法正确执行，operator会没有值*/
	 public static void main(String[] args) {
		 /*
		 System.out.println("开始演算：");
		 Scanner sc=new Scanner(System.in);
		 System.out.println("请输入运算符：");
		 String operator=sc.nextLine();
		 System.out.println("请输入第一个数num1：");
		 double num1=sc.nextDouble();
		 System.out.println("请输入第二个数num2：");
		 double num2=sc.nextDouble();
		 System.out.println(operation(num1,operator,num2));
		 sc.close();   //注意关闭流，不然有危险
		 */
		 //对其加以改进，实现可控的计算机，能够 多次计算
		  Boolean flag=true;
		  int i=0;
		  while(flag) {
			  System.out.println("开始演算：");
				 Scanner sc=new Scanner(System.in);
				 System.out.println("请输入运算符：");
				 String operator=sc.nextLine();
				 if(operator!="Q"||operator!="q")
				 {
				 System.out.println("请输入第一个数num1：");
				 double num1=sc.nextDouble();
				 System.out.println("请输入第二个数num2：");
				 double num2=sc.nextDouble();
				 i+=1;
				 System.out.println("运算结果是："+operation(num1,operator,num2)+"已经运算了"+i+"次");
				 }else {
					System.out.println("已经成功推出计算器，总共计算了"+i+"次");
					flag=false;
					sc.close();
				}
			
		  }
	 }
}

```
*已经慢慢从面向过程的编程转向面向对象的编程，接下来要做的是逐渐转向多态，继承，封装，更进一步的降低耦合度。*
### 工厂模式
工厂模式简单的来说就是子类继承父类的属性和方法，然后可以在这个基础上进行无限的创造子类的一种模式。
