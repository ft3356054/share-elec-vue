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
  mounted() {
    // this.initData()  //获取参数
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
<style lang="scss" >
body,html{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  // overflow: hidden;
}
body iframe{
  display: none !important;
  z-index: 999;
}
  #app{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }


</style>
