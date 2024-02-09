<script setup>
import RoverIcon from '../../../../resources/icons/RoverIcon.svg'
import Switch from '../components/Switch.vue'
import NoConnectionIcon from '../../../../resources/icons/NoConnectionIcon.png'
import ConnectionIcon from '../../../../resources/icons/ConnectionIcon.png'
import BatteryIcon from '../../../../resources/icons/BatteryIcon.svg'
import ChartPlotter from '../components/locomotion/ChartPlotter.vue'
// Pages are imported here
</script>

<script>
export default {
  computed:{
    LocoMotorDataMargin(){
      return 10
    },
  },
  props:{
    roverData: {},
  },
  data() {
    return {
      initialModeIndex: 0
    }
  },
  methods: {
    CurrentIndexToPos(index){
      switch (index) {
        case 0:
          return {top: 0, left: this.LocoMotorDataMargin + 'px'}
        case 1:
          return {top: 0, right: this.LocoMotorDataMargin + 'px'}
        case 2:
          return {bottom: 0, left: this.LocoMotorDataMargin + 'px'}
        case 3:
          return {bottom: 0, right: this.LocoMotorDataMargin + 'px'}
        default:
          break;
        }
      },
    }
}
</script>

<template>
  <div :class="['WindowClass', 'HomeWindowDiv']" v-if="roverData != undefined ? roverData:0">
    <div class="topInfo">
      <Switch
        class="switchClass"
        :data="{
          modes: ['idle', 'autonomus', 'drive'],
          initialModeIndex: roverData.InitialModeIndex,
          backgroundColor: 'var(--theme-color-2)',
          borderColor: 'transparent',
          borderSize: 0,
          indicatorBackgroundColor: 'transparent',
          indicatorBorderColor: 'var(--primary)',
          indicatorBorderSize: 2,
        }
      "/>
      <div style="width: 0;">
        <img class="ConnectionImg" :src="roverData.Connected ? ConnectionIcon : NoConnectionIcon" alt="">
      </div>
    </div>
    <div class="BatteryInfo">
      <div class="BatteryIconTip"></div>
      <span>{{ roverData.BatteryVoltage + 'V' }}</span>
    </div>
    
    <div class="CenterDiv">
      <div class="WheelSideDiv">
        <div class="WheelSideDivDiv">
          <span class="LocoMotorCurrent">{{ roverData.LocoMotorData[0].current.toFixed(3) }}A</span>
          <span class="LocoMotorTemperature">{{ roverData.LocoMotorData[0].temperature.toFixed(3) }}&deg;C</span>
        </div>
        <div class="WheelSideDivDiv">
          <span class="LocoMotorCurrent">{{ roverData.LocoMotorData[1].current.toFixed(3) }}A</span>
          <span class="LocoMotorTemperature">{{ roverData.LocoMotorData[1].temperature.toFixed(3) }}&deg;C</span>
        </div>
      </div>
      <img :src="RoverIcon" class="RoverImage" alt="Rover icon didn't load">
      <div class="WheelSideDiv">
        <div class="WheelSideDivDiv">
          <span class="LocoMotorCurrent">{{ roverData.LocoMotorData[2].current.toFixed(3) }}A</span>
          <span class="LocoMotorTemperature">{{ roverData.LocoMotorData[2].temperature.toFixed(3) }}&deg;C</span>
        </div>
        <div class="WheelSideDivDiv">
          <span class="LocoMotorCurrent">{{ roverData.LocoMotorData[3].current.toFixed(3) }}A</span>
          <span class="LocoMotorTemperature">{{ roverData.LocoMotorData[3].temperature.toFixed(3) }}&deg;C</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.HomeWindowDiv{
  /* border: red 2px solid; */
  box-sizing: border-box;
}
.CenterDiv{
  /* border: 2px solid blue; */
  box-sizing: border-box;
  height: 40%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 30%);
  left: calc(50vw - 25%);
}
.RoverImage{
  height: 100%;
}
.WheelSideDiv{
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  display: flex;
  margin: 0 2rem;
  font-size: 2rem;
}
.WheelSideDivDiv{
  display: flex;
  flex-direction: column;
}
.LocoMotorCurrent{
  color: var(--orange);
}
.LocoMotorTemperature{
  color: var(--yellow);
}
.switchClass{
  width: fit-content;
}
.ConnectionImg{
  height: 3rem;
  margin-left: 1rem;
  transform: translateY(0.2rem);
}
.topInfo{
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.BatteryInfo{
  border: 2px solid var(--green);
  box-sizing: border-box;
  border-radius: 6px;
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 85px;
  font-size: 1.4rem;
}
.BatteryInfo img{
  height: 100%;
  position: absolute;
}
.BatteryIconTip{
  border: 2px solid var(--green);
  height: 60%;
  width: 6px;
  position: absolute;
  border-radius: 0 6px 6px 0;
  left: 100%;
}
</style>