<!--
 * @Author       : liqiao
 * @Date         : 2023-10-29 22:14:04
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-10-31 17:22:04
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/device/battery/components/CurveTheDayView.vue
-->

<template>
  <div class="curve__day-content">
    <div class="title">当日曲线</div>
      <div ref="line" class="chart__content" />

    <div class="pagination__content">
      <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
    </div>



    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

export default {
  props: {
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chart: null,
      chartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145],
      },
    };
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
    initChart() {
      // this.chart = echarts.init(this.$el, "macarons");
      this.chart = echarts.init(this.$refs.line, "macarons");

      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
          data: ["expected", "actual"],
        },
        series: [
          {
            name: "expected",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "actual",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scope>
.curve__day-content {
  width: 100%;
  height: 370px;
  .title {
      margin: 10px 0 20px 10px;

      color: #419fff;
    }
  .chart__content {
    width: 100%;
    height: 300px;
  }
  .pagination__content{
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
