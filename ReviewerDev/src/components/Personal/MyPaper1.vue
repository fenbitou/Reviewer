<template>
  <div>
    <el-steps :active="1" simple class="paper-steps" >
      <el-step title="尚未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>

    <el-row :gutter="18">
      <el-col :sm="12" :lg="8"  v-for="item in items" :key="item._id">

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.paper_title}}</span><br/>
            <div class="time">{{ item.create_Date | formatDate }}</div>
            <el-button class="card-button" type="text" @click="editPaper(item)">修改论文</el-button>
          </div>
          <div class="change-log">
            最后一次修改的内容
          </div>
        </el-card>
      </el-col>

      <el-col :sm="12" :lg="8">
        <el-card class="box-card" @click="addPaper()">
          <div slot="header" class="clearfix icon-addPaper">
            <i class="el-icon-circle-plus-outline"></i>
          </div>
          <div>
            <p style="text-align:center; display:block;">创建一篇新论文</p>
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
  name: "MyPaper1",
  data() {
    return {};
  },

  methods: {
    editPaper(item) {
      store.commit("saveTempValue", item.paper_title);
      this.$router.push({ path: "/edit" });
    },

    addPaper() {
      this.$router.push({ path: "/AddPaper" });
    },

    getItemTime(time) {}
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
    store.dispatch("FindStatusItem", (["admin", "init"]));
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>