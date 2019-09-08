# Swing用户界面组件
应用的几种模式
```Java{2}
1.容器和组件是组合模式
2.带滚动条的面板的是装饰器模式
3.布局管理器是策略模式
```
MVC模式：模型-视图-控制器
##一、布局
布局采用流布局的方式
```Java{2}
void SetLayout(LayoutManager m);                //为容器设置布局管理器
Component add(Component c);
Component add(Componentc,Objectt constranints);//将组件添加到容器中，并返回组件的引用
FlowLayout();
FlowLayout(int align);
FlowLayout(int align,int hgap,int vgap);
/*
align           LEFT、CENTER、RIGHT
hgap            以像素为单位的水平间距（如果为负值，则强行重叠）
vgap            以像素为单位的垂直间距（如果为负值，则强行重叠）
*/
```
### (1) 边框布局(双飞翼布局)

b| 北|b
---|---|---
西 | 中 | 东
n| 南 |n
像这种双飞翼布局,先放置边缘组件，剩余空间由中间组件自适应，当容器被缩放时，边缘组件只存不会改变，而中间的组件大小会发生改变。
```Java{2}
// 添加三个按钮，黄蓝红，将这三个按钮放置在画布的南方
JPanel panel=new Jpanel();
panel.add(yellowButton);
panel.add(blueButton);
panel.add(redButto);
frame.add(panel,BorderLayoout.SOUTH);

//构造一个新的BorderLayout对象
BorderLayout();
BorderLayout(int hgap,int vgap);
```
### 网格布局
第一行| ||第四列
---|---|---|---
第二行|  | 
第三行|  |
第四行 |
```Java{2}
//在网格布局对象的构造器中，需要指定行数和列数
 panel.setLayout(new GridLayout(4,4));
 //添加组件，从第一行的第一列开始，然后是第一行的第二列
 panel.add(new JButton("1");
 panek.add(new JButton("2"));
```
一个简单的计算器
```Java{2}
//主文件
package com.sxt.cn;
import java.awt.EventQueue;
import javax.swing.JFrame;

import com.sxt.cn.CalculatorPanel;
public class testca {
	public static void main(String[] args) {
		CalculatorPanel calculatorPanel=new CalculatorPanel();
		EventQueue.invokeLater(new Runnable() {
			@Override
			public void run() {
				SimpleFrame frame=new SimpleFrame();
				frame.add(calculatorPanel);
			//定义一个用户关闭这个框架时的响应动作
			frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			//显示frame框架
				frame.setVisible(true);
			}
		});
	}
	//初始化语句结束后，main方法退出，需要注意的是，main并没有终止程序，终止的只是主线程。事件分派线程保持程序处于激活状态，直到关闭框架或调用System.exit方法终止程序
}
class SimpleFrame extends JFrame{
	private static final int DEFAULT_WIDTH=300;
	private static final int DEFAULT_HEIGHT=200;
	public SimpleFrame() {
		setSize(DEFAULT_WIDTH,DEFAULT_HEIGHT);
	}
}


```
```Java{2}
//副文件
package com.sxt.cn;

import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;

/*
 * 
 *  简易的计算器
 * 
 * */
// 一个计算器类
 public class CalculatorPanel extends JPanel{
	 private JButton display;
	 private JPanel panel;
	 private double result;
	 private String lastCommand;
	 private boolean start;
	 //初始化构造
	 public CalculatorPanel() {
		 setLayout(new BorderLayout());
		 result=0;
		 lastCommand="=";
		 start=true;
		 //添加display,构建计算器的网格
		 //先构造一个文本框显示当前为0，放置在北方
		 display=new JButton("0");
		 display.setEnabled(false);
		 add(display,BorderLayout.NORTH);
		 
		 ActionListener insert =new InsertAction();
		 ActionListener command =new CommandAction();
		 
		 //开始添加计算器上面的anniu
		 panel=new JPanel();
		 panel.setLayout(new GridLayout(4,4));
		 addButton("7",insert);
		 addButton("8",insert);
		 addButton("9",insert);
		 addButton("/",command);
		 
		 addButton("4",insert);
		 addButton("5",insert);
		 addButton("6",insert);
		 addButton("*",command);
		 
		 addButton("1",insert);
		 addButton("2",insert);
		 addButton("3",insert);
		 addButton("-",command);
		 
		 addButton("0",insert);
		 addButton(".",insert);
		 addButton("=",command);
		 addButton("+",command);
		 
		 //将计算器放置在中间
		 add(panel,BorderLayout.CENTER);
	 }
	 private void addButton(String label,ActionListener listener) {
		 JButton button=new JButton(label);
		 button.addActionListener(listener);
		 panel.add(button);
	 }
	 
	 private class InsertAction implements ActionListener{
		public void actionPerformed(ActionEvent event) {
			String input=event.getActionCommand();
			if (start) {
				display.setText("");
				start=false;
			}
			display.setText(display.getText()+input);
		}
	}
	 private class CommandAction implements ActionListener {
		 public void actionPerformed(ActionEvent event) {
			String command =event.getActionCommand();
			if (start) {	
				if (command.equals("-")) {
					display.setText(command);
					start=false;
				}else {
					lastCommand=command;
				}
			}else {
				calculate(Double.parseDouble(display.getText()));
				lastCommand=command;
				start=true;
			}
		}
	 }
	 public void calculate(double x) {
		 if (lastCommand.equals("+"))	result +=x;
		 else if (lastCommand.equals("*")) result *=x;
		 else if (lastCommand.equals("/")) result /=x;
		 else if (lastCommand.equals("=")) result =x;
		 else if (lastCommand.equals("-")) result -=x;
		 display.setText(""+result);
	 }
 }
```
