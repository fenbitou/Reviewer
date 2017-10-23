<template>
<el-row type="flex" class="row-bg" justify="center">
  <el-col :span="16">
    <el-table :data="tableData"  stripe  style="width:100%">
      <el-table-column  prop="number"  label="序号"  width="35"></el-table-column>
      <el-table-column  prop="pdfTitle"  label="文献标题" ></el-table-column>
      <el-table-column  prop="pdfAutority"  label="权限" width="80"></el-table-column>
      <el-table-column  prop="pdfURL"  label="跳转地址" width="300"></el-table-column>
    </el-table> 
  </el-col>
</el-row> 
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          number: 1,
          pdfTitle: "吴彦祖吴彦祖吴彦祖吴彦祖吴彦祖吴彦祖吴彦祖吴彦祖吴彦祖吴彦祖",
          pdfAutority: "私有",
          pdfURL: "---------跳转URL----------"
        },
        {
          number: 2,
          pdfTitle: "金城武金城武金城武金城武金城武金城武金城武金城武金城武金城武",
          pdfAutority: "公开",
          pdfURL: "---------跳转URL----------"
        },
        {
          number: 3,
          pdfTitle: "彭于晏彭于晏彭于晏彭于晏彭于晏彭于晏于晏彭于晏彭于晏彭于晏",
          pdfAutority: "公开",
          pdfURL: "---------跳转URL----------"
        },
        {
          number: 4,
          pdfTitle: "刘德华刘德华刘德华刘德华刘德华刘德华刘德华刘德华刘德华刘德华",
          pdfAutority: "私有",
          pdfURL: "---------跳转URL----------"
        }
      ]
    };
  }
};
</script>