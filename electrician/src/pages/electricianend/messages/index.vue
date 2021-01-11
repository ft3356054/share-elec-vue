<template>
    <div class="contianer">
        <header>
             <p  @click="goback"><img src="@/assets/images/jiantou.png" alt=""></p>
            <p>消息列表</p>
        </header>
        <section>
             <div class="content" v-for="(item,index) in data" :key="index" @click="seebtn(item)">
                <div class="typebox">
                    <p><span>类别</span><span>{{item.title}}</span></p>
                    <p></p>
                    <p>{{item.createTime}}</p>
                </div>
                <div class="addressbox">
                    <dl>
                        <dt>
                            <p>{{item.content}}</p>
                            <!-- <p>{{item.progess}}</p> -->
                        </dt>
                        <dd>
                            <button class="jiedan">查看 <img src="@/assets/images/messagejiantou.png" alt=""></button>
                        </dd>
                    </dl>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      path:"ws://localhost:8083/websocketserver/",
      socket:'',
      electricianId:"321",
      orderId:""
    }
  },
  mounted () {
      this.WebSocketTest()
      this.message()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    seebtn(item){
        console.log(item)
            this.$axios.get(`/notifyAnnounce/read/?params={"filter":["announceId=${item.announceId}","announceUserId=${item.announceUserId}"]}`).then(res => {
                console.log(res)
                this.orderId=res.data.resultValue.items[0].orderId
                this.getdetail()
            }).catch(err => {
                alert(err)
            })
    },
    getdetail(){
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            console.log(response.data.resultValue.items[0].orderElectricianStatus);
            var items=response.data.resultValue.items[0]
               if(items.orderElectricianStatus==="8"){
                    this.$router.push({name:'Evaluate',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="9"){
            // console.log(items)
                    this.$router.push({name:'Completed',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="0"){
                    this.$router.push({name:'Appointment',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="21"){
                    this.$router.push({name:'Repair',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="22"){
                    this.$router.push({name:'Prospecting',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="23"){
                    this.$router.push({name:'Uploadcontract',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="24"){
                    this.$router.push({name:'Servicereport',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="25"){
                    //  如果电工上传完待验收 改为只读状态
                    // this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
                    Toast.fail("待用户验收完成")
                }else if(items.orderElectricianStatus==="26"){
                    this.$router.push({name:'Uploadcontract',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="31"){
                    this.$router.push({name:'Completion',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="3"){
                    this.$router.push({name:'Personneladd',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }
        });
    },
    message(){
            this.$axios.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":1,"pageSize":20,"filter":["userId=${this.electricianId}","status=2"]}`).then(res => {
                console.log(res)
                this.data=res.data.resultValue.items
            }).catch(err => {
                alert(err)
            })
       
    },
    WebSocketTest(){
         if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                var uid = "123";
                this.socket = new WebSocket(this.path+uid)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
                console.log(this.socket)
            }
    },
    open: function () {
            console.log("socket连接成功")
        },
    error: function () {
        console.log("连接错误")
    },
    getMessage: function (msg) {
        console.log(msg.data)
    },
    send: function () {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
    }
  },
  destroyed(){
      this.socket.onclose = this.close
  }
}
</script>

<style scoped>
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
display: flex;
flex-direction: column;
padding-bottom: 20px;
box-sizing: border-box;
}
header{
    width: 100%;
    height: 80px;
    background: #87cefa;
    display: flex;
    line-height: 80px;

}
header p{
    margin: 0;
    padding: 0;
}
header p:nth-child(2){
    flex: 1;
    text-align: center;
    font-size: 15px;
    color: #ffffff;
    font-weight: bold;
}
header p:nth-child(1){
    padding-left: 10px;
box-sizing: border-box;
}
section{
    flex: 1;
    overflow: auto;
    padding: 0 10px;
    box-sizing: border-box;
}
section::-webkit-scrollbar{
    width: 0;
}
.content{
    width: 100%;
    height: auto;
    background: #ffffff;
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
}
.typebox{
    display: flex;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 5px;
    box-sizing: border-box;
}
.typebox p:nth-child(2){
    flex: 1;
}
.typebox p:nth-child(1) span:nth-child(1){
    width: 30px;
    height: 15px;
    display: inline-block;
    background: url(../../../assets/images/label.png) no-repeat;
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    background-size: 100% 100%;
}
.typebox p:nth-child(1) span:nth-child(2){
font-size: 13px;
font-weight: bold;
margin-left: 8px;
}
.typebox p:nth-child(3){
font-size: 8px;
color: #b2b2b2;
line-height: 20px;
}
.addressbox{
    width: 100%;
    height: auto;
}
.addressbox dl{
    width: 100%;
    height: auto;
    display: flex;
}
.addressbox dl dt{
font-size: 12px;
padding-top: 14px;
box-sizing: border-box;
flex: 1;
}
.addressbox dl dd{
    text-align: center;
    padding-top: 22px;
    font-size: 12px;
    padding-left: 10px;
}
.addressbox dl dd button{
    border: 0;
    outline: none;
    background: #ffffff;
    color: #4aa4dd;
}
.addressbox dl dd button img{
float:right;
margin-top: 5px;
margin-left: 3px;
width: 5;
height: 8px;
}
</style>
