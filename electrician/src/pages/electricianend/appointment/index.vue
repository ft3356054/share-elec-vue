<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox">
        <div class="content">
            <div>
                <p class="titles"><span></span>基本信息</p>
                <p class="pswidth"><span>订单编号</span><span>2020111310500004</span> </p>
                <p class="pswidth"><span>发单人</span><span>杨磊</span> </p>
                <p class="pswidth del"><span>手机号</span> <span>159****8080</span> <span @click="godel"><img src="../../../assets/images/phone.png" alt=""> 拨打电话</span></p>
            </div>
             <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>电压类型</span><span>220V</span></p>
                <p class="pswidth"><span>需求类型</span><span>检修</span></p>
                <p class="pswidth"><span>地址</span><span>天津市东丽区国网客服中心</span></p>
                <p class="pswidth"><span>上门费</span><span id="money">¥1500</span></p>
                <p class="pswidth"><span>状态</span><span>待预约</span></p>
                <p class="pswidth"><span>内容说明</span> <span>变压器故障，变压器故障原因当前未知，请于业主联系</span> </p>
                <p class="pswidth"><span>发单时间</span><span>2020/11/03 16:10</span></p>
            </div>

        </div>
        <div class="yuyuetime">
            <span>*</span><span>预约时间</span><span><input type="datetime-local" name="" id="" v-model="times"></span>
        </div>
    <div class="buttons"><button>取消</button><button @click="Order">预约</button></div>

    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      phone: 13739865412
    }
  },
  mounted(){
    this.getlist()
  },
  methods: {
    getlist(){
          var params="321"
            this.$axios.post("/orderElectrician/orderDetails/22?electricianId", {params}) .then(res => {
                console.log(res);
            });
      },
    goback () {
      this.$router.go(-1)
    },
    Order () {
      var times = this.times.split('T').join(' ')
      if (times === '') {
        alert('请输入完整时间')
      } else {
        alert('成功')
        this.$router.push('/repair')
      }
    //   alert('抢单成功')
    //   this.$router.push(`/`)
    },
    godel () {
      window.location.href = `tel:15541544454`
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
padding-top: 42px;
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
