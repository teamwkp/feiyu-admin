<template>
  <el-card
    class="battery-info"
    :body-style="{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    }"
  >
    <div class="battery-box">
      <img class="battery" src="@/assets/images/dianchi.jpg" alt="" />
      <div
        v-if="batteryObj && batteryObj.soc > 0"
        class="insert"
        :style="`width:${120 * (batteryObj.soc / 100)}px`"
      ></div>
      <div v-else class="insert" style="width: 0"></div>
      <div v-if="batteryObj" class="insertText">SOC：{{ batteryObj.soc }}%</div>
    </div>
    <div>
      <div class="text itemi" v-if="batteryObj && batteryObj.motionState == 0">
        运动状态：<span style="color: #888">移动</span>
      </div>
      <div
        class="text itemi"
        v-else-if="batteryObj && batteryObj.motionState == 1"
      >
        运动状态：<span style="color: #888">静止</span>
      </div>
      <div
        class="text itemi"
        v-else-if="batteryObj && batteryObj.motionState == 2"
      >
        运动状态：<span style="color: #888">存储</span>
      </div>
      <div class="text itemi" v-if="batteryObj && batteryObj.motionState == 3">
        运动状态：<span style="color: #888">休眠</span>
      </div>
      <div class="text itemi" v-if="batteryObj">
        联网状态：<span style="color: #888" v-if="batteryObj.lineStatus === 0"
          >离线</span
        >
        <span style="color: #888" v-if="batteryObj.lineStatus === 1">在线</span>
      </div>
      <div class="text itemi" v-if="batteryObj">
        充电状态：<span style="color: #888" v-if="batteryObj.chargeState === 0"
          >放电状态</span
        >
        <span style="color: #888" v-if="batteryObj.chargeState === 1"
          >充电状态</span
        >
        <span style="color: #888" v-if="batteryObj.chargeState === 2">
          负载在位状态
        </span>
        <span style="color: #888" v-if="batteryObj.chargeState === 3">
          充电在位状态
        </span>
        <span style="color: #888" v-if="batteryObj.chargeState === 4">
          空载状态
        </span>
      </div>
    </div>

    <div class="icons-box">
      <div class="img-box">
        <img class="iconpng" src="@/assets/images/电压.png" alt="" />
      </div>

      <div>总电压V</div>
      <div class="subtext" v-if="batteryObj">
        {{ (batteryObj.voltage / 100).toFixed(2) || 0 }}
      </div>
    </div>
    <div class="icons-box">
      <div class="img-box">
        <img class="iconpng" src="@/assets/images/电流.png" alt="" />
      </div>

      <div>电流A</div>
      <div class="subtext" v-if="batteryObj">
        {{ (batteryObj.current / 100).toFixed(2) || 0 }}
      </div>
    </div>
    <div class="icons-box">
      <div class="img-box">
        <img class="iconpng" src="@/assets/images/功率.png" alt="" />
      </div>

      <div>功率W</div>
      <div class="subtext" v-if="batteryObj">
        {{
          ((batteryObj.voltage / 100) * (batteryObj.current / 100)).toFixed(2)
        }}
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
.iconpng {
  width: 35px;
}
.battery-info {
  width: 100%;
  display: flex;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 10px;
  .battery-box {
    position: relative;
    .battery {
      width: 180px;
    }
    .insert {
      top: 17px;
      left: 24px;
      border-radius: 3px;
      position: absolute;
      height: 66px;
      background: #0dc191;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
    }
    .insertText {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }
  .text {
    font-size: 14px;
  }
  .icons-box {
    width: 105px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    .img-box {
      width: 50px;
      height: 50px;
      border: 1px solid #eee;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
    }
  }
}
.subtext {
  color: #0dc191;
  font-size: 16px;
  margin-top: 8px;
}
.itemi {
  margin-bottom: 10px;
}
</style>
