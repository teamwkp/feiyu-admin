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
      <SingleVoltageView />
    </div>
    <div class="right-box">
      <div class="lx">最高电压：4.136V</div>
      <div class="lx">最低电压：4.123V</div>
      <div class="lx">压差：0.007V</div>
      <div class="lx">平均电压：4.123V</div>
    </div>
  </el-card>
</template>

<script>
// 单体电压视图
import SingleVoltageView from "./SingleVoltageView";
export default {
  data() {
    return {};
  },
  components: {
    SingleVoltageView,
  },
};
</script>

<style lang="scss" scoped>
.histogram {
  display: flex;
  min-height: 300px;
  height: calc(100vh - 650px);
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
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
