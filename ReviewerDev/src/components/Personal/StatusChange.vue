<template>
  <div>
    <!-- showlist -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column  label="论文序号" type="index">
      </el-table-column>
      <el-table-column  prop="paper_title"  label="论文名称" >
      </el-table-column>
      <el-table-column  prop="paper_author" label="论文作者" width="400">
      </el-table-column>
      <el-table-column  label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="showPaper(scope.$index)">查看/评审 论文</el-button>
          <el-button size="mini" type="primary" plain @click="showDialog(scope.$index)">定稿意见</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->
    <el-dialog title="给出定稿意见" :visible.sync="isShowDialog">
      <el-form :model="form" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="论文标题">
          <span>{{form.title}}</span>
        </el-form-item>
        <el-form-item label="学生姓名">
          <span>{{form.author}}</span>
        </el-form-item>
        <el-form-item label="提交时间">
          <span>{{form.time | formatDate_dialog}}</span>
        </el-form-item>
        <el-form-item label="定稿意见" prop="comment">
          <el-input type="textarea" v-model="form.comment" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="commentPaper">提交定稿意见</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import store from "../vuex/store.js";
import { formatDate } from "../../js/date.js";

export default {
  name: "StatusChange",
  data() {
    return {
      isShowDialog: false,
      index: "",
      form: {
        title: "",
        author: "",
        time: "",
        comment: ""
      },
      rules: {
        comment: [
          { required: true, message: "请填写定稿意见", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    showDialog(index) {
      this.isShowDialog = true;
      this.index = index;
      let paper = store.getters.paperItems[index];
      let authorList = paper.paper_author[0] + ",  " + paper.paper_author[1];

      this.form.title = paper.paper_title;
      this.form.author = authorList;
      this.form.time = paper.update_date;
    },

    commentPaper() {
      let index = this.index;
      let paper = store.getters.paperItems[index];

      let paper_id = paper._id;
      let paper_num = paper.update_paper_sum - 1;
      let lasted_paper = paper.paper_content[paper_num];
      let paper_status = "commit";
      let paper_comment = this.form.comment;

      this.$confirm(
        "请确认学生论文符合定稿要求，同时已给出定稿意见，提交定稿意见后您和学生都无法对论文做出任何修改。",
        "定稿操作",
        {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        }
      )
        .then(() => {
          let current_time = new Date();
          store.dispatch("UpdatePaperStatus", {
            id: paper_id,
            status: paper_status,
            paper: lasted_paper,
            time: current_time,
            comment: paper_comment
          });
          this.$message({ type: "success", message: "定稿操作成功!" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消定稿操作"
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
    store.dispatch("FindStatusItem", { id: "admin", status: "commit" });
  },

  filters: {
    formatDate_dialog(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>


