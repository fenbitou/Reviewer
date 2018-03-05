<template>

  <el-card style="width: 100%">
    <el-form ref="form" :model="addform" label-width="100px">
      <el-form-item label="论文标题">
        <el-input v-model="addform.title"></el-input>
      </el-form-item>

      <el-form-item label="论文作者">
        <el-input v-model="addform.author1" style="display:inline-block; width:300px" placeholder="第一作者"></el-input>
        <el-input v-model="addform.author2" style="display:inline-block; width:300px" placeholder="第二作者"></el-input>
      </el-form-item>

      <el-form-item label="论文链接">
        <el-input v-model="addform.link"></el-input>
      </el-form-item>

      <el-form-item label="论文状态">
        <el-radio-group v-model="addform.status">
          <el-radio label="init">未提交评审</el-radio>
          <el-radio label="commit">正在评审</el-radio>
          <el-radio label="final">已定稿</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="论文权限">
        <el-radio-group v-model="addform.auth">
          <el-radio label="true">公开论文</el-radio>
          <el-radio label="false">私有论文</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="论文所有者">
        <el-input v-model="addform.owner"></el-input>
      </el-form-item>
      
      <el-form-item label="上传论文">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传PDF文件，且不超过16MB</div>
        </el-upload> 
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button type="default" @click="gotoPublic">查看公开论文</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
import store from "../vuex/store.js";

export default {
  name: "AddPaper",
  data() {
    return {
      addform: {
        title: "",
        author: "",
        link: "",
        status: "init",
        auth: "true",
        owner: "admin"
      }
    };
  },

  methods: {
    gotoPublic() {
      this.$router.push({ path: "/public" });
    },
    onSubmit() {
      let currentDate = new Date();
      if (
        store.dispatch("AddPaperItem", {
          paper_title: this.addform.title,
          paper_author: [this.addform.author1, this.addform.author2],
          paper_link: this.addform.link,
          paper_status: this.addform.status,
          paper_isPublic: this.addform.status === "true" ? true : false,
          paper_owner_id: this.addform.owner,
          create_Date: currentDate,
          update_Date: currentDate,
          update_paper_sum: 0,
          paper_content: []
        })
      )
        this.form = "";
      this.$message.success({ message: "添加论文成功!" });
    }
  }
};
</script>


