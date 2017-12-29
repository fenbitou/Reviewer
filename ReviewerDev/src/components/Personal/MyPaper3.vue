<template>
  <div>
    <el-steps :active="3" simple class="paper-steps" >
      <el-step title="已创建，尚未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审，尚未定稿" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>

    <el-card class="box-card" v-for="item in items" :key="item._id">
      <div slot="header" class="clearfix">
        <span>{{item.paper_title}}</span><br/>
        <div class="time">{{ currentDate | formatDate }}</div>
        <el-button class="card-button" type="text" @click="showPaper(item._id)">查看论文</el-button>
      </div>
      <div class="change-log">
        老师的定稿意见
      </div>
    </el-card>

  </div>

</template>

<script>
import store from "../vuex/store.js";
import { formatDate } from "../../js/date.js";

export default {
  name: "MyPaper3",
  data() {
    return {
      currentDate: new Date()
    };
  },

  methods: {},

  computed: {
    items: function() {
      return store.getters.paperItems;
    }
  },

  mounted() {
    store.dispatch("InitPaperItem").then(function(data) {
      console.log(data);
    });
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>