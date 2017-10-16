# Reviewer

### 工程实践项目目标
实现一款文档评阅管理系统，主要功能有 文档评阅，评阅信息版本控制，用户管理，内容比对 以及 状态管理等。
1. 对于用户自有的PDF文献，用户有对该文献进行编辑的功能，且编辑功能需要提供**版本控制**。
2. 对于非用户自有的文献，用户只能 评论/批注 文献的段落句子。
3. 参考第三方库: [ITEXTPdf](https://developers.itextpdf.com/content/itext-7-examples/itext-7-manipulating-existing-pdf) , [PDF.js + Hypothes - GITHUB](https://github.com/hypothesis/pdf.js-hypothes.is) , [hypothes.is](https://web.hypothes.is/)


------

### 进度安排
从10月15日开始，正式进入工程实践周期，具体计划如下：
1. 开题。10月25日左右。完成项目需求分析，原型设计，**数据库设计**，技术方案设计，以及**技术可行性验证**。
2. 开发原型1。11月20日左右。完成项目原型基本功能开发，前后台集成测试。需要演示可运行软件。
3. 开发原型2。12月20日左右。完成项目核心功能开发，前后台集成测试。需要演示可运行软件。
4. 开发原型3（可选）。18年1月30日左右。完成原型开发的滞后进度，或原型整体功能开发，前后台集成测试，发布在线测试原型1。需要演示可运行软件。   
**需要放假后留校10天左右，不强制所有小组。**    
5. 中期。**18年3月5号左右。完成项目所有功能开发**，前后台集成测试。
6. 开发原型4。18年4月5日左右。完成项目功能修改与优化，发布在线测试原型2。需要演示可运行软件。
7. 结题。18年5月5日左右。完成代码测试，文档整理，在线发布最终项目。需要演示可运行软件。
8. 文档提交。18年6月1日左右。提交项目所有工程文档，源码，发布软件包，展示视频+单页等。
9. 工程实践结束。18年6月。

请所有小组按此计划安排组内分工及工作，特别是**开发原型3**，建议大家保持进度。每个时间节点均占工程实践评分一定比重。



     

-----
### Attention
1. [**hypothes.is API文档**](https://h.readthedocs.io/en/latest/api/#)是符合RESTful接口规范的文档，后端组成员需要自行了解RESTful的相关知识。完成本周任务。本项目中的RESTful文件夹是慕课网上相关课程的源代码，有兴趣的可以自己去看。难度比较大。
     


-----
### 我们的一小步
1. 设计数据库。
> 1. 用户数据库    
    USER-ID（主键）、用户名 、PDF-ID（外键）【数组】
> 2. PDF库   
    PDF-ID（主键） 、PDF标题 、USER-ID 、PDF内容

2. 实现目标  
    实现[**hypothes.is**](https://web.hypothes.is/)的可运行DEMO。

     

----
### 本周任务
1. 组员各自翻译`hypothesis.yaml` API文档的一部分。   
    吕畅 : 1-114行;   
    孙成恩 : 115-214行;   
    余盛 : 215-313行;  
    王红钰 : 314-414行


2. 只需要翻译`description`部分。
    > 1. 删除description的英文原文，以中文代替.以中文代替.
    > 2. 涉及专有名词的可以不翻译。
    > 3. 翻译过程中务必参照[在线API文档](https://h.readthedocs.io/en/latest/api/#)通读该文档。
    > 4. 简单的返回值如success无需翻译。    

 
example:
    ```
    basePath: /api
    schemes:
    - https
    consumes:
    - application/json
    produces:
    - application/json
    securityDefinitions:
    
    developerAPIKey:
    type: apiKey
    description: 利用一个开发者的API key授权.
    name: Authorization
    in: header
    
    authClientCredentials:
    type: basic
    description: 通过HTTP Basic Auth的OAuth用户证书来授权.
    ```

3. 参考文章[git学习笔记](http://www.cnblogs.com/wufangfang/p/6085767.html)以及[git多人合作](http://www.jianshu.com/p/819354c035a4),在本项目的dev分支下分出属于自己的功能分支，完成翻译后的文档后再合并到dev分支中。

4. 本周完成上述任务后，请诸位结合项目目标思考除了Hypothes.is已经给出的功能以外我们还需要实现什么功能。

5. 本周的任务旨在希望诸位能够去阅读API文档和进一步地了解git多人协作的操作，真正需要翻译的内容并不是很多，如果实在是语句晦涩难懂也可以标出不翻译。
