# 说明文档

> 本项目是用koa2.js搭建的博客后台项目。

### 项目架构
- configs：存放配置文件
- src：资源文件夹
  - controllers：处理相应和请求
  - services：处理具体服务，与数据库做沟通
  - routers：路由配置
  - entities：实体
  - utils：工具包
- index.js：入口文件

### 设计思路
1. controllers和sevices层使用单例（懒汉）模式，无需主动实例化对象，直接调用其中的方法即可；（使用类分隔方法，使模块更加分明，隔离代码空间，方便后续管理、扩展；单例模式使得调用方便)
2. routers层注册路由、分发方法，在index中自动注册，避免每次增加新路由时手动注册。

### 接口列表

- /user
  - /baseInfo : GET 获取基本信息
  - /view: POST 记录网站UV （未完成）
- /article
  - / : POST 新增/修改文章 
  - / : GET 获取某一篇文章 
  - /all : GET 获取文章列表 
  - /view : POST 增加某一篇文章的浏览量
  - /like : POST 给某一篇文章点赞
  - /dislike : POST 给某一篇文章取消赞