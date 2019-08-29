<template>
  <div class="people">
    <div class="topButton">
      <el-button size="mini" @click="showAddUser()" type="primary">添加人员</el-button>

      <el-button size="mini" type="warning" @click="showChange()">修改</el-button>

      <el-button size="mini" type="info" @click="mShow()">查看密码</el-button>

      <el-button size="mini" type="danger" @click="showDelete()">删除</el-button>
    </div>
    <!-- 表格 -->
    <div class="list">
      <!-- <div class="search">
        <el-input v-model="search" placeholder="请输入内容"></el-input>
      </div>-->

      <el-table
        :data="user.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        border
        @current-change="handleCurrentsChange"
      >
        <el-table-column label="ID" prop="id"></el-table-column>

        <el-table-column label="工号" prop="jobNum"></el-table-column>

        <el-table-column label="密码" prop="passWord" v-if="flag4"></el-table-column>

        <el-table-column label="姓名" prop="userName"></el-table-column>

        <el-table-column label="联系电话" prop="userTel"></el-table-column>

        <el-table-column label="性别" prop="userSex"></el-table-column>

        <el-table-column label="部门编号" prop="deptNum"></el-table-column>

        <el-table-column label="部门" prop="deptName"></el-table-column>

        <el-table-column label="职位" prop="job"></el-table-column>

        <template slot="header">
          <el-input v-model="search" placeholder="输入关键字搜索" />
        </template>
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
          :total="user.length"
        ></el-pagination>
      </div>
    </div>

    <!-- 添加人员弹框 -->

    <div v-if="flag" class="addUser">
      <div class="title">
        <h2>添加人员</h2>
        <i class="el-icon-close" @click="clossAdd()"></i>
      </div>
      <div class="add">
        <el-form ref="form" :model="addUser" label-width="80px" :rules="rules">
          <el-form-item label="姓名">
            <el-input v-model="addUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="addUser.jobNum" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addUser.passWord"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addUser.userTel"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="addUser.userSex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="addUser.deptName" placeholder="请选择部门">
              <el-option label="采购部" value="采购部"></el-option>
              <el-option label="库管部" value="库管部"></el-option>
              <el-option label="物资部" value="物资部"></el-option>
            </el-select>
          </el-form-item>
          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="addPeople()">提交</el-button>
              <el-button @click="addRest()">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 修改弹框 -->

    <div v-if="flag2" class="changeUser">
      <div class="title">
        <h2>修改人员</h2>
        <i class="el-icon-close" @click="clossChange()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="changeList" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="changeList.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="changeList.passWord"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="changeList.userTel"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="changeList.userSex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="changeList.deptName" placeholder="请选择部门">
              <el-option label="采购部" value="采购部"></el-option>
              <el-option label="库管部" value="库管部"></el-option>
              <el-option label="物资部" value="物资部"></el-option>
            </el-select>
          </el-form-item>
          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="changeUser()">提交</el-button>
              <el-button @click="changeRest()">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 删除弹框 -->
    <div class="delete" v-if="flag3">
      <div class="title">
        <span>提示</span>
        <i class="el-icon-close" @click="closeDelete()"></i>
      </div>
      <div class="main">
        <i class="el-icon-warning"></i>
        <span>此操作将永久删除该数据，是否继续</span>
      </div>
      <div class="deleteButton">
        <el-button size="mini" @click="closeDelete()">取消</el-button>
        <el-button size="mini" type="danger" @click="deleteInfo()">确定</el-button>
      </div>
    </div>

    <div class="popContainer" v-if="flag"></div>
    <div class="popContainer" v-if="flag2"></div>
    <div class="popContainer" v-if="flag3"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      flag: false,
      flag2: false,
      flag3: false,
      flag4:false,
      search: "",
      currentPage: 1, //初始页
      pagesize: 10,
      addUser: [
        {
          JobNum:'',
          userName: "",
          passWord: "",
          userTel: "",
          userSex: "",
          deptName: ""
        }
      ],
      changeList: [
        {
          userName: "",
          passWord: "",
          userTel: "",
          userSex: "",
          deptName: ""
        }
      ],
      deleteList: [
        {
          userName: "",
          passWord: "",
          userTel: "",
          userSex: "",
          deptName: "",
          jobNum: ""
        }
      ],
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        jobnum: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
        name: [
          { required: false, message: "请输入姓名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    let _this = this;
    this.$axios
      .get("/user")
      .then(function(res) {
        if (res.data) {
          _this.user = res.data;
          // console.log(res.data)
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
    showAddUser() {
      this.flag = !this.flag;
    },
    addPeople() {
      if(this.addUser.userName){
         let _this = this;
      this.$axios
        .post("/user", {
          jobNum:_this.addUser.jobNum+_this.user.length+1,
          userName: _this.addUser.userName,
          passWord: _this.addUser.passWord,
          userTel: _this.addUser.userTel,
          userSex: _this.addUser.userSex,
          deptName: _this.addUser.deptName
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("添加成功");
            this.flag = !this.flag;
            // this.flag2=!this.flag2
            // this.$router.go(0)
            this.reload();
            console.log(_this.addUser.jobNum+_this.addUser.length+1)
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        });
      }else{
        this.$message('请添全信息')
      }
    },
    changeUser() {
      let _this = this;
      this.$axios
        .put("/user", {
          userName: _this.changeList.userName,
          passWord: _this.changeList.passWord,
          userTel: _this.changeList.userTel,
          userSex: _this.changeList.userSex,
          deptName: _this.changeList.deptName,
          jobNum: _this.changeList.jobNum
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("修改成功");
            this.flag2 = !this.flag2;
            // this.flag2=!this.flag2
            // this.$router.go(0)
            this.reload();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        });
    },
    deleteInfo() {
      if(this.deleteList.jobNum=='0001'){
        this.$message('没有权限')
      }else{
      let _this = this;
      console.log(_this.deleteList.jobNum);
      this.$axios
        .delete("/user", {
          data: {
            jobNum: _this.deleteList.jobNum
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("删除成功");
            this.flag3 = !this.flag3;
            this.reload();
          }
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        });
      }
    },

    showDelete() {
      if (this.deleteList.jobNum) {
        this.flag3 = !this.flag3;
      } else {
        this.$message("请选择一条数据");
      }
    },

    clossAdd() {
      this.flag = !this.flag;
      this.$message("操作已取消");
    },
    addRest() {
      this.addUser = [];
    },
    // 点击选中
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentsChange(val) {
      this.currentRow = val;
      this.changeList = val;
      this.deleteList = val;

      // this.changeList = []
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },

    clossChange() {
      this.flag2 = !this.flag2;
      this.$message("操作已取消");
    },
    showChange() {
      if (this.changeList.jobNum) {
        this.flag2 = !this.flag2;
      } else {
        this.$message("请选择一条数据");
      }
    },
    closeDelete() {
      this.flag3 = !this.flag3;
      this.$message("操作已取消");
    },
    changeRest() {
      this.changeList = [];
    },
    mShow(){
       this.flag4 = !this.flag4;
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
.el-table-column {
  text-align: center;
}
.el-submenu .el-menu-item:hover {
  background-color: rgb(232, 243, 255);
}
.list {
  position: relative;
}
.addUser {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 550px;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.addUser .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.addUser .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.addUser .add {
  margin-right: 40px;
  margin-top: 30px;
}
.addUser .addButton {
  margin-left: 10px;
  margin-top: 30px;
}
.addUser .addButton .el-button {
  width: 110px;
}
.addUser .el-select {
  width: 280px;
}
.changeUser {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 500px;
  /* border:1px solid #dcdfe6; */
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.changeUser .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.changeUser .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.changeUser .change {
  margin-right: 40px;
  margin-top: 30px;
}
.changeUser .addButton .el-button {
  width: 115px;
}
.changeUser .el-select {
  width: 280px;
}
.delete {
  position: absolute;
  z-index: 1001;
  width: 430px;
  height: 140px;
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
  margin-top: 7px;
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
.page {
  position: absolute;
  right: 0;
  bottom: -50px;
}
.search {
  position: relative;
  top: -12px;
}
</style>