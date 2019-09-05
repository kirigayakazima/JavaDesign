# 图形程序设计
## 一、介绍
顶层窗口被称为框架frame。这个类的Swing版本名为JFrame，它用于扩展Frame类。JFrame是极少数几个不绘制在画布上的Swing组件之一，因此，他的修饰部件由用户的窗口系统绘制，而不是由Swing绘制。
```Java{2}
//一个完整的窗口代码
package com.sxt.cn;

import java.awt.EventQueue;
import javax.swing.JFrame;

public class test01 {
	public static void main(String[] args) {
	//创建一个窗口本质是事件分派线程
	//这个事件方法让窗口可见，简单的理解为启动一个Swing程序的神器代码
		EventQueue.invokeLater(new Runnable() {
			@Override
			public void run() {
				SimpleFrame frame=new SimpleFrame();
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
## 二、 框架定位
```Java{2}
setLocation和setBounds方法用于设置框架的位置
setIconImage用于告诉窗口系统在标题栏、任务切换栏等位置显示那个图标
setTitle用于改变标题栏的文字
setResizable利用一个Boolean值确定框架的大小是否允许用户改变
```
