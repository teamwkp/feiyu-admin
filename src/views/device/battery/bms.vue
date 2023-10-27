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
        更新时间：<span :style="`color:${color}`"> {{ nowTime }}</span>
      </div>
    </div>
    <realTime v-if="activeTab == 'realTime'"></realTime>
    <bMap v-if="activeTab == 'map'"></bMap>
  </div>
</template>
<script>
import dayjs from "dayjs";
import realTime from "./components/realTime.vue";
import bMap from "./components/map.vue";
export default {
  data() {
    return {
      activeTab: "realTime",
      nowTime: "--",
      color: "#71e2a3",
    };
  },
  components: {
    realTime,
    bMap,
  },
  mounted() {
    this.nowTime = dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
  },
  methods: {
    changeActive(val) {
      this.activeTab = val;
    },
  },
};
</script>
<style lang="scss">
.container {
  width: 100%;
  .header {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    .tab {
      display: flex;
      align-items: center;
      font-size: 14px;
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
    height: 60px;
    margin-top: 10px;
    border-top: 1px solid #eee;
  }
}
</style>
