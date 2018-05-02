<template>
  <div>
    <!-- My paper status step -->
    <el-steps :active="2" simple class="paper_steps" >
      <el-step title="未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>
   
    <!--committed paper content -->
    <el-row :gutter="18">
      <el-col :sm="12" :lg="8"  v-for="item in items" :key="item._id">
        <el-card class="box_card" shadow="hover">
          <!-- paper card header -->
          <div slot="header" class="clearfix">
            <span>{{item.paper_title}}</span><br/>
            <div class="time">评审时间：{{ item.update_date | formatDate }}</div>
            <el-button class="btn-card" type="text" @click="editPaper(item)">修改论文</el-button>
            <el-button class="btn-card" type="text" @click="showComments(item)">查看评审意见</el-button>
          </div>
          <!-- teacher comments content -->
          <div class="paper_card_body">
            老师的评审内容
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
  name: "MyPaper2",
  data() {
    return {};
  },

  methods: {
    editPaper(item) {
      store.commit("saveTempValue", item);
      this.$router.push({ path: "/edit_commit" });
    },
    showComments(item) {
      store.commit("saveTempValue", item);
      this.$router.push({ path: "/paper_comment" });
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
    store.dispatch("FindStatusItem",  { id: "admin", status: "commit" });
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>