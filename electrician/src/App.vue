<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
  },
  destroyed() {
    localStorage.clear()
  },
}
</script>
<style lang="scss">
  #app{
    width: 100%;
    height: 100%;
    
  }

</style>
