<template>
  <el-card
    class="list-info"
    :body-style="{ width: '100%', display: 'flex', height: '205px' }"
  >
    <div class="module" style="width: 25%">
      <div class="title">参数信息</div>
      <div class="list-content">
        <div class="item">电池类型：三元锂</div>
        <div class="item">电池标称容量：32AH</div>
        <div class="item">电池实际容量：31AH</div>
        <div class="item">休眠等待时间：180s</div>
        <div class="item">单体过压保护：4.2V</div>
        <div class="item">单体过压保护延时：4s</div>
      </div>
    </div>
    <div class="module" style="width: 50%">
      <div class="title">当前状态</div>
      <div class="list-content" style="display: flex">
        <div style="margin-right: 60px">
          <div class="item">剩余容量：31.68AH</div>
          <div class="item">充电MOS：开启</div>
          <div class="item">均衡：开启</div>
          <div class="item">电池实际容量：31AH</div>
        </div>
        <div>
          <div class="item">当前连接状态：已连接</div>
          <div class="item">放电MOS：开启</div>
          <div class="item">电池串数：17</div>
        </div>
      </div>
    </div>
    <div class="module" style="width: 25%">
      <div class="title">实时告警</div>
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
.list-info {
  display: flex;
  width: 100%;
  border-radius: 5px;
  .module {
    .title {
      font-size: 14px;
      color: #409bcb;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .list-content {
      font-size: 14px;
      .item {
        margin-top: 5px;
      }
    }
  }
}
</style>
