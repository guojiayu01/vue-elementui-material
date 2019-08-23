<template>
  <div>
    <div class="left-card">
      <el-card class="box-card">
          <h3>前端</h3>
        <img src="../assets/WechatIMG2.jpeg" alt="">
        <span>联系人：郭佳玉</span>
        <div class="mail">邮箱：2434957426@qq.com</div>
      </el-card>
    </div>

    <div class="right-card">
      <el-card class="box-card">
          <h3>后端</h3>
        <img src="../assets/WechatIMG3.jpeg" alt="">
        <span>联系人：孙原</span>
        <div class="mail">邮箱：1908925010@qq.com</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.box-card h3{
    margin-left: 25px;
    font-size: 30px;
    
}
.box-card span{
    margin-left: 25px;
    font-weight: 900;
}
.box-card .mail {
    margin-left: 25px;
    font-weight: 900;
    margin-top: 10px;
}
.left-card{
    float: left;
    margin-left: 50px;
}
.right-card {
    float: right;
    margin-right: 50px;
}
</style>