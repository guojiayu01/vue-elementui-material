<template>
  <div class="first">
    <div class="message">
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-card style="position: relative;" class="elcard1">
              <div class="card">
                <div class="something">
                  <span class="s1">{{materialL}}</span>
                  <span class="s2">物资审批</span>
                  <i class="el-icon-truck" style="color: #00CCFF;"></i>
                </div>

                <el-progress :percentage="50"></el-progress>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-card style="position: relative;" class="elcard1">
              <div class="card">
                <div class="something">
                  <span class="s1">350</span>
                  <span class="s2">库存余量</span>
                  <i class="el-icon-s-home" style=" color:#EB7347"></i>
                </div>

                <el-progress :percentage="80" color="skyblue"></el-progress>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-card style="position: relative;" class="elcard1">
              <div class="card">
                <div class="something">
                  <span class="s1">{{userL}}</span>
                  <span class="s2">用户</span>
                  <i class="el-icon-user" style="color: #26A65B"></i>
                </div>

                <el-progress :percentage="60" color="#FC9D99"></el-progress>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-card style="position: relative;" class="elcard1">
              <div class="card">
                <div class="something">
                  <span class="s1">3</span>
                  <span class="s2">在线人数</span>
                  <i class="el-icon-loading" style="color: #daa520"></i>
                </div>

                <el-progress :percentage="30" :format="format" color="green"></el-progress>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="dataChart">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card>
            <div id="myChart2" :style="{width: '100%', height: '400px'}"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="welcome">
      <el-card class="elcard20">
        <div class="text2">WELCOME</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      materialL: "",
      userL: ""
    };
  },
  components: {},
  created() {
    let _this = this;
    this.$axios
      .get("/materials")
      .then(function(res) {
        if (res.data) {
          _this.materialL = res.data.length;
          // console.log(_this.materialL);
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });

    this.$axios
      .get("/user")
      .then(function(res) {
        if (res.data) {
          _this.userL = res.data.length;
          // console.log(res.data)
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });
  },
  computed: {},
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["出货量", "库存数", "平均出货"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "出货量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 件"
            }
          },
          {
            type: "value",
            name: "库存数",
            min: 0,
            max: 2500,
            interval: 500,
            axisLabel: {
              formatter: "{value} 件"
            }
          }
        ],
        series: [
          {
            name: "出货量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "库存数",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "平均出货",
            type: "line",
            yAxisIndex: 1,
            data: [
              200,
              300,
              350,
              460,
              690,
              1020,
              2030,
              2340,
              2300,
              1600,
              1200,
              620
            ]
          }
        ]
      });
    },

    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart.setOption({
        angleAxis: {},
        radiusAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四"],
          z: 10
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            name: "A",
            stack: "a"
          },
          {
            type: "bar",
            data: [2, 4, 6, 8],
            coordinateSystem: "polar",
            name: "B",
            stack: "a"
          },
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            name: "C",
            stack: "a"
          }
        ],
        legend: {
          show: true,
          data: ["A", "B", "C"]
        }
      });
    }
  },
  mounted() {
    this.drawLine();
    this.drawLine2();
  }
};
</script>

<style>

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.message {
  margin-top: 10px;
}
.card {
  height: 90px;
}
.something i {
  font-size: 40px;
  position: absolute;
  right: 10px;
  top: 24px;
}
.something .s1 {
  font-size: 40px;
  font-weight: 700;
}
.something .s2 {
  /* margin-left: 10px; */
  display: block;
  color: #909399;
  font-size: 14px;
  margin-top: 5px;
}
.el-progress {
  margin-top: 10px;
  margin-left: 10px;
}
.dataChart {
  margin-top: 20px;
}
.elcard20 {
  height: 150px;
  /* line-height: 150px; */
  text-align: center;
  /* padding-bottom: 50px; */
   /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.elcard20 span {
  font-size: 100px;
  margin-bottom: 50px;
}
.welcome {
  margin-top: 20px;
  height: 150px;
}
.span1 {
  margin-right: 50px;
  color: #e6a23c;
}
.span2 {
  margin-right: 50px;
  color: #67c23a;
}
.span3 {
  color: #409eff;
}

.elcard20 .text2 {
  background: url(https://media.giphy.com/media/3o6Ztb45EYezY9x9gQ/giphy.gif);
  background-size: contain;
  background-position: top left;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 9rem;
  font-weight: bold;
  font-family: sans-serif;
}
</style>