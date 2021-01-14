<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox" v-for="(item,index) in data" :key="index">
        <div class="content">
            <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>订单编号</span><span>{{item.orderId}}</span></p>
                <!-- orderFrom 订单来源-->
                <p class="pswidth"><span>订单来源</span><span>{{item.orderFrom}}</span></p>
                <p class="pswidth"><span>标题</span><span>{{item.customerDescriveTitle}}</span></p>
                <p class="pswidth"><span>联系人</span><span>{{item.customerName}}</span></p>
                <p class="pswidth"><span>联系电话</span><span>{{item.customerPhonenumber}}</span></p>
                <p class="pswidth"><span>发单时间</span><span>{{item.createTime}}</span></p>
                <p class="pswidth"><span>上门费</span><span id="money" v-if="item.customerPrice===null"></span><span id="money" v-else>¥{{item.customerPrice}}</span></p>
                <p class="pswidth"><span>状态</span><span v-if="item.orderStatus=='22'">待现场勘察</span></p>
                <p class="pswidth"><span>内容说明</span> <span>{{item.customerDescrive}}</span> </p>
            </div>
             <div>
                <p class="titles"><span></span>勘察原因</p>
                <textarea v-model="context" name="" id="" cols="30" rows="5" style="width:100%;background:#f7fbff;border:0;outline:none;font-size:13px;font-weight:bold"></textarea>
            </div>

        </div>
    <div class="buttons"><button @click="returnorder">退回</button><button @click="Order(item)">提交</button></div>

    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      phone: 13739865412,
      electricianId:"",
      orderId:"",
      context:"",
      data:[]
    }
  },
  mounted(){
      this.getdetail()
      this.orderId=this.$route.params.orderId
      this.electricianId=this.$route.params.electricianId
  },
  methods: {
      getdetail(){
          var params={
              orderId:this.$route.params.orderId,
              electricianId:this.$route.params.electricianId
          }
        this.$api.get("/orderElectrician/orderDetails/"+params.orderId, {"electricianId":params.electricianId}, response => {
            console.log(response.data);
            this.data=response.data.resultValue.items
        });
    },
    goback () {
      this.$router.push('/electricianend')
    },
    Order (item) {
        var fd=new FormData()
        var params={}
        params=fd
      params.append("items",`{
                "orderId":"${this.orderId}",
                "orderElectricianStatus":"26",
                "method":"现场勘查",
                "orderStatus":"26",
                "electricianDescrive":"${this.context}",
                "electricianId":"${this.electricianId}"
                }`)
     
      this.$axios.post("/orderElectrician/booking", params).then(res => {
        //  this.$router.push({name:'Uploadcontract',params:{orderId:this.orderId,electricianId:this.electricianId}})
         this.$router.push('/electricianend')
        }).catch(err => {
            alert(err)
        })


    },
    returnorder () {
    var params={
        "orderId":this.orderId,
        "orderElectricianStatus":"5",
        "method":"现场勘查退回订单",
        "orderStatus":"11",
        "electricianDescrive":"我修不了，你再找个人儿呗。",
        "electricianId":this.electricianId
    }
    //   this.$axios.post("/orderElectrician/booking", {params}).then(res => {
    //         console.log(res)
            //   this.$router.push('/returnorder')
      this.$router.push({name:'Returnorder',params:{orderId:params.orderId,electricianId:params.electricianId}})
            
        // }).catch(err => {
        //     alert(err)
        // })
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
box-sizing: border-box;
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
    padding-left: 34px;
    font-size: 12px;
    box-sizing: border-box;
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
width: 87px;
height: 37px;
border: 0;
outline: none;
border-radius: 20px;
background: #f3f8fe;
color: #77787a;
font-size: 13px;
font-weight: bold;
border: 1px solid #c9cbcf;
margin-right: 20px;
}
.buttons button:nth-child(2){
width: 87px;
height: 37px;
border: 0;
outline: none;
border-radius: 20px;
background: #6dc0f5;
color: #ffffff;
font-size: 13px;
font-weight: bold;
}

</style>>
