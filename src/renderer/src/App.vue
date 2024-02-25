<script setup>
import SinglePage from './components/SinglePage.vue';
import ScienceWindow from './components/ScienceWindow.vue';
import GPSWindow from './components/GPSWindow.vue';
import ArmPreviewWindow from "./components/ArmPreviewWindow.vue"
import URDFManipulator from "./urdfScripts/urdf-manipulator-element"
customElements.define('urdf-viewer', URDFManipulator);
</script>

<script>
export default {
  data() {
    return {
      activeWindow: 'Navigation',
      sizeUpdater: 0,
    }
  },
  methods: {
    SetMode(mode){
      this.activeWindow = mode
    },
    WindowResize(){
      this.sizeUpdater++
    }
  },
  created() {
    window.addEventListener("resize", this.WindowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.WindowResize);
  },
}
</script>

<template>
  <SinglePage :size-updater="sizeUpdater" @WindowChange="(window) => SetMode(window)"/>
  <div class="window">
    <ScienceWindow :roverData="roverData" v-if="activeWindow == 'Lithology'"/>
    <GPSWindow v-else-if="activeWindow=='Navigation'"/>
    <ArmPreviewWindow v-else-if="activeWindow=='Manipulator'" />
  </div>
</template>

<style>
:root{
  /* Colour and Shape Variables for Customization */
  --nav-bar-background: rgb(15, 15, 15);
  --nav-bar-height: 40px;
  --font-color: rgb(236, 236, 236);
  --theme-color: rgb(255, 0, 136);
}

*{
  color: var(--font-color-light);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: var(--nav-bar-background);
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
.window{
  height: calc(100vh - var(--navigation-height));
}
</style>
