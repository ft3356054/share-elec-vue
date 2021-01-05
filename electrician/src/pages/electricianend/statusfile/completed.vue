<template>
    <div class="contianer">
        <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox">
        <div class="content">
            <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>订单编号</span><span>20201111121554</span></p>
                <p class="pswidth"><span>标题</span><span>插座跳闸</span></p>
                <p class="pswidth"><span>联系人</span><span>杨磊</span></p>
                <p class="pswidth"><span>联系电话</span><span>159****8080</span></p>
                <p class="pswidth"><span>发单时间</span><span>2020/11/09 16:51</span></p>
                <p class="pswidth"><span>状态</span><span>已完成</span></p>
                <p class="pswidth"><span>完成时间</span><span>2020/11/09 16:51</span></p>
                <p class="pswidth"><span>上门费</span><span id="money">¥150.00</span></p>
                <p class="pswidth"><span>维修价格</span><span id="money1">¥1500.00</span></p>
                <p class="pswidth"><span>勘察情况</span> <span>机房主配电箱10kv开关烧坏，开关需要更换</span> </p>
                <p class="pswidth"><span>施工人员</span> <span>刘强 13815124614 <br> 刘强 13815124614</span> </p>
                <p class="pswidth"><span>施工内容</span> <span>机房主配电箱开关已更换完成，施工时间一个工作日</span> </p>
            </div>
        </div>
         <div class="content">
            <div>
                <p style="font-size: 15px;font-weight: bold;">合同</p>
                <img src="../../../assets/images/banner.png" alt="" style="width:100%;height:100px;display:block">
                <p  style="font-size: 15px;font-weight: bold;">服务报告</p>
                <img src="../../../assets/images/banner.png" alt="" style="width:100%;height:100px;display:block">
            </div>
        </div>
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
/* margin-left: -30px; */
}
.contentbox{
    position: absolute;
    top: 85px;
    left: 0;
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
    padding-bottom: 15px;
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
    padding: 3px 12px;
    box-sizing: border-box;
    margin-top: 10px;
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
</style>
