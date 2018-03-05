<template>
  <div>
    <el-steps :active="1" simple class="paper-steps" >
      <el-step title="未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>

    <el-row :gutter="18">
      <el-col :sm="12" :lg="8"  v-for="item in items" :key="item._id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.paper_title}}</span><br/>
            <div class="time">最后修改时间：{{ item.update_Date | formatDate }}</div>
            <el-button class="btn-card" type="text" @click="editPaper(item)">修改论文</el-button>
          </div>
          <div class="change-log" v-html="handle(item)"></div>
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
      store.commit("saveTempValue", item);
      this.$router.push({ path: "/edit_init" });
    },
    handle(item) {
      if (item.update_paper_sum == 0) {
        return "<div style=\"margin-top:-20px\"><h3>还未开始撰写论文</h3></div>";
      } else {
        let sum = item.update_paper_sum;
        return "<div style=\"margin-top:-20px\">"+item.paper_content[sum-1].current_content+"</div>";
      }
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
    store.dispatch("FindStatusItem", ["admin", "init"]);
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>