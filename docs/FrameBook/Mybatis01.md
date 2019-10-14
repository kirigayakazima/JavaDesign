# Mybatis
规范：<br>
持久层：dao  persist   mapper
<br>
实体层：entity  model  bean  javabean  pojo
<br>
业务逻辑：service  biz
<br>
控制器：controller  servlet  action  web
<br>
过滤器：filter
<br>
监听器：listener
<br>
异常：exception
## 环境搭建
### 一、导入jar

包名 | 作用
---|---
asm | Cglib依赖的包
cglib | 动态代理包
commons-logging|日志包
javassist|字节码解析包也是cglib的依赖包
log4j|日志包
log4j-api|日志包
log4j-core|日志包
mybatis|Mybatis核心包
slf4j-api|日志包
slf4j-log4j12|日志包
