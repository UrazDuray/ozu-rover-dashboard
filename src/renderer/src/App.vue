<script setup>
import Navigation from './components/Navigation.vue';
import HomeWindow from './components/HomeWindow.vue';
import ArmWindow from './components/ArmWindow.vue';
import CameraWindow from './components/CameraWindow.vue';
import ScienceWindow from './components/ScienceWindow.vue';
import GraphsWindow from './components/GraphsWindow.vue';
import GPSWindow from './components/GPSWindow.vue';
import TestWindow from './components/TestWindow.vue';
</script>

<script>


export default {
  computed: {
    maxHistoryLength(){ return 100 },
    maxConsoleLogsLength(){ return 100 },
  },
  data() {
    return {
      activeWindow: 'home',
      roverData: undefined,
      roverDataHistory: [],
      sizeUpdater: 0,
      dataLatency: 0,
      dataLatencyColor: 'var(--font-color-light)',
      consoleLogs: [],
      prevRoverTime: 0,
    }
  },
  methods: {
    HandleRoverData(roverData){
      //
      if(roverData.timestamp > this.prevRoverTime){
        this.roverData = roverData
        this.prevRoverTime = roverData.timestamp
      }
      else{
        roverData.old = true
        this.roverData = roverData
      }

      this.roverDataHistory.push(this.roverData)

      //prevent memory leak
      if(this.roverDataHistory.length > this.maxHistoryLength) this.roverDataHistory.shift()
      //todo şu an sadece bi tane siliyo maxa kadar silmeli
      // if(this.consoleLogs.length > this.maxConsoleLogsLength) this.consoleLogs.shift()

      this.consoleLogs = this.consoleLogs.concat(this.roverData.consoleLogs)

      this.dataLatency = this.LatencyCalculator(this.roverData.timestamp)
    },
    SetMode(mode){
      this.activeWindow = mode
    },
    Ran(min, max){
      return this.$GeneralFunctions.RandomGenerator(min, max)
    },
    WindowResize(){
      this.sizeUpdater++
    },
    ReceivedIpcRendererMessage(msg) {
      this.HandleRoverData(msg)
    },
    LatencyCalculator(timestamp){
      const latency = Date.now() - timestamp
      this.dataLatencyColor = (() => {
        if (latency > 1000) {
          return 'var(--red)'
        }
        else if(latency > 500){
          return 'var(--orange)'
        }
        else if(latency > 250){
          return 'var(--yellow)'
        }
        else {
          return 'var(--green)'
        }
      })()
      return latency
    },
  },
  mounted(){
    // this.$GeneralFunctions.fpsMeter()
  },
  created() {
    window.addEventListener("resize", this.WindowResize);
    //receive ipc renderer
    ipcRenderer.receive('electron-vue-rover-data', (response) => {
      const data = JSON.parse(response)
      this.ReceivedIpcRendererMessage(data);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.WindowResize);
  },
}
</script>

<template>
  <span :style="{color: dataLatencyColor}" class="latencySpan">{{ dataLatency }}</span>
  <Navigation :size-updater="sizeUpdater" @WindowChange="(window) => SetMode(window)"/>
  <div class="WindowsDivClass">
    <HomeWindow v-if="activeWindow == 'home' && roverData" :roverData="roverData"/>
    <ArmWindow v-else-if="activeWindow == 'arm'"/>
    <CameraWindow v-else-if="activeWindow == 'camera'"/>
    <ScienceWindow :roverData="roverData" v-else-if="activeWindow == 'science'"/>
    <GraphsWindow :size-updater="sizeUpdater" :roverData="roverData" v-else-if="activeWindow == 'graphs'"/>
    <GPSWindow v-else-if="activeWindow=='GPS'"/>
    <TestWindow v-else-if="activeWindow=='test'"/>
  </div>
</template>

<style>
:root{
  --theme-color-1: rgb(15, 15, 15);
  --theme-color-2: rgb(37, 37, 37);
  --font-color-light: rgb(236, 236, 236);

  --primary: rgb(9, 97, 43);
  --green: rgb(33, 224, 65);
  --red: rgb(224, 33, 33);
  --yellow: rgb(224, 214, 33);
  --orange: rgb(224, 125, 33);
  --navigation-height: 40px;
}

*{
  color: var(--font-color-light);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: var(--theme-color-1);
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.WindowClass{
  width: 100%;
  height: calc(100vh - var(--navigation-height));
  position: relative;
}

*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 4px;
}

</style>

<style scoped>
.WindowsDivClass{
  height: calc(100vh - var(--navigation-height));
}
.latencySpan{
  position: fixed;
  top: 2px;
  left: 2px;
  z-index: 5;
}
.latencySpan::after{
  content: 'ms';
}
</style>
