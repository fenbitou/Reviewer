<template>
  <div>
    <el-steps :active="2" simple class="paper-steps" >
      <el-step title="未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>
   
    <el-row :gutter="18">
      <el-col :sm="12" :lg="8"  v-for="item in items" :key="item._id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.paper_title}}</span><br/>
            <div class="time">{{ item.create_Date | formatDate }}</div>
            <el-button class="btn-card" type="text" @click="editPaper(item)">修改论文</el-button>
            <el-button class="btn-card" type="text" @click="showComments(item)">查看评审意见</el-button>
          </div>
          <div class="change-log">
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
    store.dispatch("FindStatusItem", ["admin", "commit"]);
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>