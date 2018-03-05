<template>
  <div>
    <!-- search-bar -->
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="input" placeholder="标题关键字" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- showlist -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column  label="论文序号" type="index">
      </el-table-column>
      <el-table-column  prop="paper_title"  label="论文名称" >
      </el-table-column>
      <el-table-column  prop="paper_author" label="论文作者" width="400">
      </el-table-column>
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="showPaper(scope.$index)">查看详情</el-button>
          <el-button size="mini" type="danger" @click="deletePdf(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="width:280px; margin:20px auto 0 auto;">
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size = "10"
          layout="prev, pager, next"
          :total="paperSum">
        </el-pagination>
      </div>
    </div>


  </div>
   
</template>

<script>
import store from "../vuex/store.js";

export default {
  name: "PublicPDF",
  data() {
    return {
      currentPageNum: 1,
      input: ""
    };
  },

  methods: {
    deletePdf(index) {
      this.$confirm("此操作将永久删除该论文, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
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

    handleSearch() {
      let words = this.input;
      store.dispatch("GetPaperAfterSearch", words);
      store.dispatch("GetPaperSumAfterSearch", words);
    },

    showPaper(index) {
      let items = store.getters.paperItems;
      let PDFUrl = items[index].paper_link;
      store.commit("saveTempValue", PDFUrl);
      this.$router.push({ path: "/showpdf" });
    },

    handleCurrentChange(pageNumber) {
      let item = {
        words: this.input,
        number: pageNumber
      };
      store.dispatch("GetPagedPaper", item);
      this.currentPageNum = pageNumber;
      this.tableData = store.getters.paperItems;
    }
  },

  computed: {
    paperSum: function() {
      return parseInt(store.getters.temp);
    },
    tableData: function() {
      let data = [];
      let items = store.getters.paperItems;
      let i = 0;
      items.forEach(item => {
        let obj = [];
        obj.paper_title = item.paper_title;
        obj.paper_author = item.paper_author[0] + ", " + item.paper_author[1];
        data[i++] = obj;
      });
      return data;
    }
  },

  mounted() {
    // todo: 返回后不能记录当前的页码
    store.dispatch("GetPagedPaper", 1);
    store.dispatch("GetAllPaperSum");
  }
};
</script>


