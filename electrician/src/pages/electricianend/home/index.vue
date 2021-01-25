/* eslint-disable vue/no-parsing-error */
<template>
<div class="contianer">
<header>
    <div class="backimg">
        <p>
            <span  v-if="content=='0'? true : false " @click="gomessages">
                <img src="@/assets/images/message.png" alt="" >
            </span>
            <span v-else @click="gomessages">
                <van-badge  :content="this.content" max="99" style="font-size: 12px;">
                <img src="@/assets/images/message.png" alt="" />
                </van-badge>
            </span>
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
                <dl @click="stylebtn">
                    <dt v-if="lay_type"><img :src="img" alt=""></dt>
                    <dt v-else><img :src="img1" alt=""></dt>
                    <dd v-if="lay_type">开始接单</dd>
                    <dd v-else>暂停接单</dd>
                </dl>
                <dl @click="gomyorderabbing">
                    <dt><img src="@/assets/images/Myorder.png" alt=""></dt>
                    <dd>我的订单</dd>
                </dl>
            </div>
             <div class="message" >
                <p >
                    <ul id="con1" ref="con1" :class="{anim:animate==true}">
                        <li  v-for="(item,index) in messages" :key="index" @click="gomessagedetail(item)">系统消息：{{item.content}} </li>
                        <img src="@/assets/images/messagejiantou.png" alt="">
                    </ul>
                </p>
                  <!-- <van-notice-bar :scrollable="false">
                    <van-swipe
                    vertical
                    class="notice-swipe"
                    :autoplay="3000"
                    :show-indicators="false"
                    :width="360"
                    >
                    <van-swipe-item v-for="(item,index) in messages" :key="index" @click="swipe(item.announceId,item.orderId)">
                        系统消息:  {{item.content}}
                    </van-swipe-item>
                    </van-swipe>
                    <img src="@/assets/images/messagejiantou.png" alt="">
                </van-notice-bar> -->











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
                         <p v-show="item.orderElectricianStatus==='1'" style="color:red">拒接订单</p>
                        <p v-show="item.orderElectricianStatus==='3'" style="color:red">人员增加</p>
                        <p v-show="item.orderElectricianStatus==='8'" style="color:red">待评价</p>
                        <p v-show="item.orderElectricianStatus==='0'" style="color:red">待预约</p>
                        <p v-show="item.orderElectricianStatus==='21'" style="color:red">待维修</p>
                        <p v-show="item.orderElectricianStatus==='22'" style="color:red">待现场勘察</p>
                        <p v-show="item.orderElectricianStatus==='23'" style="color:red">待支付维修费</p>
                        <p v-show="item.orderElectricianStatus==='24'" style="color:red">施工完成</p>
                        <p v-show="item.orderElectricianStatus==='25'" style="color:red">待验收</p>
                        <p v-show="item.orderElectricianStatus==='26'" style="color:red">待填写维修费</p>
                        <p v-show="item.orderElectricianStatus==='31'" style="color:red">施工中</p>
                        <p v-show="item.orderElectricianStatus==='2'" style="line-height:0"><button @click="quxiao(item)">取消</button> <button class="jiedan" @click="jiedan(item)">接单</button></p>
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
        <div class="iframe" v-if="shows">
            <div class="content" v-for="(item,index) in getifream" :key="index">
                <p>
                    <span>{{item.orderTypeId}}</span><span  @click="guanbi">×</span>
                </p>
                <p>{{item.customerAddress}}</p>
                <p>{{item.customerDescrive}}</p>
                <p>{{item.voltage}}  抢修  {{item.distance}}</p>
                <p>{{item.createTime}}</p>
                <p><button @click="guanbi">关闭</button><button  @click="qiangdan(item)">抢单</button></p>
            </div>
        </div>
</div>

</template>

