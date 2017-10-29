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
1. [**hypothes.is API文档**](https://h.readthedocs.io/en/latest/api/#)是符合RESTful接口规范的文档，后端组成员需要自行了解RESTful的相关知识。本项目中的RESTful文件夹是慕课网上相关课程的源代码，有兴趣的可以自己去看。难度比较大。

2. 后端组成员需要约定统一的开发平台和Java版本。

3. hypothes.is API的运行DEMO的用户登陆注册功能是来自于hypothes自己的服务，在我们的评阅系统中不能使用第三方的服务，因此要将用户登陆注册模块集成在系统中。但由于Reviewer不关注用户模块，因此短期的开发我们不关注用户数据库，测试依旧利用DEMO中提供的第三方的服务。

4. 本仓库的默认分支已经切换至`dev`分支下，向远端仓库推送内容时需要关注自己所处的分支，**切记不要向`master`分支推送**。在提交文件夹的时候**切勿覆盖别人已提交的内容，务必先 `git pull` ，再push。**。  

----
### 短期任务
**预计完成时间，3周**
1. 将[PDF.js + Hypothes - GITHUB](https://github.com/hypothesis/pdf.js-hypothes.is)仓库clone到本地后，在localhost运行起来，观察到该DEMO调用的js文件与调用api接口来自于下图所示，这会严重影响网站访问速度。
![Alt text](https://github.com/fenbitou/Reviewer/raw/dev/picture/s1.jpg)
![Alt text](https://github.com/fenbitou/Reviewer/raw/dev/picture/s2.jpg)

    将相应的js文件或api接口下载下来集成到本地，并替换DEMO相应的调用位置。  


2. 利用MySQL创建基础的用户以及PDF表。具体内容见
>   PDF库   
    PDF-ID（主键） 、PDF标题 、USER-ID 、 PDFauthority、PDF内容     

    需要自行下载几篇英文论文PDF存入到数据库中，本分支下有一个`test.pdf`可以用来测试。   

3. 在dev分支下有`dev`文件夹，这是显示用户PDF列表的简单DEMO。下面是表格的数据接口：
    ```
    {
        number: 1,
        pdfTitle: "Quantum teleportation of multiple degrees of freedom in a single photon",
        pdfAuthority: "私有",
        pdfURL: "---------跳转URL----------"
    },
    ```
    从数据库中取出相应的数据并显示在表格中，`number`字段无需传入。现在暂时不要求完全遵守restful API接口规范（后期仍然要完成），只需要取出相应的值，并且**点击跳转URL后能够跳转至PDF标注界面**。    

4. dev分支下现在并没有[PDF.js + Hypothes - GITHUB](https://github.com/hypothesis/pdf.js-hypothes.is)的文件夹，请自行clone完成`要求1`后再提交至`dev`分支。

5. MySQL版本，数据库测试数据内容务必统一，该任务只需要完成一份，请自行协商分工。    

6. 测试用的DEMO表格的数据在 `/dev/src/components/ShowPDF.vue`中，可以clone在本地后再进行测试。