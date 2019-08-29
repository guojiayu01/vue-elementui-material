<template>
  <div>
    <div class="topButton">
      <el-button size="mini" type="primary" @click="openAdd()">申请编码</el-button>

      <el-button size="mini" type="warning" @click="openGet()">修改编码信息</el-button>
      
      <el-button size="mini" type="info" @click="postM()">提交</el-button>
      <el-button size="mini" type="info" @click="handleDownload" :loading="downloadLoading">打印</el-button>
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
        <el-table-column label="物资编码" prop="materialNum"></el-table-column>

        <el-table-column label="物资名称" prop="materialName"></el-table-column>

        <!-- <el-table-column label="物资申请时间" prop="materialPostTime"></el-table-column>

        <el-table-column label="物资编码通过时间" prop="materialPassTime"></el-table-column> -->

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

    <!-- 弹框 -->
    <div v-if="flag2" class="getM1">
      <div class="title">
        <h2>申请编码</h2>
        <i class="el-icon-close" @click="clossAdd()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="addM" label-width="80px">
          <el-form-item label="物品名称">
            <el-input v-model="addM.materialName"></el-input>
          </el-form-item>

          <el-form-item label="价格">
            <el-input v-model="addM.price"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="addM.materialTypeName" placeholder="请选择类别" style="width:270px;">
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="钢材类" value="钢材类"></el-option>
              <el-option label="服饰" value="服饰"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="提交人">
            <el-input v-model="addM.poster"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="addM.remark"></el-input>
          </el-form-item>

          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="addMa()">提交</el-button>
              <el-button @click="clossAdd()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 修改探矿 -->
    <div v-if="flag" class="getM">
      <div class="title">
        <h2>修改编码信息</h2>
        <i class="el-icon-close" @click="closeGet()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="changematerial" label-width="80px">
          <el-form-item label="物品名称">
            <el-input v-model="changematerial.materialName"></el-input>
          </el-form-item>

          <el-form-item label="价格">
            <el-input v-model="changematerial.price"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select
              v-model="changematerial.materialTypeName"
              placeholder="请选择类别"
              style="width:270px;"
            >
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="钢材类" value="钢材类"></el-option>
              <el-option label="服饰" value="服饰"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="提交人">
            <el-input v-model="changematerial.poster"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="changematerial.remark"></el-input>
          </el-form-item>

          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="change()">提交</el-button>
              <el-button @click="closeGet()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 蒙版 -->
    <div class="popContainer" v-if="flag"></div>
    <div class="popContainer" v-if="flag2"></div>
  </div>
</template>

<script>
import { close } from "fs";
import { constants } from "crypto";
export default {
  data() {
    return {
      material: [],
      currentPage: 1, //初始页
      pagesize: 10,
      changematerial: [
        {
          id: "",
          materialName: "",
          price: "",
          materialTypeName: "",
          poster: "",
          remark: "",
          materialState: ""
        }
      ],
      addM: [
        {
          materialName: "",
          price: "",
          materialTypeName: "",
          poster: "",
          remark: ""
        }
      ],
      flag: false,
      flag2: false,
      flag3: false,
      downloadLoading: false
    };
  },
  inject: ["reload"],
  created() {
    let _this = this;
    this.$axios
      .get("/materials")
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
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentsChange(val) {
      this.currentRow = val;

      this.changematerial = val;
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    openGet() {
      if (this.changematerial.id) {
        this.flag = !this.flag;
      } else {
        this.$message("请选择一条数据");
      }
    },
    closeGet() {
      this.flag = !this.flag;
      this.$message("已取消操作");
    },
    openAdd() {
      this.flag2 = !this.flag2;
    },
    clossAdd() {
      this.flag2 = !this.flag2;
    },
    addMa() {
      // let _this = this;
      // this.$axios
      //   .post("/materials", {
      //     materialName: _this.addM.materialName,
      //     price: _this.addM.price,
      //     materialTypeName: _this.addM.materialTypeName,
      //     poster: _this.addM.poster,
      //     remark: _this.addM.remark
      //   })
      //   .then(res => {
      //     if (res.data.code === 200) {
      //       this.$message("添加成功");
      //       this.flag2 = !this.flag2;
      //       this.reload();
      //     }
      //   })
      //   .catch(function(err) {
      //     if (err.response) {
      //       console.log(err.response);
      //     }
      //   });
      if(this.addM.materialName){
        let _this = this;
      this.$axios
        .post("/materials", {
          materialName: _this.addM.materialName,
          price: _this.addM.price,
          materialTypeName: _this.addM.materialTypeName,
          poster: _this.addM.poster,
          remark: _this.addM.remark
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("添加成功");
            this.flag2 = !this.flag2;
            this.reload();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
      }else{
        this.$message('请添全数据')
      }
    },
    postM() {
      if (this.changematerial.materialState) {
        let _this = this;
        this.$axios
          .put("/materialState", {
            id: _this.changematerial.id,
            materialState: _this.changematerial.materialState
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message("提交成功");
              this.flag = !this.flag;
              this.reload();
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      } else {
        this.$message("请选择一条未提交的数据");
      }
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
    },
    change() {
      let _this = this;
      this.$axios
        .put("/materials", {
          id: _this.changematerial.id,
          materialName: _this.changematerial.materialName,
          price: _this.changematerial.price,
          materialTypeName: _this.changematerial.materialTypeName,
          poster: _this.changematerial.poster,
          remark: _this.changematerial.remark,
          materialState: _this.changematerial.materialState
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("提交成功");
            this.flag = !this.flag;
            this.reload();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
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
.getM {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 490px;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.getM .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.getM .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.getM .change {
  margin-right: 40px;
  margin-top: 30px;
  margin-left: 10px;
}
.getM .addButton .el-button {
  width: 115px;
}
.getM .el-select {
  width: 280px;
}

.getM1 {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 490px;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.getM1 .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.getM1 .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.getM1 .change {
  margin-right: 40px;
  margin-top: 30px;
  margin-left: 10px;
}
.getM1 .addButton .el-button {
  width: 115px;
}
.getM1 .el-select {
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