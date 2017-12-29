<template>
  <div>
    <el-steps :active="1" simple class="paper-steps" >
      <el-step title="已创建，尚未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审，尚未定稿" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>

    <el-card class="box-card"  v-for="item in items" :key="item._id" >
      <div slot="header" class="clearfix">
        <span>{{item.paper_title}}</span><br/>
        <div class="time">{{ currentDate | formatDate }}</div>
        <el-button class="card-button" type="text" @click="editPaper(item._id)">修改论文</el-button>
      </div>
      <div class="change-log">
        最后一次修改的内容
      </div>
    </el-card>
    
  </div>

</template>

<script>
import store from "../vuex/store.js";
import { formatDate } from "../../js/date.js";

export default {
  name: "MyPaper1",
  data() {
    return {
      currentDate: new Date()
    };
  },

  methods: {
    editPaper(index) {
      console.log(index);
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
    store.dispatch("InitPaperItem").then(function(data) {
      console.log(data);
    });
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>