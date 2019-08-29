<template>
  <div>
    <div class="topButton">
      <el-button size="mini" type="primary" @click="showAdd()">申请计划</el-button>
      <el-button size="mini" type="warning" @click="showC()">修改计划信息</el-button>
      <el-button size="mini" type="danger">删除计划</el-button>
      <el-button size="mini" type="info" @click="putP()">提交</el-button>
    </div>
    <!-- 表格 -->
    <div class="list">
      <el-table
        :data="needPlan.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        border
        @current-change="handleCurrentsChange"
      >
        <el-table-column label="需求计划编码" prop="needPlanNum"></el-table-column>

        <el-table-column label="物资编码" prop="materialNum"></el-table-column>

        <el-table-column label="物资名称" prop="materialName"></el-table-column>

        <el-table-column label="数量" prop="num"></el-table-column>

        <el-table-column label="提交时间" prop="materialPassTime"></el-table-column>

        <el-table-column label="价格" prop="price"></el-table-column>

        <el-table-column label="总价" prop="num_price"></el-table-column>
        <el-table-column label="审批状态" prop="needPlanState"></el-table-column>
        <el-table-column label="提交人" prop="poster"></el-table-column>

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
          :total="needPlan.length"
        ></el-pagination>
      </div>
    </div>

    <!-- 弹框 -->
    <div v-if="flag" class="addPlans">
      <div class="title">
        <h2>申请计划</h2>
        <i class="el-icon-close" @click="closeAdd()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="addPlan" label-width="80px">
          <el-form-item label="物品名称">
            <el-select v-model="addPlan.materialName" placeholder="请选择" class="s1">
              <el-option
                v-for="item in materials"
                :key="item.id"
                :label="item.materialName"
                :value="item.materialName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物品数量">
            <el-input v-model="addPlan.num"></el-input>
          </el-form-item>

          <el-form-item label="价格">
            <el-input v-model="addPlan.price"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="addPlan.remark"></el-input>
          </el-form-item>

          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="addPlans()">提交</el-button>
              <el-button @click="closeAdd()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 修改探矿 -->
    <div v-if="flag2" class="changePlan">
      <div class="title">
        <h2>修改编码信息</h2>
        <i class="el-icon-close" @click="closeC()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="changePlan" label-width="80px">
          <el-form-item label="物品名称">
            <el-select v-model="changePlan.materialName" placeholder="请选择" class="s1">
              <el-option
                v-for="item in materials"
                :key="item.id"
                :label="item.materialName"
                :value="item.materialName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物品数量">
            <el-input v-model="changePlan.num"></el-input>
          </el-form-item>

          <el-form-item label="价格">
            <el-input v-model="changePlan.price"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="changePlan.remark"></el-input>
          </el-form-item>

          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="passC()">提交</el-button>
              <el-button @click="closeC()">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <div class="popContainer" v-if="flag"></div>
    <div class="popContainer" v-if="flag2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      needPlan: [],
      currentPage: 1, //初始页
      pagesize: 10,
      downloadLoading: false,
      addPlan: [
        {
          
          marterialNum: "",
          materialName: "",
          num: "",
          price: "",
          remark: ""
        }
      ],
      flag: false,
      flag2: false,
      flag3: false,
      changePlan: [
        {
          id:'',
          marterialNum: "",
          materialName: "",
          num: "",
          price: "",
          remark: "",
          needPlanState:''
        }
      ],
      materials: []
    };
  },
  computed: {
    username() {
      return this.$store.state.user_name;
    }
  },
  inject: ["reload"],
  created() {
    let _this = this;
    this.$axios
      .get("/needplans")
      .then(function(res) {
        if (res.data) {
          _this.needPlan = res.data;
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });

    this.$axios
      .get("/passMaterials")
      .then(function(res) {
        if (res.data) {
          _this.materials = res.data;
          //   console.log(res.data)
          //   console.log(_this.materials)
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });
  },
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

      this.changePlan = val;
    },
    showAdd() {
      this.flag = !this.flag;
    },
    closeAdd() {
      this.flag = !this.flag;
      this.$message("已取消操作");
    },
    addPlans() {
      // let _this = this;
      // this.$axios
      //   .post("/needplans", {
      //     // marterialNum: _this.addPlan.marterialNum,
      //     materialName: _this.addPlan.materialName,
      //     num: _this.addPlan.num,
      //     price: _this.addPlan.price,
      //     remark: _this.addPlan.remark
      //   })
      //   .then(res => {
      //     if (res.data.code === 200) {
      //       this.$message("提交成功");
      //       this.flag = !this.flag;
      //       this.reload();
      //     }
      //   })
      //   .catch(function(err) {
      //     if (err.response) {
      //       console.log(err.response);
      //     }
      //   });
      if(this.addPlan.materialName){
        let _this = this;
      this.$axios
        .post("/needplans", {
          // marterialNum: _this.addPlan.marterialNum,
          materialName: _this.addPlan.materialName,
          num: _this.addPlan.num,
          price: _this.addPlan.price,
          remark: _this.addPlan.remark
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
      }else{
        this.$message('请添全数据')
      }
    },
    showC() {
      if (this.changePlan.id) {
        this.flag2 = !this.flag2;
      } else {
        this.$message("请选择一条数据");
      }
    },
    closeC() {
      this.flag2 = !this.flag2;
      this.$message("已取消操作");
    },
    passC() {
      let _this = this;
      this.$axios
        .put("/needplans", {
          // marterialNum: _this.addPlan.marterialNum,
          id:_this.changePlan.id,
          materialName: _this.changePlan.materialName,
          num: _this.changePlan.num,
          price: _this.changePlan.price,
          remark: _this.changePlan.remark
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("提交成功");
            this.flag2 = !this.flag2;
            this.reload();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    putP() {
      console.log(this.username);
      let _this = this;
      this.$axios
        .put("/needplanState", {
          poster: _this.username,
          needPlanState:_this.changePlan.needPlanState,
          id:_this.changePlan.id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("提交成功");
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
.addPlans {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 450px;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.addPlans .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.addPlans .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.addPlans .change {
  margin-right: 40px;
  margin-top: 30px;
  margin-left: 10px;
}
.addPlans .change .s1 {
  width: 270px;
}
.addPlans .addButton .el-button {
  width: 115px;
}
.addPlans .el-select {
  width: 280px;
}
.changePlan {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 450px;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.changePlan .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.changePlan .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.changePlan .change {
  margin-right: 40px;
  margin-top: 30px;
  margin-left: 10px;
}
.changePlan .addButton .el-button {
  width: 115px;
}
.changePlan .el-select {
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