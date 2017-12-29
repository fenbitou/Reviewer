<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人论文</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mypaper_init' }">未提交评审的论文</el-breadcrumb-item>
      <el-breadcrumb-item>文章标题</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="editor">
      <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" style="height:680px"></quill-editor>
    </el-card>
    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import { quillEditor } from "vue-quill-editor";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: "EditPaper",
  data() {
    return {
      content: "<h3>这是测试表格数据</h3>",
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
        console.log(111321);
        this.$message({ type: "success", message: "成功保存!" });
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
    }
  }
};
</script>

<style>
.editor {
  height: 760px;
  width: 100%;
  margin-top:10px;
}

.editor-btn {
  display: block;
  width: 200px;
  margin-top:20px;
}
</style>
