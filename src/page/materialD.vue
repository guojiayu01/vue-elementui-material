<template>
  <div>
    <div class="topButton">
      <el-button size="mini" type="primary" @click="handleDownload" :loading="downloadLoading">打印</el-button>
    </div>
    <!-- 表格 -->
    <div class="list">
      <el-table
        :data="material.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        border
        @current-change="handleCurrentsChange"
      >
        <el-table-column label="需求计划号" prop="materialNum"></el-table-column>

        <el-table-column label="物资名称" prop="materialName"></el-table-column>

        <el-table-column label="物资申请时间" prop="materialPostTime"></el-table-column>

        <el-table-column label="物资编码通过时间" prop="materialPassTime"></el-table-column>

        <el-table-column label="价格" prop="price"></el-table-column>

        <el-table-column label="状态" prop="materialState"></el-table-column>

        <el-table-column label="类别" prop="materialTypeName"></el-table-column>
        <el-table-column label="驳回原因" prop="rejectRemark"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="material.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      material: [],
      currentPage: 1, //初始页
      pagesize: 10,
      downloadLoading:false,
    };
  },
  created() {
    let _this = this;
    this.$axios
      .get("/passMaterials")
      .then(function(res) {
        if (res.data) {
          _this.material = res.data;
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });
  },
  inject: ["reload"],
  methods: {
    
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
      setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentsChange(val) {
      this.currentRow = val;

      this.changematerial = val;
    },
    handleDownload() {
      this.downloadLoading = true;
      console.log(this.material);
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel");
        const tHeader = [
          "物资编码",
          "物资名称",
          "物资申请时间",
          "物资编码通过时间",
          "价格",
          "状态",
          "类别",
          "驳回原因",
          "备注"
        ];
        const filterVal = [
          "materialNum",
          "materialName",
          "materialPostTime",
          "materialPassTime",
          "price",
          "materialState",
          "materialTypeName",
          "rejectRemark",
          "remark"
        ];
        const list = this.material;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "列表excel");
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style>
.topButton {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-bottom: 20px;
}
.list {
  position: relative;
}
.page {
  /* margin-top: 20px;
    margin-left: 800px; */
  position: absolute;
  right: 0;
  bottom: -50px;
}
</style>