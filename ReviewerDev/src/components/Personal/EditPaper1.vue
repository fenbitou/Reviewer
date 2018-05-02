<template>
  <div>
    <!-- header nav bar -->
    <div class="paper_navbar">
      <!-- paper progress breadcrumb -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的论文</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mypaper_init' }">未提交评审的论文</el-breadcrumb-item>
        <el-breadcrumb-item>{{item.paper_title}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- show history button -->
      <el-dropdown v-if="isShowDropdown" @command="dropdownCommand" class="edit_dropdown">
        <el-button type="primary" size="mini">
          历史版本<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="historyPaper in listItems" :key="historyPaper._id" :command="historyPaper._id">  {{historyPaper.update_time | formatDate_dropdown }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- editor div -->
    <div class="editor" >
      <el-row :gutter="10" style="height:710px;">
        
      <!-- text-editor -->
        <el-col :lg="editorWidth" :sm="editorWidth" style="height:100%">
          <quill-editor id="editor" ref="myTextEditor" :content="hanleContent(item)" :options="editorOption" @change="onEditorChange($event)" style="height:100%"></quill-editor>
        </el-col>

        <!-- history paper -->
        <el-col :lg="historyWidth" :sm="historyWidth" v-if="showHistory">
          <el-card shadow="never">
            <div slot="header" class="paper_card_header">
                <div class="primary_time">
                  {{ historyChangeTime | formatDate_card }}
                </div>
                <el-button icon="el-icon-close" type="text" @click="closeHistory" class="paper_card_close"></el-button>
              </div>
            <div id="history_content" class="paper_card_content" style="overflow:auto; height:670px;" v-html="historyContent"></div>
          </el-card> 
        </el-col>

      </el-row>
    </div>

    <!-- handle buttons -->
    <div>
      <el-button type="primary" class="btn_editor" plain @click="save_change">保存修改</el-button>
      <el-button type="success" class="btn_editor" plain @click="submmit_comment">提交评审</el-button>
    </div>
   
  </div>
</template>

<script>
import store from "../vuex/store.js";
import { quillEditor } from "vue-quill-editor";
import { formatDate } from "../../js/date.js";
import { scrollEditor } from "../../js/scroll.js";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "EditPaper1",
  data() {
    return {
      editorOption: {
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
      editorWidth: 24,
      historyWidth: 0,
      showHistory: false,
      historyChangeTime: "",
      historyContent: ""
    };
  },

  components: {
    quillEditor
  },

  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },

    hanleContent(item) {
      return item.update_paper_sum == 0
        ? ""
        : item.paper_content[item.update_paper_sum - 1].current_content;
    },

    dropdownCommand(id) {
      this.showHistory = true;
      this.editorWidth = 12;
      this.historyWidth = 12;
      let historyItems = this.listItems;
      let content = "";
      let time = "";
      historyItems.forEach(function(item) {
        if (item._id === id) {
          content = item.current_content;
          time = item.update_time;
        }
      });
      this.historyContent = content;
      this.historyChangeTime = time;

      // let src = document.getElementById("editor");
      // let dest = document.getElementById("history_content");
      // scrollEditor(src, dest);
    },

    closeHistory() {
      this.showHistory = false;
      this.editorWidth = 24;
      this.historyWidth = 0;
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
        "将文章提交老师评审，同时不再保留未提交阶段的历史记录",
        "提交论文",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let num = this.item.update_paper_sum - 1;
          let lasted_paper = this.item.paper_content[num];
          let current_time = new Date();
          if (
            store.dispatch("UpdatePaperStatus", {
              id: this.item._id,
              status: "init",
              paper: lasted_paper,
              time: current_time
            })
          ) {
            this.$message({
              type: "success",
              message: "提交成功!请耐心等待老师评审"
            });
            this.$router.push({ path: "/mypaper_commit" });
          }
        })
        .catch(e => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
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
  },

  computed: {
    editor: function() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>
