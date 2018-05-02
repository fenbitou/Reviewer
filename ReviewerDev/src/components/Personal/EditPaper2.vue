<template>
  <div>
    <!-- head navbar -->
    <div class="paper_navbar">
      <!-- paper progress breadcrumb -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的论文</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mypaper_commit' }">正在评审的论文</el-breadcrumb-item>
        <el-breadcrumb-item>{{item.paper_title}}</el-breadcrumb-item>
      </el-breadcrumb>
      
      <!-- show hostory button -->
      <el-dropdown v-if="isShowDropdown" @command="dropdownCommand" class="edit_dropdown" >
        <el-button type="primary" size="mini">
          历史版本评阅意见<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="historyPaper in listItems" :key="historyPaper._id" :command="historyPaper._id">{{historyPaper.update_time | formatDate_dropdown }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- show comment button -->
      <el-button v-show="!showComment" type="default" size="mini" class="edit_dropdown" @click="handleShowComment">
        显示教师评阅意见
      </el-button>
    </div>

    <div class="editor">
      <el-row :gutter="10">
      <!-- text-editor -->
        <el-col :lg="editorWidth" :sm="editorWidth">
          <quill-editor ref="myTextEditor" v-model="content" :options="editorOptions" style="height:720px;"></quill-editor>
        </el-col>

        <!-- comment -->
        <el-col :lg="commentWidth" :sm="commentWidth">
          <div v-show="showComment">
            <el-card class="paper_comment" shadow="never" style="margin-top:-1px">
              <!-- comment card header -->
              <div slot="header" class="paper_card_header">
                <div class="primary_time">
                  {{ item.create_date | formatDate_card }}
                </div>
                <el-button icon="el-icon-close" type="text" @click="closeComment" class="paper_card_close"></el-button>
              </div>
              <!-- comment content -->
              <el-collapse v-model="activeNames">
                <el-collapse-item title="1: 写的太好了写的太好了" name="1" class="paper_card_content">
                  <div>[评阅意见]: 写的太好了写的太好了</div>
                  <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
   
    <!-- handle buttons -->
    <div>
      <el-button @click="save_change" type="primary" plain class="btn_editor">保存修改</el-button>
      <el-button @click="submmit_comment" type="success" plain class="btn_editor">重新提交评审</el-button>
    </div>

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
      editorOptions: {
        placeholder: "请开始撰写你的论文，完成后请点击保存修改",
        modules: {
          toolbar: [
            "bold",
            "italic",
            "blockquote",
            { list: "ordered" },
            { list: "bullet" },
            "align",
            "code-block",
            { script: "sub" },
            { script: "super" },
            { header: [] },
            { size: ["small", "normal", "large"] }
          ]
        }
      },
      item: store.getters.temp,
      listItems: store.getters.temp.paper_content.slice(0, -1).reverse(),
      isShowDropdown:
        store.getters.temp.paper_content.length > 1 ? true : false,
      editorWidth: 18,
      commentWidth: 6,
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
      this.editorWidth = 24;
      this.showComment = false;
    },

    handleShowComment() {
      this.editorWidth = 18;
      this.showComment = true;
    },

    dropdownCommand(command) {
      // 查看历史的评阅意见
      console.log(command);
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
    formatDate_card(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },

    formatDate_dropdown(time) {
      let date = new Date(time);
      return formatDate(date, "MM-dd hh:mm");
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>

