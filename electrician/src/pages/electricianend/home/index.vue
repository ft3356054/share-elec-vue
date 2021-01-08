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
                <p>
                    <ul id="con1" ref="con1" :class="{anim:animate==true}">
                        <li v-for="(item,index) in messages" :key="index" @click="gomessagedetail(item)">系统消息：{{item.content}} </li>
                        <img src="@/assets/images/messagejiantou.png" alt="">
                    </ul>
                </p>
                <!-- <p></p> -->
                <!-- <p><img src="@/assets/images/messagejiantou.png" alt=""></p> -->
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
        <div class="content" v-show="num==0" v-for="(item,index) in data" :key="'content'+index" @click="godetail(item)">
            <div class="typebox">
                <p><span>类别</span><span>{{item.orderTypeId}}</span></p>
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
                        <p v-show="item.orderStatus==='3'" style="color:red">人员增加</p>
                        <p v-show="item.orderStatus==='8'" style="color:red">待评价</p>
                        <p v-show="item.orderStatus==='20'" style="color:red">待预约</p>
                        <p v-show="item.orderStatus==='21'" style="color:red">待维修</p>
                        <p v-show="item.orderStatus==='22'" style="color:red">待现场勘察</p>
                        <p v-show="item.orderStatus==='23'" style="color:red">待支付维修费</p>
                        <p v-show="item.orderStatus==='24'" style="color:red">施工完成</p>
                        <p v-show="item.orderStatus==='25'" style="color:red">待验收</p>
                        <p v-show="item.orderStatus==='26'" style="color:red">待填写维修费</p>
                        <p v-show="item.orderStatus==='31'" style="color:red">施工中</p>
                        <p v-show="item.orderStatus==='1'" style="line-height:0"><button @click="quxiao(item)">取消</button> <button class="jiedan" @click="jiedan(item)">接单</button></p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content context" v-show="num==1" v-for="(item,index1) in datas" :key="'context'+index1" @click="gopingjia(item)">
            <div class="typebox">
                <p><span>类别</span><span>{{item.orderTypeId}}</span></p>
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
                        <p v-show="item.orderStatus==='8'" style="color:red">待评价</p>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</section>
</div>

</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      num: 0,
      animate:false,
      data: [],
      datas:[],
      messages: [
        {name: '本系统将于24日凌晨24:00开始停机更新1'},
        {name: '本系统将于24日凌晨24:00开始停机更新2'},
        {name: '本系统将于24日凌晨24:00开始停机更新3'},
        {name: '本系统将于24日凌晨24:00开始停机更新4'}
      ],
      electricianId:"321"
    }
  },
  created () {
    setInterval(this.scroll, 3000)
  },
  mounted(){
        this.gettodo(),
        this.getevaluate(),
        this.getmessage()
  },
  methods: {
      getmessage(){
            var params={
                "pageIndex":1,
                "pageSize":20,
                "filter":["userId=321","status=2"]
                }
            this.$axios.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":1,"pageSize":5,"filter":["userId=${this.electricianId}","status=0"]}`).then(res => {
                this.messages=res.data.resultValue.items
            }).catch(err => {
                alert(err)
            })
      },
    //   消息滚屏事件
      scroll(){
            this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                    this.messages.push(this.messages[0]);  // 将数组的第一个元素添加到数组的
                    this.messages.shift();               //删除数组的第一个元素
                    this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            },800)
      },
      gomessagedetail(item){
          console.log(item)
         this.$axios.get(`/notifyAnnounce/read/?params={"filter":["announceId=${item.announceId}","announceUserId=${item.announceUserId}"]}`).then(res => {
                console.log(res)
            }).catch(err => {
                alert(err)
            })
      },
    //   待办
    gettodo(){
        var params={
            "pageIndex":1,"pageSize":10,"filter":["orderElectricianStatus=9"]
        }
        this.$api.get("/orderElectrician/queryMore", {params,electricianId:this.electricianId}, response => {
            this.data=response.data.resultValue.items
            });
     },
    //  待评价
     getevaluate(){
        var params={
            "pageIndex":1,"pageSize":10,"filter":["orderElectricianStatus=8"]
        }
        this.$api.get("/orderElectrician/queryWaitToDo", {params,electricianId:this.electricianId}, response => {
            this.datas=response.data.resultValue.items
        });
     },
     quxiao(item){
         var params={
             orderID:item.orderId,
             electricianId:this.electricianId
         }
        // 报orderElectricianId为必填项
        this.$axios.get("/orderElectrician/esc", {params}).then(res => {
            console.log(res)
        }).catch(err => {
            alert(err)
        })

     },
     godetail(item){
         if(item.orderStatus==="8"){
            this.$router.push({name:'Evaluate',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="20"){
            this.$router.push({name:'Appointment',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="21"){
            this.$router.push({name:'Repair',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="22"){
            this.$router.push({name:'Prospecting',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="23"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="24"){
            this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="25"){
            //  如果电工上传完待验收 改为只读状态
            // this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
            Toast.fail("待用户验收完成")
         }else if(item.orderStatus==="26"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="31"){
            this.$router.push({name:'Completion',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderStatus==="3"){
            this.$router.push({name:'Personneladd',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }
     },
     gopingjia(item){
          this.$router.push({name:'Evaluate',params:{orderId:item.orderId,electricianId:this.electricianId}})
     },
    gordergrabbing () { 
      this.$router.push('/ordergrabbing')
    },
    jiedan (item) {
      this.$router.push({name:'Ordergrabbingdetail',params:{orderId:item.orderId,electricianId:this.electricianId}})
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
.anim{
    transition: all 0.7s;
    margin-top: -30px;
}
#con1 img{
position: absolute;
top: 11px;
right: 10px;
width: 6px;
height: 8px;
}
#con1 li{
    list-style: none;
    height: 30px;
}
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
    padding-top: 10px;
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
    position: relative;
}
header .message p:nth-child(1){
    display: flex;
    overflow: hidden;
    width: 100%;
}
header .message p:nth-child(1) ul{
flex: 1;
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
section .contentbox .content .addressbox dd p{
line-height: 60px;
font-size: 15px;
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
