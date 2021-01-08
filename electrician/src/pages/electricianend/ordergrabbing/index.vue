<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>待抢订单</p>
    </div>
    <div class="contentbox">
        <div class="content" v-for="(item,index) in data" :key="index">
            <div class="typebox">
                <p><span>类别</span><span>插座跳闸</span></p>
                <p></p>
                <p>{{item.createTime}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{item.customerAddress}}</p>
                        <p>{{item.customerDescrive}}</p>
                        <p>{{item.voltage}} 抢修 {{item.distance}}</p>
                    </dt>
                    <dd>
                        <button class="jiedan" @click="godetail(item)">抢单</button>
                    </dd>
                </dl>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      num: 0,
      data: [],
      electricianId:'321'
    }
  },
  mounted(){
      this.getlist()
  },
  methods: {
      getlist(){
            this.$axios.post("/orderElectrician/queryAllOrder/"+this.electricianId) .then(res => {
                    this.data=res.data.resultValue
            });
      },
    goback () {
      this.$router.go(-1)
    },
    godetail (item) {
      var params={
          "orderId":item.orderId,
          "electricianId":this.electricianId
      }
        this.$axios.get("/orderElectrician/qiangdanrecept", {params}) .then(res => {
            if(res.data.successful==false){
                Toast.fail(`${res.data.resultHint}`,3000)
            }else{
            this.$router.push({name:'Appointment',params:{orderId:params.orderId,electricianId:this.electricianId}})
            }
            console.log(res.data)
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
overflow: auto;
}
.contianer::-webkit-scrollbar{
    width: 0;
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
/* margin-left: -30px; */
}
.contentbox{
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;

}
.contentbox::-webkit-scrollbar{
    width: 0;
}
.contentbox .content{
    width: 100%;
    height: auto;
    border-radius: 16px;
    background: #ffffff;
    padding: 15px 20px;
box-sizing: border-box;
    margin-top: 10px;

}
.contentbox .content .typebox{
display: flex;
font-size: 14px;
border-bottom: 1px solid #f2f2f2;
}
.contentbox .content .typebox p:nth-child(2){
    flex: 1;
}
.contentbox .content .typebox p:nth-child(1) span:nth-child(1){
    width: 30px;
    height: 15px;
    display: inline-block;
    background: url(../../../assets/images/label.png) no-repeat;
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    background-size: 100% 100%;
}
.contentbox .content .typebox p:nth-child(1) span:nth-child(2){
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    margin-left: 7px;
}
.contentbox .content .typebox p:nth-child(3){
    line-height: 22px;
    color: #aeaeae;
    font-size: 10px;
}
.contentbox .content .addressbox{
width: 100%;
height: auto;
}
.contentbox .content .addressbox dl{
width: 100%;
height: auto;
display: flex;
margin: 0;
}
.contentbox .content .addressbox dt{
  flex: 1;
font-size: 11px;
}
.contentbox .content .addressbox dt p{
margin: 0;
padding: 0;
margin-top: 5px;
}
.contentbox .content .addressbox dt p{
margin: 0;
padding: 0;
margin-top: 5px;
}
.contentbox .content .addressbox dd{
text-align: right;
padding-left: 10px;
box-sizing: border-box;
}
.contentbox .content .addressbox dd button{
width: 50px;
height: 20px;
border-radius: 20px;
outline: none;
border: 0;
background: #ffffff;
border: 1px solid #aeaeae;
margin-top: 30px;
box-sizing: border-box;
color: #666666;
font-size: 10px;
}
.contentbox .content .addressbox dd .jiedan{
border-color: #52aae1;
color: #52aae1;
}
</style>>
