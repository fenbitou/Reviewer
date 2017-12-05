<template>
  <div>
    <!-- search-bar -->
    <div style = "margin-bottom : 10px;" >
      <el-form :inline="true">
        <el-form-item label="公开搜索">
          <el-input placeholder="关键词" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="gotopdf">pdfpdf</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- showlist -->
    <el-table :data="tableData"  stripe style="width: 100%">
      <el-table-column  prop="paper_number" label="论文序号" >
      </el-table-column>
      <el-table-column  prop="paper_title"  label="论文名称" >
      </el-table-column>
      <el-table-column  prop="paper_author" label="论文作者" >
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="modelDetail(scope.$index)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
export default {
  name: "PublicPDF",
  data() {
    return {};
  },
  methods:{
    gotopdf(){
      location.assign('../../viewer/index.html')
    }
  }
};
</script>


