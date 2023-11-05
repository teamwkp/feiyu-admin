<template>
  <div class="realTime-wrap">
    <div class="left-box">
      <div class="module-info">
        <battery-info :batteryObj="batteryObj" />
        <listInfo :batteryObj="batteryObj" />
        <histogram />
      </div>
    </div>
    <div class="right-box">
      <el-card>
        <CurveTheDayView />
      </el-card>
      <el-card class="report-box">
        <Report />
      </el-card>
    </div>
  </div>
</template>

<script>
import batteryInfo from "./batteryInfo.vue";
import histogram from "./histogram.vue";
import listInfo from "./listInfo.vue";
import CurveTheDayView from "./CurveTheDayView";
import Report from "./report.vue";

export default {
  data() {
    return {};
  },
  props: {
    batteryObj: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    batteryInfo,
    listInfo,
    histogram,
    CurveTheDayView,
    Report,
  },
};
</script>

<style lang="scss" scoped>
.realTime-wrap {
  display: flex;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 15px;
  .left-box {
    width: 65%;

    border-radius: 5px;
  }
  .right-box {
    width: 34.5%;
    /* height: calc(100vh - 45px); */
    max-height: 1063px;

    border-radius: 5px;
    .report-box {
      min-height: 300px;
      margin-top: 10px;
    }
  }
}
</style>
