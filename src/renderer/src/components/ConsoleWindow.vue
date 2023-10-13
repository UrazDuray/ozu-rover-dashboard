<script>
export default {
  props: {
    consoleLogs: Array,
  },
  data() {
    return {
      scrollLock: false,
    }
  },
  methods: {
    SendCommand(){
      const command = this.$refs.ref_commandInput.value
      console.log(command)
    },
    ScrollHandler(){
      if(this.$refs.ref_LogsDiv.scrollTop + this.$refs.ref_LogsDiv.clientHeight + 10 >= this.$refs.ref_LogsDiv.scrollHeight) this.scrollLock = true
      else this.scrollLock = false

      console.log(this.scrollLock)
    },
    ScrollLocker(){
      this.$refs.ref_LogsDiv.scrollTop = this.$refs.ref_LogsDiv.scrollHeight
    }
  },
  mounted () {
    this.$refs.ref_LogsDiv.addEventListener('scroll', this.ScrollHandler);
  },
  destroyed() {
    this.$refs.ref_LogsDiv.removeEventListener('scroll', this.ScrollHandler);
  },
  watch: {
    consoleLogs() {
      
      if(this.scrollLock) this.ScrollLocker() 
    }
  }
}
</script>

<template>
  <div ref="ref_LogsDiv" class="LogsDiv">
    <span class="logSpan" v-for="(log, index) in consoleLogs" :key="`log${index}`">{{ log }}</span>
  </div>
  <div class="LogInputDiv">
    <span class="LogInputArrow">></span>
    <input @keyup.enter="SendCommand" type="text" ref="ref_commandInput" class="LogInput"/>
    <button @click="SendCommand" class="LogInputSendButton">Send</button>
  </div>
</template>

<style scoped>
.LogsDiv{
  /* border: 2px solid red; */
  box-sizing: border-box;
  height: calc(100% - 3rem - 1px);
  overflow-y: auto;
}
.LogInputDiv{
  display: flex;
  background-color: var(--theme-color-2);
  align-items: center;
  position: relative;
  border-top: 1px solid var(--font-color-light);
  box-sizing: border-box;
}
.LogInput{
  border: none;
  margin: 0;
  padding: 0;
  font-size: 1.8rem;
  width: 100%;
  height: 3rem;
  background-color: var(--theme-color-2);
  outline: none;
}
.LogInputArrow{
  font-size: 1.8rem;
  margin: 0 0.4rem;
  color: var(--primary);
}
.LogInputSendButton{
  font-size: 1.2rem;
  height: 3rem;
  margin: 0;
  padding: 0 0.6rem 0 0.6rem;
  background-color: transparent;
  border: none;
  border-left: 1px solid var(--font-color-light);
  outline: none;
  cursor: pointer;
}
.logSpan{
  display: block;
}
</style>