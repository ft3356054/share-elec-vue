/* eslint-disable vue/no-parsing-error */
<template>
<div class="contianer">
<header>
    <div class="backimg">
        <p>
            <span><img src="@/assets/images/message.png" alt="" @click="gomessages"></span>
            <span></span>
            <span><img src="@/assets/images/information.png" alt="" @click="gouser"></span>
        </p>
    </div>
    <div class="positionbox">
        <div class="contentbox">
            <div class="dlbox">
                <dl @click="gordergrabbing">
                    <dt><img src="@/assets/images/ordergrabbing.png" alt=""></dt>
                    <dd>抢单</dd>
                </dl>
                <dl>
                    <dt><img src="@/assets/images/stoporders.png" alt=""></dt>
                    <dd>暂停接单</dd>
                </dl>
                <dl @click="gomyorderabbing">
                    <dt><img src="@/assets/images/Myorder.png" alt=""></dt>
                    <dd>我的订单</dd>
                </dl>
            </div>
             <div class="message">
            <p>系统消息：<span>本系统将于24日凌晨24:00开始停机更新1</span></p>
            <p></p>
            <p><img src="@/assets/images/messagejiantou.png" alt=""></p>
        </div>
        </div>
    </div>
</header>
<section>
    <div class="tab-box">
        <ul>
            <li @click="num=0" :class="{active:num==0}">待办</li>
            <li @click="num=1" :class="{active:num==1}">待评价</li>
        </ul>
    </div>
    <div class="contentbox">
        <div class="content" v-show="num==0" v-for="(item,index) in data" :key="index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.types}}</span></p>
                <p></p>
                <p>{{item.times}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{item.name}}</p>
                        <p>{{item.progess}}</p>
                        <p>{{item.address}}</p>
                    </dt>
                    <dd>
                        <button>取消</button> <button class="jiedan" @click="jiedan">接单</button>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==1">
            <div class="typebox">
                <p><span>类别</span><span>泵房线路安装</span></p>
                <p></p>
                <p>2020/11/09 13:49</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>天津市东丽区国网客服中心北方园区</p>
                        <p>插座跳闸，需要检修下</p>
                        <p>10kv 抢修  5km </p>
                    </dt>
                    <dd>
                        <!-- <button>取消</button> <button class="jiedan" @click="jiedan">接单</button> -->
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</section>
</div>

</template>

<script>
export default {
  data () {
    return {
      num: 0,
      animate: false,
      data: [
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'}
      ],
      messages: [
        {name: '本系统将于24日凌晨24:00开始停机更新1'},
        {name: '本系统将于24日凌晨24:00开始停机更新2'},
        {name: '本系统将于24日凌晨24:00开始停机更新3'},
        {name: '本系统将于24日凌晨24:00开始停机更新4'}
      ]
    }
  },
  created () {
    setInterval(this.scroll, 3000)
  },
  methods: {
    scroll () {
      this.animate = true
      setTimeout(() => {
        this.messages.push(this.messages[0])
        this.messages.shift()
        this.animate = false
      }, 2000)
    },
    gordergrabbing () {
      this.$router.push('/ordergrabbing')
    },
    jiedan () {
      this.$router.push('/ordergrabbingdetail/detail')
    },
    gomyorderabbing () {
      this.$router.push('/myorderabbing')
    },
    gouser () {
      this.$router.push('/userinformation')
    },
    gomessages () {
      this.$router.push('/messages')
    }
  }
}
</script>

<style scoped>
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
display: flex;
flex-direction: column;
}
header{
    width: 100%;
    height: 285px;
    position: relative;
}
header .backimg{
    width: 100%;
    height: 214px;
     background: url(../../../assets/images/banner.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 40px;
    box-sizing: border-box;
}
header .backimg p{
display: flex;
padding: 0 10px;
box-sizing: border-box;
}
header .backimg p span:nth-child(1) img{
width: 20px;
height: 20px;
display: block;
}
header .backimg p span:nth-child(2){
    flex: 1;
}
header .backimg p span:nth-child(3) img{
width: 20px;
height: 20px;
display: block;
}
header .positionbox{
    width: 100%;
    height: 140px;
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
}
header .positionbox .contentbox{
    width:100%;
    height:100%;
    background:#ffffff;
    border-radius: 10px;
}
header .positionbox .contentbox .dlbox{
width: 100%;
height: 105px;
display: flex;
}
header .positionbox .contentbox .dlbox dl{
flex: 1;
text-align: center;
display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
font-size: 12px;
}
header .positionbox .contentbox .dlbox dl dt img{
width: 50px;
height: 50px;
display: inline-block;
}
header .message{
    width: 100%;
    height: 35px;
    background: #f5faff;
    display: flex;
    font-size: 11px;
    line-height: 35px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #3f99e4;
}
header .message p:nth-child(2){
    flex: 1;
}
header .message p:nth-child(3) img{
    width: 6px;
    height: 8px;
    display: block;
    margin-top: 12px;
}
section{
    flex: 1;
    overflow: auto;
}
section::-webkit-scrollbar{
    width: 0;
}
section .tab-box{
    width: 100%;
    height: 50px;
}
section .tab-box ul{
width: 100%;
height: 100%;
line-height: 37px;
}
section .tab-box ul li{
list-style: none;
float: left;
margin-left: 48px;
font-size: 13px;
}

section .contentbox{
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
}
section .contentbox::-webkit-scrollbar{
    width: 0;
}
section .contentbox .content{
    width: 100%;
    height: auto;
    border-radius: 16px;
    background: #ffffff;
    padding: 15px 12px;
box-sizing: border-box;
margin-top: 10px;
}
section .contentbox .content .typebox{
display: flex;
border-bottom: 1px solid #f2f2f2;
}
section .contentbox .content .typebox p:nth-child(2){
    flex: 1;
}
section .contentbox .content .typebox p:nth-child(1) span:nth-child(1){
    width: 30px;
    height: 15px;
    display: inline-block;
    background: url(../../../assets/images/label.png) no-repeat;
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    background-size: 100% 100%;
}
section .contentbox .content .typebox p:nth-child(1) span:nth-child(2){
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    margin-left: 7px;
}
section .contentbox .content .typebox p:nth-child(3){
    line-height: 22px;
    color: #aeaeae;
    font-size: 10px;
}
section .contentbox .content .addressbox{
width: 100%;
height: auto;
}
section .contentbox .content .addressbox dl{
width: 100%;
height: auto;
display: flex;
margin: 0;
}
section .contentbox .content .addressbox dt{
    flex: 1;
font-size: 11px;
}
section .contentbox .content .addressbox dt p{
margin: 0;
padding: 0;
margin-top: 5px;
}
section .contentbox .content .addressbox dd{
padding: 0;
margin: 0;
text-align: right;
padding-left: 10px;
box-sizing: border-box;
}
section .contentbox .content .addressbox dd button{
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
section .contentbox .content .addressbox dd .jiedan{
border-color: #52aae1;
color: #52aae1;
}
.active{
    color: #54abe1;
    border-bottom: 2px solid #2293d8;
box-sizing: border-box;
font-size: 15px;
}

</style>>
