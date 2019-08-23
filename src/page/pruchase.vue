<template>
  <div>
    <div class="topButton">
      <el-button size="mini" type="primary" @click="bohui()">请购</el-button>
    </div>
    <div class="list">
      <el-table
        :data="pruchase.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        border
        @current-change="handleCurrentsChange"
      >
        <el-table-column label="需求计划编码" prop="needPlanNum"></el-table-column>

        <el-table-column label="物资名称" prop="materialName"></el-table-column>

        <el-table-column label="数量" prop="num"></el-table-column>

        <el-table-column label="编码通过时间" prop="materialPassTime"></el-table-column>

        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="总价格" prop="num_price"></el-table-column>

        <el-table-column label="状态" prop="needPlanState"></el-table-column>
        <el-table-column label="采购员" prop="buyer"></el-table-column>

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
          :total="pruchase.length"
        ></el-pagination>
      </div>
    </div>

    <div class="delete" v-if="flag3">
      <div class="title">
        <span>提示</span>
        <i class="el-icon-close" @click="clossB()"></i>
      </div>
      <div class="main">
        <el-form ref="form" :model="addBuyer" label-width="80px">
          <el-form-item label="采购员">
            <el-select v-model="addBuyer.buyer" placeholder="请选择" class="s1">
              <el-option
                v-for="item in people"
                :key="item.id"
                :label="item.userName"
                :value="item.userName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="deleteButton">
        <el-button size="mini" @click="clossB()">取消</el-button>
        <el-button size="mini" type="danger" @click="rejected()">确定</el-button>
      </div>
    </div>

    <div class="popContainer" v-if="flag3"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pruchase: [
        {
          needPlanNum: "",
          materialName: "",
          num: "",
          materialPassTime: "",
          price: "",
          num_price: "",
          needPlanState: "",
          buyer: "",
          remark: ""
        }
      ],
      currentPage: 1, //初始页
      pagesize: 10,
      flag3: false,
      people: [],
      addBuyer: [
        {
          id: "",
          needPlanNum: "",
          materialName: "",
          num: "",
          materialPassTime: "",
          price: "",
          num_price: "",
          needPlanState: "",
          buyer: "",
          remark: ""
        }
      ]
    };
  },
  created() {
    let _this = this;
    this.$axios
      .get("/pruchaseNeedplan")
      .then(function(res) {
        if (res.data) {
          _this.pruchase = res.data;
        //   console.log(res.data)
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });

    this.$axios
      .get("/pruchase")
      .then(function(res) {
        if (res.data) {
          _this.people = res.data;
          //   console.log(_this.people)
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
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentsChange(val) {
      this.currentRow = val;

      //   console.log(this.changeDept)
      // this.changeList = []
      this.bohuidata = val;
      this.addBuyer = val;

      console.log(this.addBuyer.buyer);
      // console.log(this.shenpi.id)
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      // console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage)  //点击第几页
    },
    bohui() {
      if (this.addBuyer.id) {
        this.flag3 = !this.flag3;
      } else {
        this.$message("请选择一条数据");
      }
    },
    clossB() {
      this.flag3 = !this.flag3;
      this.$message("已取消操作");
    },
    rejected() {
      let _this = this;
      this.$axios
        .put("/needplanState", {
          id: _this.addBuyer.id,
          needPlanState: _this.addBuyer.needPlanState,
          buyer: _this.addBuyer.buyer
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("请购成功");
            this.flag3 = !this.flag3;
            this.reload();
            console.log(_this.addBuyer.buyer);
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
            // this.$message("后台连接失败");
          }
        });
    }
  }
};
</script>

<style>
.el-table-column {
  text-align: center;
}
.topButton {
  width: 100%;
  height: 50px;
  line-height: 50px;
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
.delete {
  position: absolute;
  z-index: 1001;
  width: 430px;
  height: 240px;
  border: 1px solid #dcdfe6;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
}
.title {
  width: 100%;
  height: 45px;
  line-height: 45px;
}
.title span {
  float: left;
  margin-left: 20px;
}
.delete .title i {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}
.delete .main {
  height: 50px;
  width: 100%;
  line-height: 50px;
  margin-left: 50px;
}
.delete .main i {
  color: #e6a23c;
  font-size: 20px;
  margin-right: 10px;
}
.delete .main span {
  margin-bottom: 5px;
}

.delete .deleteButton {
  float: right;
  margin-right: 20px;
  margin-top: 100px;
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