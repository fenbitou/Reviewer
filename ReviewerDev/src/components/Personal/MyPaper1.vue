<template>
  <div>
    <!-- My paper status step -->
    <el-steps :active="1" simple class="paper_steps" >
      <el-step title="未提交评审" icon="el-icon-edit"></el-step>
      <el-step title="正在评审" icon="el-icon-loading"></el-step>
      <el-step title="已定稿" icon="el-icon-success"></el-step>
    </el-steps>

    <!--initial paper cards -->
    <el-row :gutter="18">
      <el-col :sm="12" :lg="8"  v-for="item in items" :key="item._id">
        <el-card class="box_card" shadow="hover">
          <!-- paper card head -->
          <div slot="header" class="clearfix">
            <span>{{item.paper_title}}</span><br/>
            <div class="time">修改时间：{{ item.update_date | formatDate }}</div>
            <el-button class="btn-card" type="text" @click="editPaper(item)">修改论文</el-button>
          </div>
          <!-- paper card change content -->
          <div class="paper_card_body">{{handle(item)}}</div>
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
      if (item.update_paper_sum === 0) {
        return "请点击「修改论文」开始撰写论文";
      } else {
        //TODO: [bug] 未定义的paper_content
        let sum = item.update_paper_sum;
        return this.removeHTMLTag(
          item.paper_content[sum - 1].current_content
        ).slice(-100);
      }
    },

    //TODO: 按card宽度换行
    removeHTMLTag(str) {
      str = str.replace(/<\/?[^>]*>/g, " "); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str = str.replace(/&nbsp;/gi, ""); //去掉&nbsp;
      str = str.replace(/\s/g, ""); //将空格去掉
      return str;
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
    store.dispatch("FindStatusItem", { id: "admin", status: "init" });
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../style/mypaper.less";
</style>