<template>
  <div>
    <el-input v-if="showText" v-model="location" />
    <el-button v-if="showText" type="primary" @click="addPath">数据画点</el-button>
    <baidu-map :center="centerPoint" :scroll-wheel-zoom="true" :zoom="zoom" :style="{height:height,width:width}" @click="getClickInfo">
      <bm-marker
        v-if="point.lng"
        :position="{lng:point.lng, lat: point.lat}"
        :dragging="true"
      >
        <bm-label
          :label-style="{color: 'red', fontSize : '14px'}"
          :offset="{width: 20, height: -15}"
          content="当前位置"
        />
      </bm-marker>
    </baidu-map>
  </div>

</template>

<script>
export default {
  name: 'BaiduMapPoint',
  props: {
    value: {
      type: String,
      default: undefined
    },
    center: {
      type: [Object, String],
      default: '北京'
    },
    zoom: {
      type: Number,
      default: 15
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      location: undefined,
      emitting: false,
      point: {},
      centerPoint: {}
    }
  },
  watch: {
    center: {
      immediate: true,
      handler(val) {
        this.centerPoint = val
      }
    },
    value: {
      immediate: true,
      handler(val) {
        if (this.emitting) {
          return
        }
        if (this.value) {
          this.point = JSON.parse(this.value)
          this.location = this.value
          this.centerPoint = this.point
        } else {
          this.point = {}
          this.location = undefined
        }
        console.log('this.point1', this.point)
      }
    }
  },
  created() {
  },
  methods: {
    addPath() {
      try {
        const point = JSON.parse(this.location)
        if (!Number(point.lat) || !Number(point.lat)) {
          this.$message.error('你输入的格式错误')
          return
        }
        this.point = point
        this.$emit('input', this.location)
      } catch (e) {
        this.$message.error('你输入的格式错误')
      }
    },
    getClickInfo(e) {
      this.point = e.point
      this.updateData()
    },
    updateData() {
      this.location = JSON.stringify(this.point)
      this.emitting = true
      this.$emit('input', this.location).$nextTick(() => {
        this.emitting = false
      })
    }

  }

}
</script>

<style scoped>

</style>
