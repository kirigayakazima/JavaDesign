# Swing用户界面组件
应用的几种模式
```Java{2}
1.容器和组件是组合模式
2.带滚动条的面板的是装饰器模式
3.布局管理器是策略模式
```
MVC模式：模型-视图-控制器
## 一、布局
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
### (2)网格布局
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
## 二、文本输入
JTextField文本域和JTextArea文本区组件用于获取文本输入。文本域只能接收单行文本输入，而文本区能够接收多行文本的输入。JPassword也只能接收单行文本的输入，但不会将输入的内容显示出来。这三个类都继承与JTexComponent。
### (1) 文本域
```Java{2}
JPanel panel=new JPanel();
//传递字符串将它初始化，设置了文本域的宽度为20,可以在初始化的时候不赋值，只是设置宽度
JTextField textField=new JTextField("Default input",20);
panel.add(textField);

//如果需要在运行时重新设置列数，可以使用setColumns 但是使用了这个方法之后，需要调用包含这个文本框容器的revalidate方法
textField.setColumns(10);
//这个方法时JComponent 类中的方法，他并不是马上就改变组件大小，而是给这个组件添加一个需要改变大小的标记
panel.revalidate();

//获取用户从键盘输入的文本,并且去掉内容的前后空格
 String text=textField.getText().trim();
```
### (2) 文本区
```Java{2}
//8行40列,超过文本区的会被裁剪
JTextArea textArea =new JTextArea(8,40);
```
### (3) 滚动窗格
```Java{2}
//只在创个管理文本区的视图内进行滚动，当文本超出文本区的时候
JTextArea  textArea=new JTextArea(8,40);
JScrollPane scrollPane=new JScrollPane(textArea);
```
## 三、选择组件
### (1)  复选框
```Java{2}
JCheckBox bold=new JCheckBox("Bold");
//使用该方法来选定或者取消复选框
bold.setSelected(true);

//先添加一个监听器
JCheckBox bold=new JCheckBox("Bold");
JCheckBox italic=new JCheckBox("Italic");
ActionListener listener=new ActionListener();
//两个复选框共用了一个动作监听器
bold.addActionListener(listener);
italic.addActionListener(listener);
//actionPerformed方法查询bold和italic两个复选框的状态
public void actionPerformed(ActionEvent event){
    int mode=0;
    //isSelected方法判断复选框是否被选中
    if(bold.isSelected())mode+=Font.BOLD;
    if(italic.isSelected())mode+=Font.ITALIC;
    label.setFont(new Font("Serif",mode,FONTSIZE));
}

```
### (2) 单选框
```Java{2}
ButtonGroup group=new ButtonGroup();
//单选框，有两个选项，当前选择的是btn这个选项
JRadioButton button=new JRadioButton("button",false);
group.add(button);
JRadioButton btn=new JRadioButton("btn",true);
group.add(btn);
```
### (3) 边框
```Java{2}
Border etched=BorderFactory.creatEtchedBorder();
//先把标题添加到边框上
Border titled=BorderFactory.creatTitleBorder(etched,"标题");
//再把这个边框整体添加到面板上
panel.setBorder(titled);

//这个static Border方法调用的时候需要用BorderFactory.creatLineBorder()下面的方法类似;用工厂模式调用
//创建一个简单的直线边框
static Border creatLineBorder(Color color);
static Border creatLineBorder(Color color,int thickness);
//创建一个用color样色或者一个重复图标填充的粗的边框
static MatteBorder creatMatteBorder(int top,int left,int bottom);
static MatteBorder creatMatteBorder(int top,int left,int bottom,int right,Icon titleIcon);
```
### (4) 组合框(下拉菜单)
```Java{2}
//先创建一个下拉菜单，然后用addItem方法把字符串加进去，这个方法将字符串添加到列表的尾部，也可以利用insertItemAt方法在列表的任何位置插入一个新选项，可以使用removeItem方法删除某些选项，或者用removeItemAt删除指定位置的内容
JComboBox<String> faceCombo=new JCompoBox<>();
faceCombo.addItem("Serif");
faceCombo.addItem("SansSerif");

```
### (5) 滑动条
```Java{2}
//先创建一个滑动条对象
JSlider slider=new JSlider(min,max,initialValue);
//创建一个垂直滑动条
 JSlider slider=new JSlider(SwingConstants.VERTICAL,min,max,initialValue);
 
 //加一个监听器
 public void stateChanged(ChangeEven event){
     JSlider slider=(JSlider) event.getSource();
     int value=slider.getValue();
 }
 
 //给滑动条设置大小标记，并且让他们显示
 slider.setMajorTickSpacing(20);
 slider.setMinorTickSpacing(5);
 slider.setPaintTicks(true);
```

