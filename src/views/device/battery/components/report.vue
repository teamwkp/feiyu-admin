<template>
  <div>
    <div>告警次数</div>
    <div class="list-scroll">
      <div class="left" style="margin-right: 30px">
        <div class="k">单体过压次数:0次</div>
        <div class="k">整体过压次数:0次</div>
        <div class="k">充电过流次数:0次</div>
        <div class="k">充电保护次数:0次</div>
        <div class="k">充电过量次数:0次</div>
        <div class="k">短路保护次数:3次</div>
      </div>
      <div class="right">
        <div class="k">单体欠压次数:0次</div>
        <div class="k">整体欠压次数:0次</div>
        <div class="k">放电过流次数:0次</div>
        <div class="k">放电保护次数:0次</div>
        <div class="k">充电低温次数:0次</div>
        <div class="k">放电低温次数:0次</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGaojing } from "@/api/device/battery.js";
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
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await getGaojing();
      if (res.code == 0) {
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-scroll {
  display: flex;
  margin-top: 15px;
  .k {
    font-size: 14px;
    margin-bottom: 15px;
  }
}
</style>
