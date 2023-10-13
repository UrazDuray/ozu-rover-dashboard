<!-- 
  Component Made By Uraz Duray
 -->
<script>
export default {
  props:{
    data: {
      initialModeIndex: Number,
      modes: [],
      backgroundColor: String,
      borderColor: String,
      borderSize: Number,

      indicatorBackgroundColor: String,
      indicatorBorderColor: String,
      indicatorBorderSize: Number,
    }
  },
  data() {
    return {
      selectIndicatorData: {left: 0, top: 0, height: 0, width: 0},
    }
  },
  methods:{
    SwitchTo(index){
      const el = this.$refs[`ref_switch${index}`][0]
      const elData = {left: el.offsetLeft - 5, top: el.offsetTop, height: el.offsetHeight, width: el.offsetWidth + 10}
      this.selectIndicatorData = elData
    }
  },
  mounted() {
    this.SwitchTo(this.data.initialModeIndex)
  },
}
</script>

<template>
  <div :style="{backgroundColor: data.backgroundColor, border: `${data.borderSize}px ${data.borderColor} solid`}" :class="'SwitchDiv'">
    <div
      :style="{
        left: selectIndicatorData.left + 'px',
        top: selectIndicatorData.top + 'px',
        height: selectIndicatorData.height + 'px',
        width: selectIndicatorData.width + 'px',
        backgroundColor: data.indicatorBackgroundColor, 
        border: `${data.indicatorBorderSize}px ${data.indicatorBorderColor} solid`,
      }" class="SelectIndicator"></div>
    <span v-for="(item, index) in data.modes" @click="SwitchTo(index)" :ref="`ref_switch${index}`" :key="index" class="SwitchSpan">{{ item }}</span>
  </div>
</template>

<style scoped>
.SwitchDiv {
  background-color: red;
  border-radius: 2rem;
  padding: 0 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}
.SwitchSpan{
  font-size: 1.5rem;
  padding: 10px 15px;
  user-select: none;
  cursor: pointer;
  z-index: 2;
}
.SelectIndicator{
  position: absolute;
  border-radius: 2rem;
  background-color: blue;
  width: 30px;
  height: 30px;
  transition-duration: 200ms;
  z-index: 1;
  box-sizing: border-box;
}
</style>