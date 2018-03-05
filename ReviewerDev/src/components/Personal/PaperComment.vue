<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的论文</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mypaper_commit' }">正在评审的论文</el-breadcrumb-item>
      <el-breadcrumb-item>{{item.paper_title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="paper_comment" v-for="testItem in testItems" :key="testItem.index">
      <div class="comment_time">
        <span class="time2">
          {{ item.create_Date | formatDate }}
          <el-badge style="margin-left:8px;" :value="4" />
        </span>
        <el-button class="btn-card" type="primary" size="medium" @click="editPaper(item)" style="float:right">修改论文</el-button>
      </div>
      <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="1: 写的太好了写的太好了" name="1">
            <div style="font-size: 15px;">[评阅意见]: 写的太好了写的太好了</div>
            <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
          </el-collapse-item>
          <el-collapse-item title="2: 写的太好了写的太好了" name="2">
            <div>[评阅意见]: 写的太好了写的太好了</div>
            <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
          </el-collapse-item>
          <el-collapse-item title="3: 写的太好了写的太好了" name="3">
            <div>[评阅意见]: 写的太好了写的太好了</div>
            <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
          </el-collapse-item>
          <el-collapse-item title="4: 写的太好了写的太好了" name="4">
            <div>[评阅意见]: 写的太好了写的太好了</div>
            <div class="paper_content">Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used.</div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
   
  </div>
</template>

<script>
import store from "../vuex/store.js";
import { formatDate } from "../../js/date.js";

export default {
  name: "PaperComment",
  data() {
    return {
      activeNames: ["1", "2", "3", "4"],
      testItems: [1, 2, 3, 4, 5, 6]
    };
  },

  methods: {
    editPaper(item) {
      store.commit("saveTempValue", item);
      this.$router.push({ path: "/edit_commit" });
    }
  },

  computed: {
    item: function() {
      return store.getters.temp;
    }
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
