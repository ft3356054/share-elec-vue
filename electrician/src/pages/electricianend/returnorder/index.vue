<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>退回订单</p>
    </div>
    <div class="contentbox">
        <div class="content">
            <div>
                <p style="font-weight:bold">退回原因:</p>
                <textarea v-model="returncontext" name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
    <div class="buttons"><button @click="Order">确定</button></div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      phone: 13739865412,
      returncontext:"",
      orderId:"",
      electricianId:""
    }
  },
  mounted(){
    console.log(this.$route.params)
    this.orderId=this.$route.params.orderId
    this.electricianId=this.$route.params.electricianId
  },
  methods: {
    goback () {
      this.$router.push('/')
    },
    Order () {
      var fd=new FormData()
        var params={}
        params=fd
         params.append("items",`{
                "orderId":"${this.orderId}",
                "orderElectricianStatus":"5",
                "method":"现场勘查退回订单",
                "orderStatus":"11",
                "electricianDescrive":"${this.returncontext}",
                "electricianId":"${this.electricianId}"
                }`)
      this.$axios.post("/orderElectrician/booking", params).then(res => {
            console.log(res)
            this.$router.push('/electricianend')
        }).catch(err => {
            alert(err)
        })
 
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
padding-top: 45px;
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
    top: 85px;
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
    padding: 50px 60px;
    box-sizing: border-box;
    margin-top: 10px;
    font-size: 15px;
    box-shadow: 0px -5px 0px  #b4e0fc,0 -9px 0 #93d3fb;

}
.contentbox .content div textarea{
width:100%;background:#f7fbff;border:0;outline:none;font-size:13px;font-weight:bold
}
.buttons{
    text-align: center;
    margin-top: 20px;
}
.buttons button:nth-child(1){
width: 140px;
height: 40px;
border: 0;
outline: none;
border-radius: 20px;
background: #7ac8f8;
color: #ffffff;
font-size: 15px;
font-weight: bold;
}
@media (max-width: 375px) {
  .contentbox{
    width: 100%;
    height: 710px;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
}
}

</style>>
