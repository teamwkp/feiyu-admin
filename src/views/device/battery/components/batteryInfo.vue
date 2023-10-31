<template>
  <el-card class="battery-info">
    <div class="battery-box">
      <img class="battery" src="@/assets/images/dianchi.jpg" alt="" />
      <div class="insert"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.battery-info {
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 10px;
  .battery-box {
    position: relative;
    .battery {
      width: 100px;
    }
    .insert {
      top: 9px;
      left: 13px;
      border-radius: 3px;
      position: absolute;
      width: 60px;
      height: 37px;
      background: green;
    }
  }
}
</style>
