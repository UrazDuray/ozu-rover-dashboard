<script>
export default {
  props:{
    sizeUpdater: Number,
  },
  computed: {
    windows() {
      return ['home', 'console', 'science', 'cameras', 'graphs']
    } 
  },
  data() {
    return {
      selectedWindow: 'graphs',
      selectIndicatorData: {left: 0, top: 0, height: 0, width: 0},
    }
  },
  methods: {
    ChangeWindow(windowName){
      this.$emit('WindowChange', windowName)
      this.selectedWindow = windowName

      const el = this.$refs[`ref_${windowName}`][0]
      const elData = {left: el.offsetLeft, top: el.offsetTop, height: el.offsetHeight, width: el.offsetWidth - 2}
      this.selectIndicatorData = elData
    },
    FirstLetterUpperCase(string){
      return string[0].toUpperCase() + string.slice(1)
    }
  },
  mounted() {
    this.ChangeWindow(this.selectedWindow)
  },
  watch:{
    sizeUpdater(){
      this.ChangeWindow(this.selectedWindow)
    },
  }
}
</script>

<template>
  <div :class="'NavigationDiv'">
    <div
      :style="{
        left: selectIndicatorData.left + 'px',
        top: selectIndicatorData.top + 'px',
        height: selectIndicatorData.height + 'px',
        width: selectIndicatorData.width + 'px',
        borderBottom: `2px var(--primary) solid`,
      }" class="SelectIndicator">
    </div>

    <div v-for="(window, index) in windows" class="navigationButtonClass" :ref="`ref_${window}`" @click="ChangeWindow(window)" :key="index">
      <span class="navigationSpan" :style="{color: selectedWindow == window ? 'var(--primary)' : 'var(--font-color-light)'}">{{ FirstLetterUpperCase(window) }}</span>
    </div>
  </div>
</template>

<style scoped>
.NavigationDiv{
  background-color: var(--theme-color-2);
  
  height: var(--navigation-height);
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  
}
.navigationButtonClass{
  font-size: 1.4rem;
  box-sizing: border-box;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0;
}
.navigationSpan{
  transition-duration: 200ms;
  user-select: none;
}
.SelectIndicator{
  box-sizing: border-box;
  position: absolute;
  transition-duration: 200ms;
}
</style>