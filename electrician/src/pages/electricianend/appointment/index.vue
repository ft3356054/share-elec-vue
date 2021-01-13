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
                <p class="pswidth del"><span>手机号</span> <span>{{item.customerPhonenumber}}</span> <span @click="godel(item)"><img src="../../../assets/images/phone.png" alt=""> 拨打电话</span></p>
            </div>
             <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>电压类型</span><span>{{item.voltage}}</span></p>

                <p class="pswidth"><span>需求类型</span><span>{{item.orderTypeId}}</span></p>
                <p class="pswidth"><span>地址</span><span>{{item.customerAddress}}</span></p>
                <!-- 上门费不清楚哪个字段 -->
                <p class="pswidth"><span>上门费</span><span id="money">{{item.customerPrice}}</span></p>
                <p class="pswidth"><span>状态</span><span v-if="item.orderStatus==='20'">待预约</span></p>
                <p class="pswidth"><span>内容说明</span> <span>{{item.customerDescrive}}</span> </p>
                <p class="pswidth"><span>发单时间</span><span>{{item.createTime}}</span></p>
            </div>
        </div>
        <div class="yuyuetime">
            <span>*</span>
            <span>预约时间</span>
            <span>
                <input type="datetime-local" name="" id="" v-model="times" @blur="datebtn">
            </span>
        </div>
        <div class="buttons" ><button @click="cancelbtn">取消</button><button @click="Order">预约</button></div>

    </div>
</div>
</template>

<script>
import myVue from '../../../views/My/my.vue'
export default {
  data () {
    return {
      times: '',
      phone: 13739865412,
      orderId:"",
      electricianId:'',
      data:[],
    minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show:false
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
            });
      },
    goback () {
      this.$router.push('/electricianend')
    },
    Order () {
      var times = this.times.split('T').join(' ')
      var fd=new FormData()
      var params={}
      params=fd
      params.append("items",`{
        "orderId":"${this.orderId}",
        "orderElectricianStatus":"21",
        "electricianId":"${this.electricianId}",
        "method":"预约",
        "orderStatus":"21",
        "appointmentTime":"${times}"
        }`)
     
      this.$axios.post("/orderElectrician/booking", params).then(res => {
            console.log(res)
        this.$router.push({name:'Repair',params:{orderId:this.orderId,electricianId:this.electricianId}})
        }).catch(err => {
            alert(err)
        })
    },
    cancelbtn(){
        this.$router.push({name:'Cancel',params:{orderId:this.orderId,electricianId:this.electricianId}})
    },
    godel (item) {
      window.location.href = `tel:${item.customerPhonenumber}`
    },
    datebtn(){
        //  var timeRegex = "^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-" +
        //   "(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})" +
        //   "(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\\s+" +
        //   "([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]).([0-9]{3})$"
        // var Regex = new RegExp(timeRegex)
        //  if (!Regex.test(this.times)) {
        // alert("请输入合法时间")
        //   return
        // }
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
    display: flex;
    font-size: 15px;
}
.contentbox .yuyuetime span:nth-child(1){
    color: red;
    padding-left: 14px;
    box-sizing: border-box;
}
.contentbox .yuyuetime span:nth-child(2){
    font-size: 12px;
    margin-left: 5px;
}
.contentbox .yuyuetime span:nth-child(3){
flex: 1;
padding-left: 30px;
box-sizing: border-box;
}
.contentbox .yuyuetime span input{
border:none;
color: #4097ce;
background: #ffffff;
font-size: 12px;
}
.contentbox .yuyuetime span input::-webkit-clear-button{
visibility:hidden;
}
.contentbox .yuyuetime span input::-webkit-calendar-picker-indicator{
border: 0;
outline: none;
background: #ffffff;
}
#money{
    color: #f76f7c;
}
.buttons{
    text-align: center;
    margin-top: 20px;
}
.buttons button:nth-child(1){
width: 85px;
height: 38px;
border: 0;
outline: none;
border-radius: 20px;
background: #f3f8fe;
color: #77787a;
font-size: 15px;
font-weight: bold;
border: 1px solid #c9cbcf;
margin-right: 20px;
}
.buttons button:nth-child(2){
width: 85px;
height: 38px;
border: 0;
outline: none;
border-radius: 20px;
background: #6dc0f5;
color: #ffffff;
font-size: 15px;
font-weight: bold;
}


</style>>
