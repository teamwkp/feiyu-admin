<template>
  <el-card class="battery-info">
    <div>1</div>
    <div>静止</div>
    <div>总电压</div>
    <div>电流</div>
    <div>功率</div>
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
}
</style>
