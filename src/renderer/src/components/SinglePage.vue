<script>
export default {
  props:{
    sizeUpdater: Number,
  },
  computed: {
    windows() {
      return ['Lithology', 'Navigation', 'Manipulator']
      // The names of the pages are written
    }
  },
  data() {
    return {
      selectedWindow: 'Navigation', // The default page at startup
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
      // Converts the first letter of the word to uppercase.
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
        borderBottom: `2px var(--theme-color) solid`,
      }" class="SelectIndicator">
    </div>

    <div v-for="(window, index) in windows" class="navigationButtonClass" :ref="`ref_${window}`" @click="ChangeWindow(window)" :key="index">
      <!-- Displaying pages with a for loop -->
      <span class="navigationSpan" :style="{color: selectedWindow == window ? 'var(--theme-color)' : 'var(--font-color)'}">{{window}}</span>
      <!-- It adjusts the color according to the selected page. -->
    </div>
  </div>
</template>

<style scoped>
.NavigationDiv{
  background-color: var(--nav-bar-background);
  z-index: 100;
  height: var(--nav-bar-height);
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

/* animation for the change in font color of the selected button */
.navigationSpan{
  transition-duration: 200ms;
  user-select: none;
}

/* */
.SelectIndicator{
  box-sizing: border-box;
  position: absolute;
  transition-duration: 200ms;
}
</style>
