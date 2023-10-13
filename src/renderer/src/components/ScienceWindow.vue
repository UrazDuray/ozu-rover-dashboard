<script setup>
import DeepDirtIcon from "../../../../resources/icons/DeepDirtIcon.svg"

</script>

<script>
export default {
  props:{
    roverData: {},
  }
}
</script>

<template>
  <div :class="'MainClass'">
    <div class="DirtValuesDiv">
      <span class="DirtDirtTemperature">{{ roverData.DirtTemperature }} &degC</span>
      <span class="DirtHumidity">{{ roverData.DirtHumidity }} g/m<sup>3</sup></span>
      <img :src="DeepDirtIcon" alt="">
    </div>
    
  </div>
</template>

<style scoped>
.DirtValuesDiv{
  position: relative;
  /* border: 2px solid red; */
  height: 200px;
  aspect-ratio: 1;
}
.DirtValuesDiv img{
  height: 100%;
}
.DirtDirtTemperature{
  position: absolute;
  font-size: 1.5rem;
  bottom: 10px;
  left: 10px;
}
.DirtHumidity{
  position: absolute;
  font-size: 1.5rem;
  bottom: 10px;
  right: 10px;
}
</style>