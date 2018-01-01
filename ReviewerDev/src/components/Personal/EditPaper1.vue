<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的论文</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mypaper_init' }">未提交评审的论文</el-breadcrumb-item>
      <el-breadcrumb-item>{{paperTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="editor">
      <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" style="height:680px"></quill-editor>
    </el-card>
    <el-button type="primary" class="btn-editor" @click="submit">保存修改</el-button>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import { quillEditor } from "vue-quill-editor";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: "EditPaper1",
  data() {
    return {
      content: "<h3>这是测试数据</h3>",
      editorOption: {}
    };
  },

  components: {
    quillEditor
  },

  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit(){
      this.$confirm("是否保存修改？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.$message({          
          type: "success", 
          message: "保存成功!"  
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消保存"
        });
      });
    }
  },

  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
    paperTitle() {
      return store.getters.temp.paper_title;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>
