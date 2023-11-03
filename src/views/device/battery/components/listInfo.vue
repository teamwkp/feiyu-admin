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
        <div class="item">
          坐标类型：<span v-if="batteryObj && batteryObj.coordinateType == 1"
            >E/N</span
          >
          <span v-else-if="batteryObj && batteryObj.coordinateType == 2"
            >E/S</span
          ><span v-else-if="batteryObj && batteryObj.coordinateType == 3"
            >W/N</span
          ><span v-else-if="batteryObj && batteryObj.coordinateType == 4"
            >W/S</span
          >
          <span v-else-if="batteryObj && batteryObj.coordinateType == 5"
            >GPS未定位</span
          >
          <span v-else>--</span>
        </div>
        <div class="item">
          GMS信号强度：<span v-if="batteryObj">
            {{ batteryObj.gmsSignal || "0" }}
          </span>
        </div>
        <div class="item">
          速度信息：<span v-if="batteryObj">{{ batteryObj.speed }}km/h</span>
        </div>
        <div class="item">
          行驶里程：<span v-if="batteryObj"
            >{{ batteryObj.odometer || 0 }}km</span
          >
        </div>
      </div>
    </div>
    <div class="module" style="width: 50%">
      <div class="title" style="height: 10px"></div>
      <div class="list-content" style="width: 100%; display: flex">
        <div style="width: 50%">
          <div class="item" v-if="batteryObj">
            剩余容量：<span v-if="batteryObj">{{
              (batteryObj.capacity / 100).toFixed(2)
            }}</span>
            AH
          </div>
          <div class="item">
            功率温度值：<span v-if="batteryObj"
              >{{ batteryObj.powerTemperature || 0 }}°C</span
            >
          </div>
          <div class="item" v-if="batteryObj">
            电芯温度：<span v-if="batteryObj"></span
            >{{ batteryObj.coreTemperature || 0 }}°C
          </div>
          <div class="item">
            环境温度：<span v-if="batteryObj">{{
              batteryObj.temperature || 0
            }}</span
            >°C
          </div>
          <div class="item">
            总放电：<span v-if="batteryObj"
              >{{ batteryObj.totalDischarge || 0 }}Ah</span
            >
          </div>
          <div class="item">
            总充电：<span v-if="batteryObj"
              >{{ batteryObj.temperature || 0 }}Ah
            </span>
          </div>
        </div>
        <div style="width: 50%">
          <div class="item">
            循环次数：<span>{{ batteryObj.loopCount || 0 }}</span>
          </div>
          <div class="item">
            电芯串数：<span v-if="batteryObj">{{
              batteryObj.coreVoltageSeries
            }}</span>
          </div>
          <div class="item" v-if="batteryObj">
            C_FET状态：<span v-if="batteryObj.bmsCFETState == 0"> 关闭</span>
            <span v-else>开启</span>
          </div>
          <div class="item" v-if="batteryObj">
            D_FET状态：<span v-if="batteryObj.bmsDFETState == 0">关闭</span>
            <span v-else>开启</span>
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
