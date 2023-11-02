<!--
 * @Author       : liqiao
 * @Date         : 2023-11-01 14:39:49
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-11-02 14:47:11
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/device/battery/components/histogram.vue
-->
<template>
  <el-card
    class="histogram"
    :body-style="{
      width: '100%',
      height: 'calc(100vh - 660px)',
      minHeight: '300px',
      display: 'flex',
    }"
  >
    <div class="echats-box">
      <SingleVoltageView :xAxisList="xAxisList" :yAxisList="yAxisList" />
    </div>
    <div class="right-box">
      <div class="lx">
        最高电压：{{ (coreVoltageData && coreVoltageData.maxNum) || "-" }}V
      </div>
      <div class="lx">
        最低电压：{{ (coreVoltageData && coreVoltageData.minNum) || "-" }}V
      </div>
      <div class="lx">
        压差：{{ (coreVoltageData && coreVoltageData.pressureDiffNum) || "-" }}V
      </div>
      <div class="lx">
        平均电压：{{ (coreVoltageData && coreVoltageData.avgNum) || "-" }}V
      </div>
    </div>
  </el-card>
</template>

<script>
// 单体电压视图
import SingleVoltageView from "./SingleVoltageView";
import { coreVoltageList } from "@/api/device/battery";

export default {
  data() {
    return {
      batterySn: this.$route.params && this.$route.params.devId,
      coreVoltageData: {},
      xAxisList: [],
      yAxisList: [],
    };
  },
  components: {
    SingleVoltageView,
  },

  mounted() {
    this.coreVoltageListOperate();
  },

  methods: {
    async coreVoltageListOperate() {
      const res = await coreVoltageList({
        batterySn: this.batterySn,
      });

      if (Number(res.code) === 200) {
        const list = res.data;

        const currYAxisList = list.map((item) => Number(item.value) / 1000);
        const maxNum = Math.max(...currYAxisList).toFixed(3);
        const minNum = Math.min(...currYAxisList).toFixed(3);
        const pressureDiffNum = (maxNum - minNum).toFixed(3);
        const sum = currYAxisList.reduce(
          (previous, current) => (current += previous)
        );
        const avgNum = (sum / currYAxisList.length).toFixed(3);

        this.coreVoltageData = {
          maxNum,
          minNum,
          pressureDiffNum,
          avgNum,
        };

        this.xAxisList = list.map((item) => item.key);
        this.yAxisList = currYAxisList.map((item) => {
          let obj = {};
          if (Number(item) === Number(maxNum)) {
            obj = {
              value: item,
              itemStyle: {
                color: "#eb4559",
              },
            };
          } else if (Number(item) === Number(minNum)) {
            obj = {
              value: item,
              itemStyle: {
                color: "#4185ee",
              },
            };
          } else {
            obj = {
              value: item,
              itemStyle: {
                color: "#58bd94",
              },
            };
          }

          return obj;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.histogram {
  display: flex;

  width: 100%;
  height: calc(100vh - 650px);
  min-height: 300px;
  margin-top: 10px;

  border-radius: 5px;
  .echats-box {
    width: 80%;
    height: 100%;
    margin-right: 20px;
  }
  .right-box {
    font-size: 14px;
    .lx {
      margin-bottom: 10px;
    }
  }
}
</style>
