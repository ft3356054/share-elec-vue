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
  created() {
    // initData()  //获取参数
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
    // 获得初始化数据，获取token,userid
    initData(){
       let _this=this
       if(window.uexCore){
         uexCore.init(JSON.stringify({}),function(data){
           if(data.code=='1'){
              console.log(data.data.userId) //获取用户的id
           }
         })
       }
    }
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
