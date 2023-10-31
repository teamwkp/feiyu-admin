<!--
 * @Author       : liqiao
 * @Date         : 2023-10-29 22:14:23
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-10-31 16:39:18
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/device/battery/components/SingleVoltageView.vue
-->

<template>
  <!-- <div :class="className" :style="{ height: height, width: width }" /> -->

  <div class="single-voltage__view">
    <div class="title">单体电压视图</div>

    <div class="content">
      <div class="bar__content" ref="bar" />
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
// import resize from "@/views/dashboard/mixins/resize";

const animationDuration = 6000;

export default {
  // mixins: [resize],

  data() {
    return {
      chart: null,
    };
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
      this.chart = echarts.init(this.$refs.bar, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "pageA",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [79, 52, 200, 334, 390, 330, 220],
            animationDuration,
          },
          {
            name: "pageB",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [80, 52, 200, 334, 390, 330, 220],
            animationDuration,
          },
          {
            name: "pageC",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: [30, 52, 200, 334, 390, 330, 220],
            animationDuration,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scope>
.single-voltage__view {
  width: 100%;
  height: 100%;
  .title {
    padding: 10px 0 20px 0;
    box-sizing: border-box;
  }
  .content {
    height: 85%;
    .bar__content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
