<template>
<div class="contianer">
    <div class="backgroundbox">
         <p  @click="goback"><img src="@/assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox" v-for="(item,index) in data" :key="index">
        <div class="content">
            <div>
                <p class="titles"><span></span>基本信息</p>
                <p class="pswidth"><span>订单编号</span><span>{{item.orderId}}</span> </p>
                <p class="pswidth"><span>发单人</span><span>{{item.customerName}}</span> </p>
                <p class="pswidth"><span>手机号</span> <span>{{item.customerPhonenumber}}</span> </p>
            </div>
             <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>电压类型</span><span>{{item.voltage}}</span></p>
                <p class="pswidth"><span>需求类型</span><span>{{item.orderTypeId}}</span></p>
                <p class="pswidth"><span>地址</span><span>{{item.customerAddress}}</span></p>
                <!-- <p class="pswidth"><span>上门费</span><span id="money">¥{{item.customerPrice}}</span></p> -->
                <p class="pswidth"><span>状态</span><span>待接单</span></p>
                <p class="pswidth"><span>内容说明</span> <span>{{item.customerDescrive}}</span> </p>
                <p class="pswidth"><span>发单时间</span><span>{{item.createTime}}</span></p>
            </div>
        </div>
            <div class="buttons"><button @click="Order(item)">立即接单</button></div>
    </div>
</div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
        orderId:"",
        electricianId:"",
        data:[]
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
                console.log(response.data);
                this.data=response.data.resultValue.items
            });
            
      },
    goback () {
      this.$router.go(-1)
    },
     Order (item) {
                var params={
                    "orderId":item.orderId,
                    "electricianId":this.electricianId
                      }
                    this.$axios.get("/orderElectrician/qiangdanrecept", {params}) .then(res => {
                        if(res.data.successful==false){
                            Toast.fail(`${res.data.resultHint}`,3000)
                        }else{
                             this.$dialog.alert({
                                width:"80%",
                                message: '抢单成功',
                                confirmButtonColor:"#87cefa"
                            })
                            .then((res) => {
                                // console.log("点击了确认按钮噢")
                                console.log(params.orderId)
                                this.$router.push({name:'Appointment',params:{orderId:params.orderId,electricianId:this.electricianId}})
                            })
                        }
                    });
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
}
.contianer .backgroundbox{
    width: 100%;
     height: 135px;
    background-color: #87cefa;
    border-bottom-right-radius: 20%;
    border-bottom-left-radius: 20%;
display: flex;
padding-top:10px;
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
    padding: 15px 20px;
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
#money{
    color: #f76f7c;
}
.buttons{
    text-align: center;
    margin-top: 20px;
}
.buttons button{
width: 123px;
height: 37px;
border: 0;
outline: none;
border-radius: 20px;
background: #6dc0f5;
color: #ffffff;
font-size: 15px;
font-weight: bold;
}


</style>>
