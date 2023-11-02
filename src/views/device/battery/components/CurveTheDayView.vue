<!--
 * @Author       : liqiao
 * @Date         : 2023-10-29 22:14:04
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-11-02 18:04:53
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/device/battery/components/CurveTheDayView.vue
-->

<template>
  <div class="curve__day-content">
    <div class="title">当日曲线</div>
    <div class="search__content">
      <div class="search__date">
        <span class="demonstration">选择日期：</span>
        <el-date-picker
          v-model="dateValue"
          type="date"
          @change="changeDate"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
      <div class="search__date">
        <span class="demonstration">选择时间：</span>
        <!-- default-value="[]" -->
        <el-time-picker
          is-range
          v-model="timeValue"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          @change="changeTime"
        >
        </el-time-picker>
      </div>
    </div>
    <div ref="line" class="chart__content" />

    <div v-if="dateValue && timeValue" class="time__content">
      当前时间段：{{ getTimeStrByDate(dateValue, "date")
      }}{{ getTimeStrByDate(timeValue[0]) }} -
      {{ getTimeStrByDate(dateValue, "date")
      }}{{ getTimeStrByDate(timeValue[1]) }}
    </div>
    <div class="pagination__content">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/views/dashboard/mixins/resize.js";
import { getBmsData } from "@/api/device/battery";

export default {
  mixins: [resize],
  props: {
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chart: null,
      dateValue: null,
      timeValue: null,
      batterySn: this.$route.params && this.$route.params.devId,
      pageNum: 0,
      pageSize: 500,
      total: 0,
      xAxisList: [],
      chartData: {
        voltageList: [],
        currentList: [],
        socList: [],
        capacityList: [],
        powerTemperatureList: [],
        coreTemperatureList: [],
        temperatureList: [],
        diffVolList: [],
      },
    };
  },
  computed: {
    dateDefault() {
      let date = new Date();
      let defaultTime = date.getTime();
      let currDate = new Date(defaultTime);
      // 月，日 不够10补0
      const defaultDate =
        currDate.getFullYear() +
        "-" +
        (currDate.getMonth() + 1 >= 10
          ? currDate.getMonth() + 1
          : "0" + (currDate.getMonth() + 1)) +
        "-" +
        (currDate.getDate() >= 10
          ? currDate.getDate()
          : "0" + currDate.getDate());
      return defaultDate;
    },
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    // 默认日期
    // this.dateValue = this.dateDefault;
    // this.getBmsDataOperate();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    async getBmsDataOperate() {
      // TODO:
      const time = this.dateValue ? this.dateValue.getTime() : undefined;
      if (!this.dateValue || !this.timeValue) {
        this.$message({
          message: "请选择日期和时间",
          type: "warning",
        });
        return;
      }
      const res = await getBmsData({
        batterySn: this.batterySn,
        // time: this.dateValue.getTime(),
        // startTime: this.timeValue[0].getTime(),
        // endTime: this.timeValue[1].getTime(),
        time: "2023_11_02",
        startTime: "2023_11_02 00:00:00",
        endTime: "2023_11_02 59:59:59",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });

      if (Number(res.code) === 200) {
        const data = res.data;
        this.total = data.total;

        this.xAxisList =
          data.list &&
          data.list.map((item) =>
            this.getTimeStrByDate(new Date(item.recordTime))
          );

        data.list &&
          data.list.forEach((item) => {
            this.chartData.voltageList.push(
              (Number(item.voltage) / 100).toFixed(2)
            );
            this.chartData.currentList.push(
              (Number(item.current) / 100).toFixed(2)
            );
            this.chartData.socList.push((Number(item.soc) / 100).toFixed(2));
            this.chartData.capacityList.push(
              (Number(item.capacity) / 100).toFixed(2)
            );
            this.chartData.powerTemperatureList.push(item.powerTemperature);
            this.chartData.coreTemperatureList.push(item.coreTemperature);
            this.chartData.temperatureList.push(item.temperature);
            this.chartData.diffVolList.push(
              (Number(item.diffVol) / 100).toFixed(2)
            );
          });
      }
    },

    initChart() {
      // this.chart = echarts.init(this.$el, "macarons");
      // this.chart = echarts.init(this.$refs.line, "macarons");
      this.chart = echarts.init(this.$refs.line);

      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.xAxisList,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: [
            "总电压",
            "总电流",
            "电量(%)",
            "剩余容量",
            "功率温度值",
            "电芯温度值",
            "环境温度",
            "压差",
          ],
        },
        series: [
          {
            name: "总电压",
            itemStyle: {
              normal: {
                color: "#c13834",
                lineStyle: {
                  color: "#c13834",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: this.chartData && this.chartData.voltageList,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "总电流",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#67c23a",
                lineStyle: {
                  color: "#67c23a",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData && this.chartData.currentList,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "电量(%)",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3f9eff",
                lineStyle: {
                  color: "#3f9eff",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData && this.chartData.socList,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "剩余容量",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#a1dac0",
                lineStyle: {
                  color: "#a1dac0",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData && this.chartData.capacityList,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "功率温度值",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#304553",
                lineStyle: {
                  color: "#304553",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData && this.chartData.powerTemperatureList,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "电芯温度值",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData && this.chartData.coreTemperatureList,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "环境温度",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#63a0a7",
                lineStyle: {
                  color: "#63a0a7",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData && this.chartData.temperatureList,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "压差",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#e7a23b",
                lineStyle: {
                  color: "#e7a23b",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.chartData && this.chartData.diffVolList,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },

    changeDate(e) {
      if (e && this.timeValue) {
        this.getBmsDataOperate();
      } else {
        this.chartData = {
          voltageList: [],
          currentList: [],
          socList: [],
          capacityList: [],
          powerTemperatureList: [],
          coreTemperatureList: [],
          temperatureList: [],
          diffVolList: [],
        };
      }
    },

    changeTime(e) {
      if (e && this.dateValue) {
        this.getBmsDataOperate();
      } else {
        this.chartData = {
          voltageList: [],
          currentList: [],
          socList: [],
          capacityList: [],
          powerTemperatureList: [],
          coreTemperatureList: [],
          temperatureList: [],
          diffVolList: [],
        };
      }
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);

      this.pageNum = Number(val) - 1;
      this.getBmsDataOperate();
    },

    getTimeStrByDate(date, type) {
      const y = date.getFullYear();
      const M = date.getMonth() + 1;
      const d = date.getDate();
      const H = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      let currTime = "";
      if (type === "date") {
        currTime =
          y + "-" + (M < 10 ? "0" + M : M) + "-" + (d < 10 ? "0" + d : d);
      } else {
        currTime =
          " " +
          (H < 10 ? "0" + H : H) +
          ":" +
          (m < 10 ? "0" + m : m) +
          ":" +
          (s < 10 ? "0" + s : s);
      }
      return currTime;
      // return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);
    },
  },
};
</script>

<style lang="scss" scope>
.curve__day-content {
  width: 100%;
  /* height: 370px; */
  .title {
    margin: 10px 0 20px 10px;

    color: #419fff;
  }
  .search__content {
    margin: 20px 0 30px 20px;
    .search__date {
      margin-bottom: 10px;
    }
  }
  .chart__content {
    width: 100%;
    height: 400px;
  }
  .time__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    margin-bottom: 10px;

    color: #419fff;
  }
  .pagination__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
