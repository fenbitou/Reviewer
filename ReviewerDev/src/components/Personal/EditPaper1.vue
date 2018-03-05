<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的论文</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mypaper_init' }">未提交评审的论文</el-breadcrumb-item>
      <el-breadcrumb-item>{{item.paper_title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="editor">
      <quill-editor ref="myTextEditor" :content="content" :options="editorOption" @change="onEditorChange($event)" style="height:720px; margin-top:15px;"></quill-editor>
    </div>
    <el-button type="default" class="btn-editor" @click="save_change">保存修改</el-button>
    <el-button type="primary" class="btn-editor" @click="submmit_comment">提交评审</el-button>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import { quillEditor } from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "EditPaper1",
  data() {
    return {
      editorOption: {
        placeholder: "请开始撰写你的论文，完成后请点击保存修改"
      },
      item: store.getters.temp,
      content: ""
    };
  },

  components: {
    quillEditor
  },

  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    save_change() {
      this.$confirm("是否保存修改？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let currentDate = new Date();
          if (
            store.dispatch("UpdatePaperContent", {
              update_item_id: this.item._id,
              update_content: this.content,
              update_time: currentDate
            })
          )
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
    },

    submmit_comment() {
      this.$confirm(
        "请确认已经保存了文章内容且文章已经全部完成，点击确定后将提交给老师评审。",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if (
            store.dispatch("UpdatePaperStatus", {
              update_item_id: this.item._id,
              update_status: "init"
            })
          ) {
            this.$message({
              type: "success",
              message: "提交成功!请耐心等待老师评审"
            });
            this.$router.push({ path: "/mypaper_commit" });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
  },

  computed: {
    editor: function() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },

  mounted() {
    this.content =
      store.getters.temp.paper_content[
        this.item.update_paper_sum - 1
      ].current_content;
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>
