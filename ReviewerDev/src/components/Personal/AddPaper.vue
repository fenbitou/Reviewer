<template>

  <el-card style="width: 50%">
    <el-form ref="form" :model="addform" label-width="80px">
      <el-form-item label="论文标题">
        <el-input v-model="addform.title"></el-input>
      </el-form-item>
      <el-form-item label="论文作者">
        <el-input v-model="addform.author"></el-input>
      </el-form-item>
      <el-form-item label="论文链接">
        <el-input v-model="addform.link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button type="default" @click="gotoPublic">查看论文</el-button>
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
        link: ""
      }
    };
  },

  methods: {
    gotoPublic() {
      this.$router.push({ path: "/public" });
    },
    onSubmit() {
      if(store.dispatch("AddPaperItem", 
        { paper_title: this.addform.title, 
          paper_author:this.addform.author,
          paper_link:this.addform.link })
        )

      this.$message.success({message:'添加论文成功!'})
      this.form = "";
    }
  }
};
</script>


