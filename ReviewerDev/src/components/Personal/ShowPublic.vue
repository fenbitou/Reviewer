<template>
  <div>
    <!-- search-bar -->
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="input" placeholder="标题关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" circle @click="handleSearch()"></el-button>
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

    <!-- pagination -->
    <div style="width:280px; margin:20px auto 0 auto;">
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size = "10"
          layout="prev, pager, next"
          :total="paperSum"
          :current-page="currentPageNum">
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
      let pageNumber = 1;
      if (words == "") {
        words = "all";
        store.dispatch("GetAllPaperSum");
        store.dispatch("GetPagedPaper", { words, pageNumber });
      } else {
        this.currentPageNum = 1;
        store.dispatch("GetPaperSumAfterSearch", words);
        store.dispatch("GetPagedPaper", { words, pageNumber });
      }
    },

    showPaper(index) {
      let items = store.getters.paperItems;
      let PDFUrl = items[index].paper_link;
      store.commit("saveTempValue", PDFUrl);
      this.$router.push({ path: "/showpdf" });
    },

    handleCurrentChange(pageNumber) {
      let search_words = "all";
      if (this.input != "") {
        search_words = this.input;
      }
      store.dispatch("GetPagedPaper", {
        words: search_words,
        number: pageNumber
      });
      this.currentPageNum = pageNumber;
      this.tableData = store.getters.paperItems;
    }
  },

  computed: {
    paperSum: function() {
      return parseInt(store.getters.temp);
    },
    tableData: {
      get: function() {
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
      },
      set: function(newValue) {
        // this.tableData = newValue;
      }
    }
  },

  mounted() {
    // TODO: 返回后不能记录当前的页码
    store.dispatch("GetPagedPaper", {
      words: "all",
      number: this.currentPageNum
    });
    store.dispatch("GetAllPaperSum");
  }
};
</script>


