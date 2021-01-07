<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox">
        <div class="content" v-for="(item,index) in data" :key="index">
            <div>
                <p class="titles"><span></span>基本信息</p>
                <p class="pswidth"><span>订单编号</span><span>{{item.orderId}}</span> </p>
                <p class="pswidth"><span>发单人</span><span>{{item.customerName}}</span> </p>
                <p class="pswidth del"><span>手机号</span> <span>{{item.customerPhonenumber}}</span></p>
            </div>
             <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>电压类型</span><span>{{item.voltage}}</span></p>
                <p class="pswidth"><span>需求类型</span><span>检修</span></p>
                <p class="pswidth"><span>地址</span><span>{{item.customerAddress}}</span></p>
                <p class="pswidth"><span>上门费</span><span id="money">¥{{item.customerPrice}}</span></p>
                <p class="pswidth"><span>状态</span><span v-if="item.orderStatus==='21'">待到达现场</span></p>
                <p class="pswidth"><span>内容说明</span> <span>{{item.customerDescrive}}</span> </p>
                <p class="pswidth"><span>发单时间</span><span>{{item.createTime}}</span></p>
            </div>

        </div>
        <div class="yuyuetime">
            <p><span>预约时间</span><span>{{appointmentTime}}</span></p>
        </div>
    <div class="buttons"><button @click="Order">去维修</button></div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      phone: 13739865412,
      orderId:'',
      electricianId:'',
      data:[],
      appointmentTime:""
    }
  },
  mounted(){
      this.getlist()
  },
  methods: {
    getlist(){
        this.orderId=this.$route.params.orderId
        this.electricianId=this.$route.params.electricianId
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            this.data=response.data.resultValue.items
            this.appointmentTime=response.data.resultValue.items[0].appointmentTime
        });
    },
    goback () {
      this.$router.push('/electricianend')
    },
    Order () {
        var params={
            orderId:this.orderId,
            electricianId:this.electricianId
        }
      this.$router.push({name:'Navigation',params:{orderId:params.orderId,electricianId:params.electricianId}})
    }
  }
}
</script>

<style scoped>
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
position: relative;
overflow: auto;
}
.contianer .backgroundbox{
    width: 100%;
    height: 135px;
    background-color: #87cefa;
    border-bottom-right-radius: 20%;
    border-bottom-left-radius: 20%;
display: flex;
padding-top: 10px;
    box-sizing: border-box;
}
.contianer .backgroundbox p{
    padding: 0;
    margin: 0;
    color: #ffffff;
}
.contianer .backgroundbox p:nth-child(1){
font-size: 15px;
padding-left: 20px;
}
.contianer .backgroundbox p:nth-child(2){
flex: 1;
text-align: center;
font-size: 15px;
font-weight: bold;
}
.contentbox{
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
}
.contentbox .content{
    width: 100%;
    height: auto;
    border-radius: 16px;
    background: #ffffff;
    padding: 3px 12px;
box-sizing: border-box;
    margin-top: 10px;
   box-shadow: 0px -5px 0px  #b4e0fc,0 -9px 0 #93d3fb;

}

.contentbox .content div{
margin-top: 30px;
}
.contentbox .content div:nth-child(1){
margin-top: 15px;
}
.contentbox .content div .titles{
font-size: 13px;
font-weight: bold;
}
.contentbox .content div .titles span{
display: inline-block;
width: 2px;
height: 10px;
background-color: #f65b6a;
margin-right: 10px;
}
.contentbox .content div .pswidth{
display: flex;
/* line-height: 2px; */
margin-top: 5px;
}
.contentbox .content div .pswidth span:nth-child(1){
width: 55px;
font-size: 11px;
margin-right: 27px;
margin-left: 14px;
color: #6f6f6f;
}
.contentbox .content div .pswidth span:nth-child(2){
flex: 1;
width: 55px;
font-size: 11px;
margin-right: 27px;
color: #111111;
font-weight: bold;
}
.contentbox .content div .pswidth span:nth-child(3) {
    font-size: 11px;
    color: #83ccfa;
}
.contentbox .content div .pswidth span:nth-child(3) img{
float: left;
width: 18px;
height: 18px;
margin-right: 10px;
}
.contentbox .yuyuetime{
     width: 100%;
    height: 60px;
    background: #ffffff;
    margin-top: 15px;
    border-radius: 16px;
    line-height: 60px;
}
.contentbox .yuyuetime p{
width: 100%;
display: flex;
}
.yuyuetime p span:nth-child(1){
font-size: 12px;
margin-left: 25px;
color: #6f6f6f;
}
.yuyuetime p span:nth-child(2){
flex: 1;
font-size: 13px;
color: #111111;
font-weight: bold;
margin-left: 30px;
}
#money{
    color: #f76f7c;
}
.buttons{
    text-align: center;
    margin-top: 20px;
}
.buttons button:nth-child(1){
width: 95px;
height: 37px;
border: 0;
outline: none;
border-radius: 20px;
background: #7ac8f8;
color: #ffffff;
font-size: 14px;
font-weight: bold;
text-align: center;
}

</style>>
