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
组件类的很多方法都是以获取/设置方法对形式出现的
```Java{2}
public String getTitle()
public void setTitle(String title)
```
但是也有例外的方法，比如boolean类型的属性的获取方法由is开头
```Java{2}
public boolean isLoactionByPlatform()
public void setLocationByPlatform(boolean b)
```
为了得到屏幕的大小需要进行一下操作
```Java{2}
Toolkit kit=Toolkit.getDefaultToolkit();
Dimesion screenSize=kit.getScreenSize();
int screenWidth=screenSize.width;
int screenHeight=screen.height;
//设置窗口大小取上面的50%
setSize(screenWidth/2,screenHeight/2);
//告知窗口系统定位框架
setLocationByPlatform(true);
//加入一个图标
Image img=new ImageIcon("logo.png").getImage();
setIconImage(img);
```
## 三、处理2D图形
```Java{2}
//创建一个Rectangle2D.Float对象时，应该提供float
型数值的坐标，而闯进Rectangle2D.Double对象时。应该提供double型数值的坐标
Rectangle2D.Float floatRect=new Rectangle2D.Float(10.0F,25.0F,22.5F,20.0F);
Rectangle2D.Double doubleRect=new Rectangle2D.Double(10.0,25.0,22.5,20.0);
//实际上，Rectangle2D.Float和Rectangle2D..Double都扩展于Rectangle2D类，并且子类值覆盖了Rectangle2D父类中的方法，所以没有必要记住图形类型，可以直接使用Rectangle2D变量保存矩形的引用。同样的Point2D也适用
Rectangle2D floatRect=new Rectangle2D.Float(10.0F,25.0F,22.5F,20.0F);
Rectangle2d doubleRect=new Rectangle2D.Double(10.0,25.0,22.5,20.0);
```
画一个椭圆
```Java{2}
//完整代码
package com.sxt.cn;

import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Line2D;
import java.awt.geom.Rectangle2D;
import javax.swing.JComponent;
import javax.swing.JFrame;

public class test02 {
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				JFrame frame=new DrawFrame();
				frame.setTitle("画个椭圆");
				frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				frame.setVisible(true);
			}
		});
	}
	
}
class DrawFrame extends JFrame{
	public DrawFrame() {
		add(new DrawComponent());
		pack();
	}
}
class DrawComponent extends JComponent
{
	private static final int DEFAULT_WIDTH=400;
	private static final int DEFAULT_HEIGHT=400;
	
	public void paintComponent(Graphics g) {
		Graphics2D g2=(Graphics2D) g;
		double leftX=100;
		double leftY=100;
		double width=200;
		double height=150;
		Rectangle2D rectangle2d=new Rectangle2D.Double(leftX,leftY,width,height);
		g2.draw(rectangle2d);
		
		Ellipse2D ellipse2d=new Ellipse2D.Double();
		ellipse2d.setFrame(rectangle2d);
		g2.draw(ellipse2d);
		
		g2.draw(new Line2D.Double(leftX,leftY,width,height));
		
		double centerX=rectangle2d.getCenterX();
		double centerY=rectangle2d.getCenterY();
		double radius=300;
		
		Ellipse2D cricle=new Ellipse2D.Double();
		cricle.setFrameFromCenter(centerX,centerY,centerX+radius,centerY+radius);
		g2.draw(cricle);
	}
	public Dimension getPreferredSize() {
		return new Dimension(DEFAULT_WIDTH,DEFAULT_HEIGHT);
	}
}

//利用给定的左上角、宽、高构造一个矩形
Rectangle2D.Float(float x,float y,float w,float h)
//利用非定的左上角、宽和高的外接矩形，构造一个椭圆
Ellipser2D.Double(double x,double y,double w,double h)
//利用给定坐标构造一个点
Point2D.Double(double x,double y)
//利用给定的起点和终点，构造一条直线
Line2D.Double(Ponit2D,start,Point2D end)
Line2D.Double(double startx,double starty,double endx,double endy)
```
## 四、 使用颜色
使用Graphics2D类的setPaint方法可以为图形环境上的所有后续的绘制操作选择颜色
