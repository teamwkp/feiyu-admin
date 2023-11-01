<template>
  <el-card
    class="list-info"
    :body-style="{ width: '100%', display: 'flex', height: '205px' }"
  >
    <div class="module" style="width: 25%">
      <div class="title">参数信息</div>
      <div class="list-content">
        <div class="item">电池类型：{{ "--" }}</div>
        <div class="item">电池标称容量：--AH</div>
        <div class="item">电池实际容量：--AH</div>
        <div class="item">休眠等待时间：--s</div>
        <div class="item">单体过压保护：--V</div>
        <div class="item">单体过压保护延时：--s</div>
      </div>
    </div>
    <div class="module" style="width: 50%">
      <div class="title">当前状态</div>
      <div class="list-content" style="display: flex">
        <div style="margin-right: 60px">
          <div class="item" v-if="batteryObj">
            剩余容量：{{ batteryObj.capacity }}AH
          </div>
          <div class="item">充电MOS：开启</div>
          <div class="item" v-if="batteryObj">
            均衡：{{ batteryObj.equilibriumSign }}
          </div>
          <div class="item">电池实际容量：{{ "--" }}AH</div>
        </div>
        <div>
          <div class="item">当前连接状态：{{ "--" }}</div>
          <div class="item">放电MOS：{{ "--" }}</div>
          <div class="item" v-if="batteryObj">
            电池串数：{{ batteryObj.coreVoltageSeries }}
          </div>
        </div>
      </div>
    </div>
    <div class="module" style="width: 25%">
      <div class="title">实时告警</div>
      <div v-if="batteryObj">{{ batteryObj.bmsAlarm }}</div>
    </div>
  </el-card>
</template>

<script>
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
