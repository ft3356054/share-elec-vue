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
      isRouterAlive:true,
      path:"ws://localhost:8083/websocketserver/",
      messages:""
    }
  },
  mounted () {
     this.WebSocketTest()
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
     WebSocketTest(){
         if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                var uid = "123";
                this.socket = new WebSocket(this.path+uid)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
//                 console.log(this.socket)
            }
    },
    open: function () {
            console.log("socket连接成功")
        },
    error: function () {
        console.log("连接错误")
    },
    getMessage: function (msg) {   //content
//         console.log(msg)
        let obj=JSON.parse(msg.data) 
        // console.log(obj.content)
        this.messages=obj.content
        // console.log(this.messages)
          this.$dialog.alert({
              width:"80%",
              message: this.messages,
              closeOnClickOverlay:true
            });
    },
    send: function () {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
    },
  },
}
</script>
<style lang="scss">
  #app{
    width: 100%;
    height: 100%;
  }

</style>
