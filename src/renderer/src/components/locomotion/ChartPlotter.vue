<script>
export default {
  computed: {
    canvasScale(){
      return window.devicePixelRatio || 1;
    },
    gridLineCount(){
      return 5
    },
  },
  props: {
    values: Array,
    sizeUpdater: Number,
    chartData: {
      lineColor: undefined,
      lineWidth: undefined,
      title: undefined,
    },
  },
  data() {
    return {
      canvas: undefined,
      ctx: undefined,
      canvasDimensions: [0,0],
      yMin: Number,
      yMax: Number,
    }
  },
  methods: {
    DrawLine(x1, y1, x2, y2, lineColor, lineWidth){
      this.ctx.strokeStyle = lineColor ? lineColor : this.chartData.lineColor
      this.ctx.lineWidth = lineWidth ? lineWidth : this.chartData.lineWidth;
      // this.ctx.imageSmoothingEnabled = true;

      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
    },
    StrokeLine(){
      this.ctx.stroke();
    },
    ClearCanvas(){
      this.ctx.beginPath()
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    GetChartDimensions(){
      const chartDimensions = [this.$refs.ref_chart.clientWidth, this.$refs.ref_chart.clientHeight]

      this.$refs.ref_canvas.width = chartDimensions[0] * this.canvasScale
      this.$refs.ref_canvas.height = chartDimensions[1] * this.canvasScale
      this.ctx.scale(this.canvasScale, this.canvasScale)

      this.canvasDimensions = chartDimensions
    },
    GridDrawer(){
      this.ctx.beginPath()
      const yStep = this.canvasDimensions[1] / this.gridLineCount
      for (let i = 0; i < this.gridLineCount+1; i++) {
        const lineHeight = i * yStep
        this.DrawLine(0, lineHeight, this.canvasDimensions[0], lineHeight, 'rgb(140, 140, 140)', 1)
      }
      this.StrokeLine()
    },
    DrawChart(){
      this.ClearCanvas()
      this.GridDrawer()
      this.ctx.beginPath()

      const pointCount = this.values.length
      const xStepSize = this.canvasDimensions[0] / pointCount

      this.FindMinMaxInArray(this.values)
      let prevPoint = undefined
      let prevFalse = undefined

      for (let i = 0; i < pointCount; i++) {
        const value = this.values[i];
        if(value === false) {
          prevPoint = undefined
          this.StrokeLine()
          this.ctx.beginPath()
          continue
        }
        const mappedValue = this.MapToInterval(value, this.yMin, this.yMax, 0, this.canvasDimensions[1])
        const currentPoint = [xStepSize*i, this.canvasDimensions[1] - mappedValue]
        if(prevPoint == undefined) prevPoint = currentPoint
        this.DrawLine(prevPoint[0], prevPoint[1], currentPoint[0], currentPoint[1])
        prevPoint = currentPoint
      }
      this.StrokeLine()
    },
    FindMinMaxInArray(arr){
      let max = undefined
      let min = undefined
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if(el === false) continue
        if(max == undefined || el > max) max = el
        else if(min == undefined || el < min) min = el
      }
      this.yMin = min
      this.yMax = max
    },
    MapToInterval(value, min1, max1, min2, max2){
      const normalizedValue = (value - min1) / (max1 - min1);
      const mappedValue = (normalizedValue * (max2 - min2)) + min2;

      return mappedValue;
    },
    UpdateSize(){
      this.GetChartDimensions()
    }
  },
  mounted() {
    this.canvas = this.$refs.ref_canvas
    this.ctx = this.canvas.getContext("2d");

    this.canvasDimensions = [this.canvas.offsetWidth, this.canvas.offsetHeight]
    this.GetChartDimensions()
    this.DrawChart()
  },
  watch:{
    values: {
      handler() {
        this.DrawChart()
      },
      deep: true
    },
    sizeUpdater(){
      this.UpdateSize()
    }
  },
}
</script>

<template>
  <div class="ChartMain">
    <div class="Title">{{ chartData.title }} </div>
    <div class="ChartAndYAxis">
      <div class="ChartYAxis">
        <span v-for="(value, index) in gridLineCount" :key="'gridLine' + index">{{ parseFloat(MapToInterval(index, 0, gridLineCount-1, parseFloat(yMin), parseFloat(yMax))).toFixed(1) }}</span>
      </div>
      <div ref="ref_chart" :class="'ChartPlotter'">
        <canvas class="CanvasClass" ref="ref_canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>

.ChartMain{
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.Title{
  font-size: 1rem;
  width: 100%;
  text-align: center;
}
.ChartAndYAxis{
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
}
.ChartYAxis{
  height: 100%;
  width: 40px;
  box-sizing: border-box;
  border-right: 1px solid var(--font-color-light);
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
}
.ChartPlotter {
  box-sizing: border-box;
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  right: 0;
  border-bottom: 1px solid var(--font-color-light);
}
.CanvasClass{
  width: 100%;
  height: 100%;
}
</style>