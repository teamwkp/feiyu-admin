<template>
  <el-card
    class="list-info"
    :body-style="{ width: '100%', display: 'flex', height: '205px' }"
  >
    <div class="module" style="width: 25%">
      <div class="title">参数信息</div>
      <div class="list-content">
        <div class="item">
          电池类型：<span v-if="batteryObj">
            {{ batteryObj.batteryStatus == 1 ? "三元" : "铁锂" }}
          </span>
        </div>
        <div class="item">电池标称容量：--AH</div>
        <div class="item">电池实际容量：--AH</div>
        <div class="item">休眠等待时间：--s</div>
        <div class="item">单体过压保护：--V</div>
        <div class="item">单体过压保护延时：--s</div>
      </div>
    </div>
    <div class="module" style="width: 50%">
      <div class="title" style="height: 20px"></div>
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
      <div class="list-content" style="display: flex">
        <div style="margin-right: 60px">
          <div class="item">
            DUT故障：
            <div v-if="batteryObj">
              <span v-if="batteryObj.dtuError == '1'">GPS信号异常</span>
              <span v-if="batteryObj.dtuError == '2'">GSM信号异常</span>
              <span v-else>--</span>
            </div>
          </div>
          <div class="item">
            BMS故障：
            <div v-if="batteryObj">
              <span v-if="batteryObj.bmsError == '00'">短路保护</span>
              <span v-if="batteryObj.bmsError == '01'">单芯欠压保护</span>
              <span v-if="batteryObj.bmsError == '02'">单芯过压保护</span>
              <span v-if="batteryObj.bmsError == '03'">放电过流保护</span>
              <span v-if="batteryObj.bmsError == '04'">充电过流保护</span>
              <span v-if="batteryObj.bmsError == '05'">低温保护</span>
              <span v-if="batteryObj.bmsError == '06'">过温保护</span>
              <span v-if="batteryObj.bmsError == '07'">状态异常保护</span>
              <span v-if="batteryObj.bmsError == '08'">MOS异常</span>
              <span v-if="batteryObj.bmsError == '09'">总电压过压保护</span>
              <span v-if="batteryObj.bmsError == '10'">总电压欠压保护</span>
              <span v-if="batteryObj.bmsError == '11'">单芯间压差过大</span>
              <span v-else>--</span>
            </div>
          </div>
          <div class="item">
            BMS告警：
            <div v-if="batteryObj">
              <span v-if="batteryObj.bmsAlarm == '00'">单芯电压低告警</span>
              <span v-if="batteryObj.bmsAlarm == '01'">单芯电压高告警</span>
              <span v-if="batteryObj.bmsAlarm == '02'">电芯低温告警</span>
              <span v-if="batteryObj.bmsAlarm == '03'">电芯高温告警</span>
              <span v-if="batteryObj.bmsAlarm == '04'">总电压高告警</span>
              <span v-if="batteryObj.bmsAlarm == '05'">总电压低告警</span>
              <span v-if="batteryObj.bmsAlarm == '06'">单芯压差过大告警</span>
              <span v-if="batteryObj.bmsAlarm == '07'">MOS高温告警</span>
              <span v-if="batteryObj.bmsAlarm == '08'">环境低温告警</span>
              <span v-if="batteryObj.bmsAlarm == '09'">环境高温告警</span>
              <span v-else>--</span>
            </div>
          </div>
        </div>
      </div>
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
        display: flex;
        align-content: center;
      }
    }
  }
}
</style>
