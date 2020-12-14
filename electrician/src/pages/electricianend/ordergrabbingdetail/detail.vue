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
                <p class="pswidth"><span>手机号</span> <span>159****8080</span> </p>
            </div>
             <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>电压类型</span><span>220V</span></p>
                <p class="pswidth"><span>需求类型</span><span>检修</span></p>
                <p class="pswidth"><span>地址</span><span>天津市东丽区国网客服中心</span></p>
                <p class="pswidth"><span>上门费</span><span id="money">¥1500</span></p>
                <p class="pswidth"><span>状态</span><span>待接单</span></p>
                <p class="pswidth"><span>内容说明</span> <span>变压器故障，变压器故障原因当前未知，请于业主联系</span> </p>
                <p class="pswidth"><span>发单时间</span><span>2020/11/03 16:10</span></p>
            </div>
        </div>
    <div class="buttons"><button @click="Order">立即抢单</button></div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    Order () {
      alert('抢单成功')
      this.$router.push(`/appointment`)
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
    padding: 15px 20px;
box-sizing: border-box;
    margin-top: 10px;
   box-shadow: 0px -5px 0px  #b4e0fc,0 -9px 0 #93d3fb;

}

.contentbox .content div{
margin-top: 30px;
}
.contentbox .content div:nth-child(1){
margin-top: 20px;
}
.contentbox .content div .titles{
font-size: 15px;
font-weight: bold;
}
.contentbox .content div .titles span{
display: inline-block;
width: 4px;
height: 13px;
background-color: #f65b6a;
margin-right: 10px;
}
.contentbox .content div .pswidth{
display: flex;
}
.contentbox .content div .pswidth span:nth-child(1){
width: 55px;
font-size: 13px;
margin-right: 27px;
margin-left: 14px;
color: #6f6f6f;
}
.contentbox .content div .pswidth span:nth-child(2){
flex: 1;
width: 55px;
font-size: 13px;
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
width: 140px;
height: 40px;
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
