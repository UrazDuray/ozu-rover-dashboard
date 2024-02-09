<template>
  <div>
    <img v-if="parseInt(id) < 1000" src="../../assets/imgs/ArUCO.svg" alt="ArUCO Icon" />
    <img v-else-if="parseInt(id) === 1000" src="../../assets/imgs/Hammer.svg" alt="Hammer Icon" />
    <img v-else-if="parseInt(id) === 1001" src="../../assets/imgs/Bottle.svg" alt="Bottle Icon" />
  </div>
</template>

<script>
export default {
  name: 'MarkerIcon',
  props: {
    id: {
      type: String,
      default: '0'
    }
  }
}
</script>

<style scoped>
    
</style>