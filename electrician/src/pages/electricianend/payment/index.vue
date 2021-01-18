<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p style="font-size:18px;padding-top:5px">支付</p>
    </div>
    <div class="contentbox" v-for="(item,index) in data" :key="index">
        <div class="content">
            <p style="text-align:center;font-size:15px">支付金额</p>
            <p style="text-align:center;font-size:35px;color:orange"><span style="font-size:15px">￥</span>{{price}}</p>
            <p style="display:flex;font-size:15px">
                <span style="color:#808080">订单编号</span>
                <span style="flex:1;text-align:right">{{item.orderId}}</span>
            </p>
            <p  style="display:flex;font-size:15px">
                <span style="color:#808080">订单来源</span>
                <span style="flex:1;text-align:right;color:#009FCC">{{item.orderFrom}}</span>
            </p>
            <p style="width:;height:1px;border:1px dashed #ccc;margin-top:30px"></p>
            <p style="text-align:center;font-size:15px;margin-top:50px">凭此二维码扫码支付</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      orderId:"",
      electricianId:"",
      data:[],
      price:""
    }
  },
  mounted(){
    console.log(this.$route.params)
    this.orderId=this.$route.params.orderId
    this.electricianId=this.$route.params.electricianId
    this.getdetail()
  },
  methods: {
    goback () {
      this.$router.push('/electricianend')
    },
    Order () {
        this.$router.push('/electricianend') 
    },
    getdetail(){
         this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            console.log(response.data);
            this.data=response.data.resultValue.items
            this.price=response.data.resultValue.items[0].customerPrice*1+response.data.resultValue.items[0].electricianPrice*1
            console.log(this.price)
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
padding-bottom: 20px;
box-sizing: border-box;
}
.contianer .backgroundbox{
    width: 100%;
    height: 150px;
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
font-size: 25px;
padding-left: 20px;
}
.contianer .backgroundbox p:nth-child(2){
flex: 1;
text-align: center;
font-size: 20px;
font-weight: bold;
}
.contentbox{
    position: absolute;
    top: 45px;
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
    padding: 30px;
    box-sizing: border-box;
    margin-top: 10px;
    font-size: 15px;
    box-shadow: 0px -5px 0px  #b4e0fc,0 -9px 0 #93d3fb;

}
.contentbox .content p:nth-child(1){
    margin-top: 0;
}
.contentbox .content p{
    margin-top: 10px;
}
</style>>
