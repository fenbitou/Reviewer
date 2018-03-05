<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的论文</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mypaper_commit' }">正在评审的论文</el-breadcrumb-item>
      <el-breadcrumb-item>{{item.paper_title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="18">
      <el-col :lg="16">
        <el-card class="editor" style="height:760px;">
          <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" style="height:693px; margin: -20px;"></quill-editor>
        </el-card>
      </el-col>

      <el-col :lg="8">
        <div class="editor_comment" v-show="showComment">
          <el-card class="paper_comment">
            <div slot="header" style="height:20px; margin-top: -12px;">
              <div class="time2">
                {{ item.create_Date | formatDate }}
                <el-badge style="margin-left:8px;" :value="4" />
              </div>
              <el-button icon="el-icon-close" type="text" @click="closeComment" style="float:right; margin-right:8px; "></el-button>
            </div>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="1: 写的太好了写的太好了" name="1" style="margin-top: -20px;">
                <div>[评阅意见]: 写的太好了写的太好了</div>
                <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
              </el-collapse-item>
              <el-collapse-item title="2: 写的太好了写的太好了" name="2">
                <div>[评阅意见]: 写的太好了写的太好了</div>
                <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
              </el-collapse-item>
              <el-collapse-item title="3: 写的太好了写的太好了" name="3">
                <div>[评阅意见]: 写的太好了写的太好了</div>
                <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
              </el-collapse-item>
              <el-collapse-item title="4: 写的太好了写的太好了" name="4">
                <div>老师评阅意见: 写的太好了写的太好了</div>
                <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-button @click="save_change" class="btn-editor">保存修改</el-button>
    <el-button @click="submmit_comment" type="primary" class="btn-editor">重新提交评审</el-button>

  </div>
</template>

<script>
import store from "../vuex/store.js";
import { quillEditor } from "vue-quill-editor";
import { formatDate } from "../../js/date.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "EditPaper2",
  data() {
    return {
      item: store.getters.temp,
      content: "",
      editorOption: {},
      activeNames: ["1"],
      showComment: true
    };
  },

  components: {
    quillEditor
  },

  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },

    closeComment() {
      console.log("close");
      this.showComment = false;
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
        "请确认已经按照评阅意见修改了文章，再次提交评审？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!请耐心等待老师评审"
          });
          this.$router.push({ path: "/mypaper_commit" });
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
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>

