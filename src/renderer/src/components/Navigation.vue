<script>
export default {
  props:{
    sizeUpdater: Number,
  },
  computed: {
    windows() {
      return ['home', 'arm', 'science', 'camera', 'graphs','GPS' ,'test']
      // The names of the pages are written
    }
  },
  data() {
    return {
      selectedWindow: 'GPS',
      // It is stated which page will be opened first.
      selectIndicatorData: {left: 0, top: 0, height: 0, width: 0},
    }
  },
  methods: {
    ChangeWindow(windowName){
      this.$emit('WindowChange', windowName)
      //It calls the 'windows change' method and gives the currently selected page as a parameter

      this.selectedWindow = windowName
      // Makes the selected page equal to the value received as a parameter

      const el = this.$refs[`ref_${windowName}`][0]
      const elData = {left: el.offsetLeft, top: el.offsetTop, height: el.offsetHeight, width: el.offsetWidth - 2}
      this.selectIndicatorData = elData
    },
    FirstLetterUpperCase(string){
      // Converts the first letter of the word to uppercase.
      return string[0].toUpperCase() + string.slice(1)
    }
  },
  mounted() {
    this.ChangeWindow(this.selectedWindow)
    // It takes the selected page as a parameter and replaces the current page.
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
      <!-- Displaying pages with a for loop -->
      <span class="navigationSpan" :style="{color: selectedWindow == window ? 'var(--primary)' : 'var(--font-color-light)'}">{{ FirstLetterUpperCase(window) }}</span>
      <!-- It adjusts the color according to the selected page. -->
    </div>
  </div>
</template>

<style scoped>
.NavigationDiv{
  background-color: var(--theme-color-2);
  z-index: 100;
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