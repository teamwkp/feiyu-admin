<template>
  <div>
    <div>告警次数</div>
    <div class="list-scroll">
      <div class="left" style="margin-right: 20px">
        <div class="k">低容量报警:0次</div>
        <div class="k">充店过压报警:0次</div>
        <div class="k">电池超温报警:0次</div>
        <div class="k">放电过流报警:0次</div>
        <div class="k">电池箱内超温报警:0次</div>
        <div class="k">单体过压报警:3次</div>
        <div class="k">AFE故障报警</div>
        <div class="k">短路报警:0次</div>
      </div>
      <div class="right">
        <div class="k">功率扳超温报警:0次</div>
        <div class="k">放电欠压报警:0次</div>
        <div class="k">充电过流报警:0次</div>
        <div class="k">单电芯压差报警:0次</div>
        <div class="k">电池低温报警:0次</div>
        <div class="k">单体欠压报警:0次</div>
        <div class="k">TC/MOS故障报警:0次</div>
        <div class="k">断线故障报警:0次</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.list-scroll {
  display: flex;
  margin-top: 15px;
  .k {
    font-size: 14px;
    margin-bottom: 8px;
  }
}
</style>
