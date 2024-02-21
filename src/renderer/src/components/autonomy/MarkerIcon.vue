<template>
  <div>
    <img class="ArUCO" v-if="parseInt(id) < 1000" src="../../assets/imgs/ArUCO.svg" alt="ArUCO Icon"/>
    <img v-else-if="parseInt(id) === 1000" src="../../assets/imgs/Hammer.svg" alt="Hammer Icon" />
    <img v-else-if="parseInt(id) === 1001" src="../../assets/imgs/Bottle.svg" alt="Bottle Icon" />
  </div>
</template>

<script>
export default {
  name: 'MarkerIcon',
  props: {
    id: {
      type: Number,
      default: '0'
    }
  }
}
</script>

<style scoped>
    img{
        width: 7rem;
        height: 8rem;
    }
    .ArUCO{
        width: 5rem;
        height: 6.4rem;
        margin-left: 2rem;
        
    }
</style>