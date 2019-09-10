# 泛型
## 一、设计泛型
```Java{2}
//代码具有更好的可读性，一看就知道这个数组列表里面包含的是String对象
ArrayList<String> files=new ArrayList<>();
```
###  (1)定义简单的泛型类
```Java{2}
//简单地说泛型类可以看做普通类的工厂
public class Pair<T>
{
    private T first;
    private T second;
    
    public Pair(){
        first=null;
        second=null;
    }
    public Pair(T first,T second){
        this.first=first;
        this.second=second;
    }
    public T getFrist(){
        return first;
    }
    public T getSecond(){
        return second;
    }
    public T setFirst(T first){
        this.first=first;
    }
    public T setSecond(T second){
        this.second=second;
    }
}
```
### (2) 泛型方法
```Java{2}
//泛型方法可以定义在普通类当中也可以定义在泛型类中
class ArratAlg
{
    public static <T> T getMiddle(){
    
    }
}

```
## 二、类型变量的限定
```Java{2}
//定义一个普通类的泛型方法，查找一个数组里面最小的值
class ArrayAlg
{
    public static <T> T min(T[] a){
        if(a!=null||a.length!=0)return null;
        T smallest=a[0];
        for(int i=0;i<a.length;i++){
            if(smallest.compareTo(a[i]>0)smallest=a[i];
            return smallest;
        }
    }
}
```
