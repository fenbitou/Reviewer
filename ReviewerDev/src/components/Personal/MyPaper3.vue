<template>
  <div>
    <!-- My paper status step -->
    <el-steps :active="3" simple class="paper_steps" >
      <el-step title="未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>

    <!-- Final paper cards -->
    <el-row :gutter="18">
      <el-col :sm="12" :lg="8"  v-for="item in items" :key="item._id">
        <el-card class="box_card" shadow="hover">
          <!-- paper card header -->
          <div slot="header" class="clearfix">
            <span>{{item.paper_title}}</span><br/>
            <div class="time">定稿时间：{{ item.update_date | formatDate }}</div>
            <el-button class="btn-card" type="text" @click="showPaper(item.paper_link)">查看论文</el-button>
          </div>
          <!-- paper commit comment -->
          <div class="paper_card_body">
            [{{item.paper_comment.comment_teacher_name}}] {{item.paper_comment.comment_content}}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import { formatDate } from "../../js/date.js";

export default {
  name: "MyPaper3",
  data() {
    return {};
  },

  methods: {
    showPaper(PDFUrl) {
      store.commit("saveTempValue", PDFUrl);
      this.$router.push({ path: "/showpdf" });
    }
  },

  computed: {
    items: function() {
      return store.getters.paperItems;
    }
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },

  mounted() {
    store.dispatch("FindStatusItem", { id: "admin", status: "final" });
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>