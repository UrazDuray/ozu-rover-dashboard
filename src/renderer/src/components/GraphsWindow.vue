<script setup>
import ChartPlotter from './locomotion/ChartPlotter.vue'
</script>

<script>
export default {
  props: {
    roverData: {},
    roverDataHistory: {},
    sizeUpdater: Number,
  },
  computed:{
    maxGraphDataPoint(){return 100}
  },
  data() {
    return {
      series: {
        motor0: {
          current: [{
            name: 'current',
            data: [],
          }],
          temperature: [{
            name: 'temperature',
            data: [],
          }],
          speed: [{
            name: 'speed',
            data: [],
          }],
        },
        motor1: {
          current: [{
            name: 'current',
            data: [],
          }],
          temperature: [{
            name: 'temperature',
            data: [],
          }],
          speed: [{
            name: 'speed',
            data: [],
          }],
        },
        motor2: {
          current: [{
            name: 'current',
            data: [],
          }],
          temperature: [{
            name: 'temperature',
            data: [],
          }],
          speed: [{
            name: 'speed',
            data: [],
          }],
        },
        motor3: {
          current: [{
            name: 'current',
            data: [],
          }],
          temperature: [{
            name: 'temperature',
            data: [],
          }],
          speed: [{
            name: 'speed',
            data: [],
          }],
        },
      },
      //todo remove this later (old apex)
      // chartOptions: {
      //   chart: {
      //     type: 'line',
      //     zoom: {
      //       enabled: false
      //     },
      //     background: "var(--theme-color-1)",
      //     toolbar: {
      //       show: false,
      //     },
      //     animations: {
      //       enabled: false,
      //     }
      //   },
      //   dataLabels: {
      //     enabled: false
      //   },
      //   colors: ["var(--yellow)"],
      //   stroke: {
      //     curve: 'straight',
      //     width: 2,
      //   },
      //   xaxis: {
      //     type: 'numeric',
      //     labels: {
      //       show: false,
      //     },
      //     // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      //   },
      //   theme: {
      //     mode: "dark",
      //   },
      // },
      // coloredChartOptions: {},
    }
  },
  methods: {
    UpdateGraph(){
      const motorData = this.roverData.LocoMotorData
      for (let i = 0; i < Object.keys(this.series).length; i++) {
        const motor = this.series['motor' + i];

        //todo remove this later (old apex)
        // this.$refs[`ref_motor${i}_current`][0].updateSeries([{
        //   data: this.ArrayDataPusher(motor.current[0].data, (motorData[i].current).toFixed(3))
        // }])
        // this.$refs[`ref_motor${i}_temperature`][0].updateSeries([{
        //   data: this.ArrayDataPusher(motor.temperature[0].data, (motorData[i].temperature).toFixed(3))
        // }])
        // this.$refs[`ref_motor${i}_speed`][0].updateSeries([{
        //   data: this.ArrayDataPusher(motor.speed[0].data, (motorData[i].speed).toFixed(3))
        // }])

        if(this.roverData.old){
          this.ArrayDataPusher(motor.current[0].data, false)
          this.ArrayDataPusher(motor.temperature[0].data, false)
          this.ArrayDataPusher(motor.speed[0].data, false)
        }
        else{
          this.ArrayDataPusher(motor.current[0].data, (motorData[i].current).toFixed(3))
          this.ArrayDataPusher(motor.temperature[0].data, (motorData[i].temperature).toFixed(3))
          this.ArrayDataPusher(motor.speed[0].data, (motorData[i].speed).toFixed(3))
        }

      }
      // webkitRequestAnimationFrame(this.UpdateGraph);
    },
    //todo remove this later (old apex)
    // ChangeChartOptionsColor(category){
    //   const color = (() => {
    //     switch (category) {
    //       case 'current':
    //         return 'yellow'
    //       case 'temperature':
    //         return 'orange'
    //       case 'speed':
    //         return 'green'
    //       default:
    //         break;
    //     }
    //   })()

    //   return Object.assign({}, this.chartOptions, {colors: [`var(--${color})`]})
    // },
    ArrayDataPusher(arr, element){
      arr.shift()
      arr.push(element)

      //todo remove this later (old apex)
      // return arr
    },
    SetMaxGraphDataPoint(){
      for (let i = 0; i < Object.keys(this.series).length; i++) {
          const motor = this.series['motor' + i];
          motor.current[0].data = Array(this.maxGraphDataPoint).fill(0)
          motor.temperature[0].data = Array(this.maxGraphDataPoint).fill(0)
          motor.speed[0].data = Array(this.maxGraphDataPoint).fill(0)
        }
    },
    CategoryToColor(category){
      switch (category) {
        case 'current':
          return 'rgb(224, 214, 33)' //'var(--yellow)'
        case 'temperature':
          return 'rgb(224, 125, 33)' //'var(--orange)'
        case 'speed':
          return 'rgb(33, 224, 65)' //'var(--green)'
        default:
          return 'white'
      }
    },
  },
  watch:{
    roverData(){
      // webkitRequestAnimationFrame(this.UpdateGraph);
      this.UpdateGraph()
    },
  },
  mounted() {
    //set graph max data
    this.SetMaxGraphDataPoint()

    //todo remove this later (old apex)
    // this.coloredChartOptions.current = this.ChangeChartOptionsColor('current')
    // this.coloredChartOptions.temperature = this.ChangeChartOptionsColor('temperature')
    // this.coloredChartOptions.speed = this.ChangeChartOptionsColor('speed')
  },
}
</script>

<template>
  <div :class="'GraphsDiv'">
    <div class="MotorGraphsDiv" v-for="(motor, index) in series" :key="'motor' + index">
      <div class="MotorGraph" id="chart" v-for="(values, index2) in motor" :key="'motor' + index + index2">
        <!-- //todo remove this later (old apex) -->
        <!-- <apexchart :ref="`ref_${index}_${index2}`" type="line" height="100%" :options="coloredChartOptions[index2]" :series="[]"></apexchart> -->
        <ChartPlotter :sizeUpdater="sizeUpdater" :chartData="{lineColor: CategoryToColor(index2), title: `${index} ${index2}`, lineWidth: 1.5}" :key="series[index][index2][0].data" :values="series[index][index2][0].data"/>
      </div>
    </div>

  </div>
</template>

<style scoped>
.GraphsDiv{
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
.MotorGraphsDiv{
  box-sizing: border-box;
  height: 100%;
  display: flex;
  padding: 0 0;
}
.MotorGraph{
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 0.3rem;
}
</style>