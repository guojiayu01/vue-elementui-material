<template>
  <div>
    <div class="topButton">
      <el-button size="mini" type="primary" @click="openChange()">更改负责人</el-button>
    </div>
    <!-- 表格 -->
    <div class="list">
      <el-table
        :data="deptList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        border
        @current-change="handleCurrentsChange"
      >
        <el-table-column label="ID" prop="id"></el-table-column>

        <el-table-column label="部门号" prop="deptNum"></el-table-column>

        <!-- <el-table-column
      label="密码"
      prop="passWord">
        </el-table-column>-->

        <el-table-column label="部门名称" prop="deptName"></el-table-column>

        <el-table-column label="负责人" prop="deptAdmin"></el-table-column>
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
          :total="deptList.length"
        ></el-pagination>
      </div>
    </div>

    <!-- 弹框 -->

    <div v-if="flag" class="changeAdmin">
      <div class="title">
        <h2>更改部门负责人</h2>
        <i class="el-icon-close" @click="closeChange()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="changeDept" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="changeDept.deptAdmin"></el-input>
          </el-form-item>

          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="putChange()">提交</el-button>
              <el-button @click="closeChange()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 蒙版 -->
    <div class="popContainer" v-if="flag"></div>
  </div>
</template>

<script>
import { close } from "fs";
export default {
  data() {
    return {
      deptList: [],
      currentPage: 1, //初始页
      pagesize: 10,
      changeDept: [{
          id:'',
          deptNum:'',
          deptName:'',
          jobNum: '',
          deptAdmin:''
      }],
      flag: false,
      
    };
  },
  created() {
    let _this = this;
    this.$axios
      .get("/dept")
      .then(function(res) {
        if (res.data) {
          _this.deptList = res.data.data;
          // console.log(res.data)
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentsChange(val) {
      this.currentRow = val;

      this.changeDept = val;
        console.log(this.changeDept)
      // this.changeList = []
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      // console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage)  //点击第几页
    },
    openChange() {
      if (this.changeDept.deptAdmin) {
        this.flag = !this.flag;
      } else {
        this.$message("请选择一条数据");
      }
    },
    closeChange() {
      this.flag = !this.flag;
      this.$message("已取消操作");
    },
    putChange() {
      let _this = this;
      this.$axios
        .put("/dept", {
          id:_this.changeDept.id,
          deptNum:_this.changeDept.deptNum,
          deptName:_this.changeDept.deptName,
          jobNum: _this.changeDept.jobNum,
          deptAdmin: _this.changeDept.deptAdmin
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("修改成功");
            this.flag = !this.flag;
            this.reload();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        });
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
.changeAdmin {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 250px;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.changeAdmin .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.changeAdmin .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.changeAdmin .change {
  margin-right: 40px;
  margin-top: 30px;
}
.changeAdmin .addButton .el-button {
  width: 115px;
}
.changeAdmin .el-select {
  width: 280px;
}
.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
}
</style>