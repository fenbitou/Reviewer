# Reviewer

### 工程实践项目目标
实现一款文档评阅管理系统，主要功能有 文档评阅，评阅信息版本控制，用户管理，内容比对 以及 状态管理等。

### 进度安排
1. ~~互相联系组员认识，并于2017.09.28的10:00，至思贤楼501-6与指导老师沟通选题~~。
2. 在国庆节期间请每个组自行安排，完成第一个原型设计，使用Axure或其他原型设计工具，在10.9-14号的9：00-14：30时间段，按组至思贤楼501-6与指导老师沟通选题。
3. J2EE方向的同学，在国庆期间使用SpringMVC+MyBatis或Hibernate完成**登录功能**开发。
4. 前端开发同学，在国庆期间使用Vue+JSON+AJAX等框架完成**注册和登录**前端开发，并**与后台集成**。


### Attention
1. 注册Github账号，将用户名发给我，把你们添加到项目中。 熟悉[Git团队合作的基本操作](http://blog.csdn.net/gpwner/article/details/53140016)以及[Git基本操作](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)。**在本仓库的test文件夹下提交任何文件（比如README.md）测试提交流程。**
2. 使用原型设计工具[墨刀](http://www.modao.cc/)进行原型设计，主要是*Axure*收费且操作复杂。
3. 如果后端数据库使用Mongodb，需要先安装[Node.js](http://nodejs.cn/download/)和[Mongodb](https://www.mongodb.com/download-center#community)。
4. 后端技术栈：通过约定的Restful数据接口，在`express`中操作`mongogoose`调用数据。

### 关于作业
1. 十一作业，参照[这篇文章](https://segmentfault.com/a/1190000009329619)利用XAMPP的MySQL完成最基础的功能。
2. 主要是**原型设计!**，一起用[墨刀](http://www.modao.cc/)画一画~~

-----
### 我们的一小步也是世界的一小步
1. 设计数据库。
> 1. 用户数据库    
    用户ID（主键）、用户名 、PDF-ID（外键）
> 2. PDF库   
    PDF-ID 、PDF标题 、作者信息 、PDF内容

2. 设计接口 

3. 实现目标  
    在文档浏览页面，能够**调用第三方库以HTML**展示文字内容。在该页面上显示PDF标题，作者信息等相关内容。