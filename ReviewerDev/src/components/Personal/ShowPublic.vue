<template>
  <div>
    <!-- search-bar -->
    <div>
      <el-form :inline="true">
        <el-form-item label="公开搜索">
          <el-input placeholder="关键词" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- showlist -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column  label="论文序号" type="index">
      </el-table-column>
      <el-table-column  prop="paper_title"  label="论文名称" >
      </el-table-column>
      <el-table-column  prop="paper_author" label="论文作者">
      </el-table-column>
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="showPaper(scope.$index)">查看详情</el-button>
          <el-button size="mini" type="danger" @click="deletePdf(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="block">
      <span class="demonstration">直接前往</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div> -->

  </div>
   
</template>

<script>
import store from "../vuex/store.js";

export default {
  name: "PublicPDF",
  data() {
    return {};
  },

  methods: {
    deletePdf(index) {
      this.$confirm("此操作将永久删除该论文, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        let items = store.getters.paperItems;
        store.dispatch("DeletePaperItem", items[index]._id);
        this.$message({ type: "success", message: "删除成功!" });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },

    showPaper(index) {
      let items = store.getters.paperItems;
      let PDFUrl = items[index].paper_link;
      store.commit("saveTempValue", PDFUrl);
      this.$router.push({ path: "/showpdf" });
    }
  },

  computed: {
    tableData: function() {
      let data = [];
      let items = store.getters.paperItems;
      let i = 0;
      items.forEach((item)=>{
        let obj = [];
        obj.paper_title = item.paper_title;
        obj.paper_author = item.paper_author;
        data[i++] = obj;
      })
      return data;
    }
  },

  mounted() {
    store.dispatch("InitPaperItem").then(function(data) {
      console.log(data);
    });
  }
};
</script>


