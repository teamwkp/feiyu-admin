<!--
 * @Author       : liqiao
 * @Date         : 2023-10-29 21:41:37
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-10-31 14:48:15
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/device/battery/components/realTime.vue
-->
<template>
  <div class="realTime-wrap">
    <div class="left-box">
      <div class="module-info">
        <battery-info />
        <listInfo />
        <histogram />
        <SingleVoltageView />
      </div>
    </div>
    <div class="right-box">
      <CurveTheDayView />
    </div>
  </div>
</template>

<script>
import batteryInfo from "./batteryInfo.vue";
import histogram from "./histogram.vue";
import listInfo from "./listInfo.vue";
import CurveTheDayView from "./CurveTheDayView";
import SingleVoltageView from "./SingleVoltageView";

export default {
  data() {
    return {};
  },
  components: {
    batteryInfo,
    listInfo,
    histogram,
    CurveTheDayView,
    SingleVoltageView,
  },
};
</script>

<style lang="scss" scoped>
.realTime-wrap {
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .left-box {
    width: 69.3%;
    border-radius: 5px;
  }
  .right-box {
    width: 30%;
    height: calc(100vh - 45px);
    max-height: 1063px;
    border-radius: 5px;
    border: 1px solid #eee;
  }
}
</style>
