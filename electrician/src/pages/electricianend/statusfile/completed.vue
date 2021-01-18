<template>
    <div class="contianer">
        <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox">
        <div class="content" v-for="(item,index) in data" :key="index">
            <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>订单编号</span><span>{{item.orderId}}</span></p>
                <p class="pswidth"><span>标题</span><span>{{item.customerDescriveTitle}}</span></p>
                <p class="pswidth"><span>联系人</span><span>{{item.customerName}}</span></p>
                <p class="pswidth"><span>联系电话</span><span>{{item.customerPhonenumber}}</span></p>
                <p class="pswidth"><span>发单时间</span><span>{{item.createTime}}</span></p>
                <p class="pswidth"><span>状态</span><span>已完成</span></p>
                <p class="pswidth"><span>完成时间</span><span>{{item.finishTime}}</span></p>
                <p class="pswidth"><span>上门费</span><span id="money">¥{{item.customerPrice}}</span></p>
                <p class="pswidth"><span>维修价格</span><span id="money1">¥{{item.electricianPrice}}</span></p>
                <p class="pswidth"><span>勘察情况</span> <span>{{item.electricianDescrive}}</span> </p>
                <p class="pswidth"><span>施工人员</span> <span style="display:inline-block;width:50px;overflow:hidden;word-break:break-all">{{item.remarkStr1}}</span> </p>
                <p class="pswidth"><span>施工内容</span> <span>{{item.constructionContent}}</span> </p>
            </div>
        </div>
         <div class="bottom">
            <div>
                <p style="font-size: 15px;font-weight: bold;">合同</p>
                <img :src="orderContractimg" alt="" style="width:100%;height:100px;display:block">
                <p  style="font-size: 15px;font-weight: bold;">验收报告</p>
                <img :src="inspectionReport" alt="" style="width:100%;height:100px;display:block">
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        orderid:"",
        electricianId:"",
        data:[],
        orderContractimg:"",
        inspectionReport:""
    }
  },
  mounted(){
      this.getdetail()
      console.log(this.$route.params)
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
            this.orderContractimg=this.data[0].orderContract
            this.inspectionReport=this.data[0].inspectionReport
        });
    },
    goback () {
      this.$router.go(-1)
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
width: 30%;
font-size: 11px;
margin-right: 27px;
margin-left: 14px;
color: #6f6f6f;
}
.contentbox .content div .pswidth span:nth-child(2){
flex: 1;
font-size: 11px;
margin-right: 27px;
color: #111111;
font-weight: bold;
}
.contentbox .content div .pswidth #peopleadd{
    /* flex: 0; */
    display:inline-block;
    width:50px;
    overflow:hidden;
    word-break:break-all
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
.contentbox .yuyuetime span:nth-child(3){
flex: 1;
padding-left: 22px;
box-sizing: border-box;
}
.contentbox .yuyuetime span input{
border:none;
color: #4097ce;
background: #ffffff;
}
.contentbox .yuyuetime span input::-webkit-clear-button{
visibility:hidden;
}
.contentbox .yuyuetime span input::-webkit-calendar-picker-indicator{
border: 0;
outline: none;
background: #ffffff;
}
.contentbox .content div .context span:nth-child(1){
color: red;
font-size: 15px;
margin-right: 10px;
}
.contentbox .content div .context{
font-size: 13px;
font-weight: bold;
}
.bottom{
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}
.bottom div{
background: #ffffff;
padding: 10px 10px;
    box-sizing: border-box;
}
.bottom div p{
margin-top: 10px;
}
.bottom div p:nth-child(1){
margin-top: 0;
}
.bottom div img{
margin-top: 10px;
}
</style>