<script>
import { Toast,Dialog} from 'vant'
import qs from 'qs'
export default {
  data () {
    return {
      num: 0,
      animate:false,
      data: [],
      datas:[],
      messages: [],
      electricianId:"321",
      orderId:"",
    //   show:false,
      path:"ws://localhost:8083/websocketserver/",  //websocketserver,
      gettime:"",
      content:"",
      cust:"321",
      img:require('../../../assets/images/startorder.png'),
      img1:require('../../../assets/images/stoporders.png'),
      lay_type:0, 
      socket:"",
      messages1:"",
      getifream:[],
      shows:false
    }
  },
  created () {
    setInterval(this.scroll, 3000)
  },
  mounted(){
        this.getdetail()
        this.getuserinfo()
        this.gettodo(),
        this.getevaluate(),
        this.getmessage()
        this.WebSocketTest()  //websocketserver
        this.getContent()
       
  },
  methods: {
      guanbi(){
          this.shows=false
      },
      qiangdan(item){
          var params={
          "orderId":item.orderId,
          "electricianId":this.electricianId
      }
        this.$axios.get("/orderElectrician/qiangdanrecept", {params}) .then(res => {
            if(res.data.successful==false){
                Toast.fail(`${res.data.resultHint}`,3000)
               
            }else{
                Dialog.alert({
                    message: '抢单成功',
                    width:'300px',
                    confirmButtonColor:"#87cefa"
                }).then(() => {
                    this.$router.push({name:'Appointment',params:{orderId:params.orderId,electricianId:this.electricianId}})
                });
            }
    });
      },
    //   获取电工信息展示接单中或者休息中
       getuserinfo(){
            this.$axios.get("/orderElectrician/queryElectricianInfo/"+this.electricianId).then(res => {
                if(res.data.resultValue.items[0].electricianStatus=='1'){
                    this.lay_type=0
                }else{
                    this.lay_type=1
                }
                });
        },
         //   点击开始接单或者暂停接单
      stylebtn(){
           if(this.lay_type == 0){
               this.lay_type = 1
               var params={statu:"休息中"}
                    params=qs.stringify(params)
                    this.$axios.post("/electricianInfo/changeStatus/321", params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}) .then(res => {
                        });
               
            }else{
                this.lay_type = 0
                  var params={
                        statu:"接单中"
                        }
                params=qs.stringify(params)
                this.$axios.post("/electricianInfo/changeStatus/321", params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}) .then(res => {
                });
            }
      },
    //   获取未读消息条数
      getContent(){
          this.$api.get(`/notifyAnnounceUser/notReadNum/${this.electricianId}`,{
                },res=>{
                    this.content=res.data.resultValue
                    console.log(res)
                })
    },
    // 消息滚屏
      getmessage(){
            this.$api.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":1,"pageSize":5,"filter":["userId=${this.electricianId}","status=0"]}`,{
            },res=>{
                //  console.log(res)
                this.messages=res.data.resultValue.items
                console.log(this.messages)
            })


      },
      getdetail(){
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            if(response.data.resultValue.items==''){
                
            }else{
                var items=response.data.resultValue.items[0]
               if(items.orderElectricianStatus==="8"){
                    this.$router.push({name:'Evaluate',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="9"){
                    this.$router.push({name:'Completed',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="0"){
                    this.$router.push({name:'Appointment',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="21"){
                    this.$router.push({name:'Repair',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="22"){
                    this.$router.push({name:'Prospecting',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="23"){
                    this.$router.push({name:'Uploadcontract',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="24"){
                    this.$router.push({name:'Servicereport',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="25"){
                    //  如果电工上传完待验收 改为只读状态
                    // this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
                    Toast.fail("待用户验收完成")
                }else if(items.orderElectricianStatus==="26"){
                    this.$router.push({name:'Uploadcontract',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="31"){
                    this.$router.push({name:'Completion',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="3"){
                    this.$router.push({name:'Personneladd',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }
            }
            
        });
    },
    //   消息滚屏事件
      scroll(){
            this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                    if(this.messages){
                    this.messages.push(this.messages[0]);  // 将数组的第一个元素添加到数组的
                    this.messages.shift();              //删除数组的第一个元素
                    this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                    }else{
                        
                    }
                    
            },800)
      },
      gomessagedetail(item){
         this.$axios.get(`/notifyAnnounce/read/?params={"filter":["announceId=${item.announceId}","announceUserId=${item.announceUserId}"]}`).then(res => {
                 this.orderId=res.data.resultValue.items[0].orderId
                this.getdetail()
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
        this.$axios.get(`/orderElectrician/esc?orderElectricianId=${item.orderElectricianId}&orderElectricianStatus=5`).then(res => {
            console.log(res)
        }).catch(err => {
            alert(err)
        })

     },
     godetail(item){
         if(item.orderElectricianStatus==="8"){
            this.$router.push({name:'Evaluate',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="0"){
            this.$router.push({name:'Appointment',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="21"){
            this.$router.push({name:'Repair',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="22"){
            this.$router.push({name:'Prospecting',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="23"){
             if(item.orderFrom==="来源APP端"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
             }else{
            this.$router.push({name:'Payment',params:{orderId:item.orderId,electricianId:this.electricianId}})
             }
         }else if(item.orderElectricianStatus==="24"){
            this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="25"){
            //  如果电工上传完待验收 改为只读状态
            // this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
            Toast.fail("待用户验收完成")
         }else if(item.orderElectricianStatus==="26"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="31"){
            this.$router.push({name:'Completion',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="3"){
            this.$router.push({name:'Personneladd',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="4"){
             this.$router.push({name:'Cancelled',params:{orderId:items.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="1"){
             this.$router.push({name:'Cancelled',params:{orderId:items.orderId,electricianId:this.electricianId}})
         }
     },
     gopingjia(item){
          this.$router.push({name:'Evaluate',params:{orderId:item.orderId,electricianId:this.electricianId}})
     },
    gordergrabbing () { 
             　let date=new Date();
            　　if(date.getHours()>=18&&date.getHours()<9){
            　　　this.$dialog.alert({
                        width:"80%",
                        message: "现在是下班时间，不可接单",
                        closeOnClickOverlay:true
                  });
            　　}else{
                    this.$router.push('/ordergrabbing')
            }
    },
    jiedan (item) {
      this.$router.push({name:'Ordergrabbingdetail',params:{orderId:item.orderId,electricianId:this.electricianId}})
    },
    closebtn(){
        this.show=false
    },
    gomyorderabbing () {
      this.$router.push('/myorderabbing')
    },
    gouser () {
      this.$router.push('/userinformation')
    },
    gomessages () {
      this.$router.push('/messages')
    },
    // websocketserver
       WebSocketTest(){
         if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                var uid = "321";
                this.socket = new WebSocket(this.path+uid)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
//                 console.log(this.socket)
            }
    },
    open: function () {
            console.log("socket连接成功")
        },
    error: function () {
        console.log("连接错误")
    },
    getMessage: function (msg) {   //content
        let obj=JSON.parse(msg.data) 
        this.messages1=obj.content
        if(obj.orderId){
             this.$api.get("/orderElectrician/orderDetails/"+obj.orderId, {"electricianId":this.electricianId}, response => {
                console.log(response.data);
                this.shows=true
                this.getifream=response.data.resultValue.items
                console.log(this.getifream)
            });
            // this.$dialog.confirm({
            //     width:"80%",
            //     message: this.messages1,
            //     confirmButtonText: "抢单",
            //     cancelButtonText: "关闭"
            //     })
            // .then((res) => { //点击确认按钮后的调用
            //     this.$router.push({name:'Ordergrabbingdetail',params:{orderId:obj.orderId,electricianId:this.electricianId}})
            // })
        }else{
           this.$dialog.alert({
                width:"80%",
                message: this.messages1,
                closeOnClickOverlay:true
            }).then((res)=>{
                location.reload()
            })
        }

    },
    send: function () {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
    },
  }
}
</script>

<style scoped>

.anim{
    transition: all 0.7s;
    margin-top: -30px;
}
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 240px;
    height: 150px;
    border-radius: 15px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box
  }
  .block p:nth-child(1){
  text-align: right;
  margin-top: 0;
  }
    .block p:nth-child(2){
  font-size: 15px;
  }
   .block p:nth-child(2) span{
  /* font-size: 15px; */
  color: red;
  }
    .block p:nth-child(3){
  font-size: 12px;
  }
  .block p:nth-child(4){
  font-size: 12px;
  }
  .block p:nth-child(5){
  font-size: 12px;
  }
  .block p img{
      width: 10px;
      height: 10px;
      margin-right: 10px;
  }
  .block p{
  margin-top: 5px;
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
position: relative;
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
    height:auto;
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
.contentbox .content .addressbox dt p:nth-child(2){
width: 150px;
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
line-clamp: 2;
-webkit-box-orient: vertical;
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
/deep/ .van-badge  {
  /* display: block; */
  font-size: 10px;
  /* line-height: 16px; */
}
.iframe{
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    display: flex;
    background:rgba(0, 0, 0, 0.4);
}
.iframe .content{
    width: 80%;
    margin: auto;
    height: auto;
    border-radius: 15px;
    background: #fff;
    font-size: 10px;
    padding: 10px;
    box-sizing: border-box;
}
.iframe .content p:nth-child(1){
    display: flex;
    margin-top: 0;
    font-size: 12px;
}
.iframe .content p:nth-child(1) span:nth-child(2){
flex: 1;
text-align: right;
}
.iframe .content p{
margin-top: 5px;
}
.iframe .content p:nth-child(6) button{
    width: 50px;
    text-align: center;
    margin-left: 50px;
    border: 0;
    outline: none;
    background: #fff;
    font-size: 13px;
}
.iframe .content p:nth-child(6){
    margin-top: 10px;
}
.iframe .content p:nth-child(6) button:nth-child(1){
    color:gray
}
.iframe .content p:nth-child(6) button:nth-child(2){
    color:blue
}
</style>>
