<script>
import { getCabinetInfo, openDoorFn, fbidDoorFn } from "@/api/device/cabinet";
import dayjs from "dayjs";
export default {
  data() {
    return {
      cabinetId: "",
      cabinetInfo: "",
      doorInfos: {},
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async open(type, item) {
      if (type == 1) {
        // 开仓
        let res = await openDoorFn({
          devId: this.cabinetId,
          boxSn: item.doorId,
        });
        if (res.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
        }
      } else if (type == 0) {
        // 禁用启用
        let res = await fbidDoorFn({
          devId: this.cabinetId,
          boxSn: item.doorId,
          status: item.doorFbStatus == 0 ? 1 : 0,
        });
        if (res.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
        }
      }
    },
    async getDetail() {
      let cabinetId = this.$route.params && this.$route.params.cabinetId;
      this.cabinetId = cabinetId;
      let res = await getCabinetInfo(cabinetId);
      if (res.code === 200) {
        this.cabinetInfo = res.data;
        if (res.data.recodeTime) {
          let time = new Date(res.data.recodeTime);
          this.cabinetInfo.recodeTime = `${time.getFullYear()}-${
            time.getMonth() + 1
          }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        }
      }
    },
    refresh() {
      this.getDetail();
      this.$message({
        message: "已刷新",
        type: "success",
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <el-card class="box-card">
      <div class="line">
        <div class="text">{{ cabinetId }}电柜信息</div>
        <div class="btnm">
          <div style="margin-right: 20px; font-size: 14px">
            {{ cabinetInfo.recodeTime }}
          </div>
          <el-button @click="refresh" size="small" icon="el-icon-refresh">
            刷新</el-button
          >
        </div>
      </div>
      <div class="first">
        <div class="show">
          <div style="margin-bottom: 10px">
            GSM信号强度：{{ cabinetInfo.gmsSignal }}
          </div>
          <div v-if="cabinetInfo.cabinetCur">
            总电流：{{ (cabinetInfo.cabinetCur / 100).toFixed(3) }}A
          </div>
          <div v-else>总电流：--</div>
        </div>
        <div class="show">
          <div style="margin-bottom: 10px">
            是否禁用：<span
              style="color: #55cf92"
              v-if="cabinetInfo.cabinetStatus === 1"
              >启用</span
            ><span v-else>禁用</span>
          </div>
          <div>温度：{{ cabinetInfo.cabinetTemp }}°C</div>
        </div>
        <div class="show">
          <div v-if="cabinetInfo.cabinetVol" style="margin-bottom: 10px">
            总电压：{{ (cabinetInfo.cabinetVol / 100).toFixed(2) }}V
          </div>
          <div v-else>总电压：--</div>
          <div>总用电量：{{ cabinetInfo.totalPower }}Kwh</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>仓门管理</span>
        </div>
      </template>
      <div class="line">
        <div></div>
        <el-button
          @click="refresh"
          circle
          size="small"
          icon="el-icon-refresh"
        />
      </div>
      <div class="door-box" v-if="cabinetInfo">
        <div
          class="door"
          v-for="(item, index) in cabinetInfo.doorInfos"
          :key="index"
        >
          <div class="top">
            <div class="num">{{ index + 1 }}</div>
            <div class="nbnt">
              <div @click="open(1, item)" class="btn1">
                <i class="el-icon-refrigerator"></i>
                <div>开仓</div>
              </div>
              <div
                v-if="item.doorFbStatus == 0"
                @click="open(0, item)"
                class="btn1"
                style="color: #55cf92"
              >
                <i class="el-icon-circle-check"></i>
                <div>启用</div>
              </div>
              <div
                v-else
                @click="open(0, item)"
                class="btn1"
                style="color: #ff4949"
              >
                <i class="el-icon-circle-close"></i>
                <div>禁用</div>
              </div>
            </div>
          </div>
          <div class="content">
            <div>电池编码：{{ item.batterySn || "--" }}</div>
            <div>
              禁用状态：<span
                v-if="item.doorFbStatus == 0"
                style="color: #ff4949"
                >禁用</span
              ><span style="color: #55cf92" v-else>正常</span>
            </div>
            <div>
              仓门状态：
              <span v-if="item.doorStatus == 0">关</span>
              <span v-else-if="item.doorStatus == 1">开</span>
              <span v-else>--</span>
            </div>
            <div>电池电量：{{ item.soc || "--" }}</div>
            <div>电池健康度：{{ item.soh || "--" }}</div>
            <div>电池串数：{{ item.coreCount || "--" }}</div>
            <div>功率温度值：{{ item.batteryPcbTemp || "--" }}°C</div>
            <div>电芯温度值：{{ item.batterySurfaceTemp || "--" }}°C</div>
            <div>环境温度：{{ item.batteryTotalTemp || "--" }}°C</div>
            <div>
              电池状态：
              <span v-if="item.batteryStatus == 0">移动</span>
              <span v-else-if="item.batteryStatus == 1">静止</span>
              <span v-else-if="item.batteryStatus == 2">存储</span>
              <span v-else-if="item.batteryStatus == 3">休眠</span>
              <span v-else>--</span>
            </div>
            <div>总放电电流：{{ item.totalDischarge || "--" }} Ah</div>
            <div>总充电电流：{{ item.totalCharge || "--" }} Ah</div>
            <div>电池总充电时长：{{ item.batteryChargingTime || "--" }}</div>
            <div>
              电池的控制：<span v-if="item.batteryControl == 1"
                >有充电电流</span
              >
              <span v-else-if="item.batteryControl == 4">没有充电电流</span>
              <span v-else>--</span>
            </div>

            <div>
              充电器电流：{{ (item.chargerCur / 100).toFixed(3) || "--" }} Ah
            </div>
            <div>
              充电器电压：{{ (item.chargerVol / 100).toFixed(3) || "--" }} V
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.door-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.door {
  width: 24%;
  margin-top: 20px;
  border: 1px solid #eee;
  .top {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    justify-content: space-between;
    .num {
      width: 30px;
      height: 30px;
      background: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .nbnt {
      display: flex;
      align-content: center;
    }
    .btn1 {
      margin-right: 10px;
      display: flex;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
      color: #409eff;
    }
    .red {
      color: #ff4949;
    }
  }
  .content {
    color: #595757;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
  }
}
.container {
  width: 100%;
  min-width: 1200px;
  .box-card {
    width: 98%;
    margin: 0 auto;
    margin-top: 20px;
    .line {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btnm {
        display: flex;
        align-items: center;
      }
      .text {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .first {
      font-size: 14px;
      width: 80%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .show {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
