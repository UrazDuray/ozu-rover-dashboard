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
  <div :class="'MainClass'" v-if = "roverData != undefined ? roverData : 0">
    
  </div>
</template>

<style scoped>

</style>