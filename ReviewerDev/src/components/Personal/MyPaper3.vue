<template>
  <div>
    <el-steps :active="3" simple class="paper-steps" >
      <el-step title="尚未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>

    <el-row :gutter="18">
      <el-col :sm="12" :lg="8"  v-for="item in items" :key="item._id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.paper_title}}</span><br/>
            <div class="time">{{ currentDate | formatDate }}</div>
            <el-button class="card-button" type="text" @click="showPaper(item.paper_link)">查看论文</el-button>
          </div>
          <div class="change-log">
            老师的定稿意见
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
    return {
      currentDate: new Date()
    };
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
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>