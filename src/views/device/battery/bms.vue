<template>
  <div class="container">
    <div class="header">
      <div class="tab">
        <div
          @click="changeActive('realTime')"
          class="label"
          :style="activeTab == 'realTime' ? `color:${color};` : ''"
        >
          实时监测
        </div>
        <div class="line">/</div>
        <div
          @click="changeActive('map')"
          :style="activeTab == 'map' ? `color:${color};` : ''"
          class="label"
        >
          地图定位
        </div>
      </div>
    </div>
    <div class="line2 header">
      <div class="tab">
        <div style="margin-right: 15px">imsi：--</div>
        <div>电池编号：{{ batterySn }}</div>
      </div>
      <div class="tab">
        更新时间：<span :style="`color:${color}`"> {{ nowTime }}</span>
      </div>
      <div class="tab">
        固件版本：<span v-if="batteryObj">{{ batteryObj.hardVersion }}</span>
      </div>
      <div class="tab">
        软件版本：<span v-if="batteryObj">{{ batteryObj.softVersion }}</span>
      </div>
      <el-button size="small" type="primary" icon="el-icon-refresh"
        >刷新</el-button
      >
    </div>
    <realTime
      :batteryObj="batteryObj"
      v-if="activeTab == 'realTime'"
    ></realTime>

    <el-row
      v-if="activeTab == 'map'"
      style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
    >
      <bMap></bMap>
    </el-row>
  </div>
</template>
<script>
import dayjs from "dayjs";
import realTime from "./components/realTime.vue";
import bMap from "./components/map.vue";
import { getBmsInfo } from "@/api/device/battery";

export default {
  data() {
    return {
      activeTab: "realTime",
      nowTime: "--",
      color: "#0DC191",
      batterySn: "",
      batteryObj: null,
    };
  },
  components: {
    realTime,
    bMap,
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    changeActive(val) {
      this.activeTab = val;
    },
    async getInfo() {
      let batterySn = this.$route.params && this.$route.params.devId;
      console.log("sn", batterySn);
      this.batterySn = batterySn;

      let res = await getBmsInfo(batterySn);
      console.log("res", res);
      if (res.code == 200) {
        this.batteryObj = res.data;
        this.nowTime = dayjs(this.batteryObj.recodeTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    },
  },
};
</script>
<style lang="scss">
.container {
  width: 100%;
  min-width: 1200px;
  .header {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    .tab {
      display: flex;
      align-items: center;
      cursor: pointer;
      .label {
        color: #555;
        font-weight: bold;
      }
      .line {
        margin: 0 10px;
      }
    }
  }
  .line2 {
    padding: 0 30px;
    height: 60px;
    margin-top: 10px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
}
</style>