## 四、菜单
### (1) 创建菜单
```Java{2}
//首先创建一个菜单栏
JMenuBar menuBar =new JMenuBar();
//然后为每一个菜单建立一个菜单对象
JMenu editMenu =new Jmenu("Edit");
//然后将顶层菜单添加到菜单栏里面
menuBar.add(editMenu);
//然后依旧是把菜单栏添加到frame框架当中
frame.setMenuBar(menuBar);
```
### (2) 菜单项中的图标
```Java{2}
//用给定的标签和图标构造一个菜单项
JMenuItem(String label,Icon icon);
//设置文本对应的图标的水平位置
void setHoriziontalTextPosition(int pos)
//用给定的名字和图标构造一个抽象的动作
AbstractAction(String name,Icon smallIcon);
```
### (3) 复选框和单选按钮菜单项
```Java{2}
//用给定的标签构造一个复选框菜单项
JCheckBoxMenuItem(String label);
//用给定的标签和给定的初始状态构造一个复选框菜单\
JCheckBoxMenuItem(String label,boolean state);
//用给定的标签构造一个单选按钮菜单项
JRadioButtonMenuItem(String label);
//用给定的标签和给定的初始状态构造一个但炫按钮菜单项
JRadioButtonMenuItem(String label,boolean state);
//获取或者设置这个菜单项的选择状态
boolean isSelected();
boid setSelected(boolean state);
```
### (4) 弹出菜单
```Java{2}
//首先创造一弹出彩单
JPopupMenu popup =new JPopupMenu();

JMenuItem item=new JMenuItem("Cut");
item.addActionListener(listener);
popup.add(item);
//弹窗不需要放在frame框架上面才能显示,它自己有显示的show法
popup.show(panel,x,y);

//如果鼠标事件是弹出菜单触发器，则返回true
boolean isPopupTrigger(MouseEvent event);
//获取或者设置用于这个组件的弹出菜单
 JPopupMenu getComponentPopupMenu();
 void setComponentPopupMenu(JPopupMenu popup);

//用给定的标签和快捷键字符构造一个菜单项
JMenuItem(String label,int mneemonic)
//将K设置为这个菜单项的加速器，加速器显示在标签旁边
void setAccelerator(KeyStroke k)
//设置按钮的快捷字符，该字符会在标签中以下划线的形式显示
void setMnemonic(int mnemonic)
//将按钮文本的index字符设定为带下划线的，如果不希望第一个出现的快捷键字符带下划线就可以使用这个方法
void setDisplayedMnemonicIndex(int index)
```
### (5) 启用和禁用菜单项
```Java{2}
//启用或者禁用菜单项
void setEnabled(boolean b)
//在菜单被选择但尚未打开之前调用
void menuSelected(MenuEvent e)
//在菜单被取消选择并且已经关闭之后被调用
void menuDeselected(MenuEvent e)
//在菜单被取消时，被调用，例如，用户点击菜单以外的区域
void menuCanceled(MenuEvent e)
```
### (6) 工具栏
```Java{2}
//创建工具栏
JtoolBar bar =new JToolBar();
bar.add(blueButton);
//添加一个动作图标 
bar.add(blueAction);

//用给定的标题字符串和方向构造一个工具栏,Orientation可以是SwingConstants
JToolBar()
JToolBar(String titleString)
JToolBar(int orientation)
JToolBar(String titleString ,int orientation)
//用给定的动作名、图标、简要的说明和动作回调构造一个工具栏中的新按钮
JButton add(Action a)
//将一个分隔符添加到工具栏的尾部
void addSeparator()
//设置当鼠标停留在组件上时显示在工具提示中的文本
```
## 五、复杂的布局管理
### (1) 网格组布局
```Java{2}
//一个简单的GridBagConstrains对象
GridBagLayout layout=new GirdBagLayout();
panel.setLayout(layout);
GirdBagConstraints constraints=new GridBagConstraints();
constraints.weightx=100;
constraints.weighty=100;
constraints.gridx=0;                    //代表左上角x
constraints.gridy=2;                    //代表左上角y
constraints.gridwidth=2;
constraints.gridheight=1;
panel.add(component,constraints);
```
## 六、对话框
### (1) 选项对话框
```Java{2}
//简单的对话框
showMessageDialog                   //显示一条消息并等待用户点击ok
showConfirmDialog                   //显示一条消息并等待用户确认(与ok/Cancel类似)
showOptionDialog                    //显示一条消息并获得用户在一组选项中的选择
showInputDialog                     //显示一条消息并获得用户输入的一行文本
```

