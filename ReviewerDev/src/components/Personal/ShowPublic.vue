<template>
  <div>
    <!-- search-bar -->
    <div>
      <el-form :inline="true">
        <el-form-item label="公开搜索">
          <el-input placeholder="关键词" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showPdf">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- showlist -->
    <el-table :data="tableData"  stripe style="width: 100%">
      <el-table-column  prop="paper_number" label="论文序号"  width="200">
      </el-table-column>
      <el-table-column  prop="paper_title"  label="论文名称" >
      </el-table-column>
      <el-table-column  prop="paper_author" label="论文作者" >
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="showPdf(scope.$index)">查看详情</el-button>
          <el-button size="mini" type="danger" @click="deletePdf(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    showPdf(index) {
      this.$router.push({ path: "/showpdf" });
    },
    deletePdf(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let items = store.getters.paperItems;
        store.dispatch("DeletePaperItem", items[index]._id);
        this.$message({ type: 'success', message: '删除成功!' });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },

  computed: {
    tableData: function() {
      let data = [];
      let items = store.getters.paperItems;
      let i = 0;
      let j = 0;
      items.forEach((item)=>{
        let obj ={};
        obj.paper_number = ++j;
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


