<!--
 * @Author       : liqiao
 * @Date         : 2023-10-29 22:14:23
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-11-12 18:38:12
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/device/battery/components/SingleVoltageView.vue
-->

<template>
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
import resize from "@/views/dashboard/mixins/resize";
import { coreVoltageList } from "@/api/device/battery";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: ["xAxisList", "yAxisList"],
  data() {
    return {
      timer: null,
    };
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    // this.coreVoltageListOperate();
    this.$nextTick(() => {
      this.initChart();
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.initChart();
      }, 30000);
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    yAxisList: {
      handler(val) {
        this.$nextTick(() => {
          this.initChart();
        });
      },
    },
  },
  methods: {
    initChart() {
      // this.chart = echarts.init(this.$refs.bar, "macarons");
      this.chart = echarts.init(this.$refs.bar);

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
            data: this.xAxisList,
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
            name: "电压",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.yAxisList,
            animationDuration,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 10,
                  },
                },
              },
            },
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
    box-sizing: border-box;
    padding: 10px 0 20px 0;
  }
  .content {
    height: 80%;
    .bar__content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
