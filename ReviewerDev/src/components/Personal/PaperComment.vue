<template>
  <div>
    <!-- paper progress breadcrumb -->
    <div class="paper_navbar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的论文</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mypaper_commit' }">正在评审的论文</el-breadcrumb-item>
        <el-breadcrumb-item>{{item.paper_title}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- paper comments handle buttons -->
      <el-dropdown v-if="isShowDropdown" @command="dropdownCommand" class="edit_dropdown" >
        <el-button type="default" size="mini">
          历史文章评审意见<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="historyPaper in listItems" :key="historyPaper._id" :command="historyPaper._id">{{historyPaper.update_time | formatDate_dropdown }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- edit papaer button -->
      <el-button type="primary" size="mini" class="edit_dropdown" @click="editPaper(item)">
        修改论文
      </el-button>
    </div>
    
    <!-- paper comment cards -->
    <div>
      <el-row :gutter="18">
        <el-col :sm="8" :lg="6" v-for="item in 10" :key="item._id">
          <el-card class="box_card" shadow="hover">
            <!-- comment card head -->
            <div slot="header" class="comment_card_header">
              写的太好了写的太好了
            </div>
            <!-- comment card body -->
            <div class="paper_card_body paper_content">
              "Techniques  for  automatically  designing  deep  neural  net-work architectures such as reinforcement learning based ap-proaches  have  recently  shown  promising  results.  However,their success is based on vast computational resources (e.g.hundreds of GPUs), making them difficult to be widely used."
            </div>
          </el-card>
        </el-col>
      </el-row>

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
      item: store.getters.temp,
      listItems: store.getters.temp.paper_content.slice(0, -1).reverse(),
      isShowDropdown: store.getters.temp.paper_content.length > 1 ? true : false
    };
  },

  methods: {
    editPaper(item) {
      store.commit("saveTempValue", item);
      this.$router.push({ path: "/edit_commit" });
    },

    dropdownCommand(cmd){
      console.log(cmd);
    }
  },

  computed: {},

  filters: {
    formatDate_card(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },

    formatDate_dropdown(time) {
      let date = new Date(time);
      return formatDate(date, "MM-dd hh:mm");
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>
