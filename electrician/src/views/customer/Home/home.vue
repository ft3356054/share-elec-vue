<template>
  <div class="home">
    <header>
      <!-- <img src="@/assets/image/banner.png" alt="" /> -->
      <!-- 消息 -->
      <div class="badge" @click="toMessage()">

        <div class="aa" v-if="content=='0'? true : false ">
             <img src="@/assets/images/message.png" alt="" />
        </div>
        <div class="aa" v-else>
          <van-badge  :content="this.content" max="99">
          <img src="@/assets/images/message.png" alt="" />
          </van-badge>
        </div>
       
      </div>
      <div class="wo" @click="toMy()">
        <img src="@/assets/images/information.png" alt="" />
      </div>
    </header>
    <nav>
      <div class="top">
        <dl v-for="(item, index) in navlist" :key="index">
          <dt><img :src="item.img" alt="" @click="nalist(index)" /></dt>
          <dd>
            <b>{{ item.name }}</b>
          </dd>
        </dl>
      </div>
      <van-notice-bar :scrollable="false">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
           width="96%"
        >
          <van-swipe-item v-for="(item,index) in messages1" :key="index" @click="swipe(item.announceId,item.orderId)">
            系统消息:  {{item.content}}
          </van-swipe-item>
        </van-swipe>
      
      </van-notice-bar>
        <img class="imgs" src="../../../assets/images/messagejiantou.png" alt="">
    </nav>
    <section>
    <div class="tab-box">
        <ul>
              <li v-for="(item,index) in tabs" :key="index" :class="{active:num==index}" @click="nums(index)">{{item}}</li>
        </ul>
    </div>
                     <!-- 无数据时的展示 -->
      <div class="no-comment" v-if="this.list==[]||this.list.length===0">
        <img src="../../../assets/images/wu.png" alt="">
        <span>暂无数据!</span>
     </div>
    <div  class="contentbox">
         <div  class="content" v-show="num==0" v-for="(item,index) in list" :key="index">
          <div class="tab">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p></p>
                <p v-if="item.orderStatus=='0'">上门费 {{item.customerPrice }}</p>
                <p v-else>维修费 {{item.electricianPrice }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId)">
                       <p>{{ item.customerDescrive }}</p>
                       <p>{{ item.createTime }}</p>
                    </dt>
                    <dd v-if="item.orderStatus=='0'">
                        <button @click="cancel(item.orderId)">取消</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                         <van-dialog v-model="show" title="" show-cancel-button class="show" 
                        @confirm="confirm(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定取消订单吗？</div>
                          </van-dialog>
                    </dd>
                    <dd v-else>
                         <button @click="thshow(item.orderId)">退回</button> <button class="zf" @click="qd(item.orderId)">确认</button>
                         <van-dialog v-model="ths" title="" show-cancel-button class="show" 
                        @confirm="th(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定退回订单吗？</div>
                          </van-dialog>
                    </dd>
                </dl>
            </div>
          </div>
        </div> 
        <div class="content" v-show="num==1" v-for="(item,index) in list" :key="'in'+index">
           <div class="tab">
               <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p></p>
                <p>{{item.finishTime}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId)">
                        <p>{{ item.customerAddress }}</p>
                        <p>{{ item.customerDescrive }}</p>
                        <p v-show="item.orderTypeId=='0'">{{ item.voltage }} 故障抢修</p>
                        <p v-show="item.orderTypeId=='1'">{{ item.voltage }} 检修</p>
                        <p v-show="item.orderTypeId=='2'">{{ item.voltage }} 巡视</p>
                        <p v-show="item.orderTypeId=='3'">{{ item.voltage }} 试验</p>
                        <p v-show="item.orderTypeId=='4'">{{ item.voltage }} 其他</p>
                    </dt>
                    <dd v-if="item.orderComplaintId==null">
                       <button @click="complaint(item.orderId)">投诉</button> <button class="zf" @click="yanshou(item.orderId)">验收</button>
                    </dd>
                     <dd v-else>
                         <span class="jinxing">投诉处理中</span> 
                    </dd>
                </dl>
            </div>
           </div>
        </div>
        <div class="content" v-show="num==2" v-for="(item,index) in list" :key="'info2'+index">
          <div class="tab">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p></p>
                  <p>{{ item.finishTime }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId)">
                        <p>{{ item.customerDescrive }}</p>
                        <p>维修费 {{item.electricianPrice }}</p>
                    </dt>
                    <dd>
                        <button class="zf" @click="estimate(item.orderId)">评价</button>
                    </dd>
                </dl>
            </div>
          </div>
        </div>
    </div>
</section>
  </div>
</template>

<script>
import { Toast } from 'vant';
import {mapActions ,mapState} from "vuex"
export default {
  name: "Home",
  components: {},
  data() {
    return {
      tabs: ['待确认','待验收', '待评价'],
      num: 0,
      navlist: [
        {
          img: require("@/assets/images/woyaofadan.png"),
          name: "我要发单",
        },
        {
          img: require("@/assets/images/wodedingdan.png"),
          name: "我的订单",
        },
        {
          img: require("@/assets/images/yongdianzixun.png"),
          name: "用电资讯",
        },
      ],
      messages1: [],
      activeName: "a",
      active: "0",
      content:"",
      list:[],
      cust:"customer001",
      orderId:"",
      items:{},
      show:false,
      ths:false,
      path:"ws://localhost:8083/websocketserver/",  //websocketserver
      messages:"",
      realNameAuth:"0",
      opid:"",
      names:"",
      districtid:""
    };
  },
  inject:['reload'],
  created () {
    this.initData()  //获取信息
  },
  mounted() {
    //  this.realNameAuth=localStorage.getItem("realNameAuth")
    // this.cust=localStorage.getItem("customerId")
       localStorage.setItem("realNameAuth",this.realNameAuth)
      localStorage.setItem("customerId",this.cust)
    this.getContent(),  //获取未读消息数量
    this.getGunlist()   // 获取滚动数据
    this.getlist(this.num)   //获取订单数据
     this.WebSocketTest()  //websocketserver
     this.initData()  //获取信息
     this.next()
   
  },
  methods: {
        // 获得初始化数据，获取token,userid
    initData(){
       let _this=this
       if(window.uexCore){
         uexCore.init(JSON.stringify({}),function(data){
           if(data.code=='1'){
              console.log(data.data.userId,"用户") //获取用户的id
              console.log(data,"信息") //获取用户的id
              // opid=data.data.userId
              // names=data.data.realName_dst
              _this.$store.commit('opid',data.data.userId)  //用户姓名
              _this.$store.commit('districtid1',data.data.districtid)  //用户区域
              _this.$store.commit('names',data.data.realName_dst)  //用户姓名 
              _this.opid=data.data.userId
              console.log( _this.opid,"id") //获取用户的id
           }
         })
       }
    },
    next(){
      this.districtid=this.$store.state.districtid
      this.names=this.$store.state.name
      this.opid=this.$store.state.userId
       console.log(this.names,"用户姓名")
      console.log(this.opid,"用户编号")
      console.log(this.districtid,"地区编号")
      localStorage.setItem("name",this.names)
          this.$axios.get(`/index/findIndexPage/${this.opid}}`,{withCredentials: true},{
              }).then(res=>{
                      //  console.log(res.data,"信息1")
                      if(res.data.successful==false){
                        console.log(res.data.resultHint)
                          Toast.fail(res.data.resultHint)
                      }else{
                        console.log(res.data.resultValue.toPage,"sss")
                          if(res.data.resultValue.toPage=="0"){
                              this.cust=res.data.resultValue.userId
                            localStorage.setItem("customerId",this.cust)
                              // this.$router.push("/")
                          }else if(res.data.resultValue.toPage=="1"){
                            this.cust=res.data.resultValue.userId
                             localStorage.setItem("electricianend",this.cust)
                              // this.$router.push("/electricianend")
                          }
                      } 
              })
    },
    nums(index){  
      console.log("dad",index)
     this.getlist(index)
    },
    nalist(index) {
      if (index === 0) {
               　let date=new Date();
        // console.log(date.getHours())
            　　if( date.getHours()>=9 && date.getHours() <=24 ){  //18
                      this.$router.push({
                        path:"/demand",
                        query:{
                          cust:this.cust
                        }
                      });
            　　}else{
                  　this.$dialog.alert({
                        width:"80%",
                        message: "现在是下班时间，不可发单",
                        closeOnClickOverlay:true
                  });
            }
       
      } else if (index === 1) {
        this.$router.push({
          path:"/order",
          query:{
             cust:this.cust
          }
        });
      } else if (index === 2) {
        this.$router.push("/infrom");
      }
    },
    // 个人信息
    toMy() {
      this.$router.push({
        path:"/My",
        query:{
          customerId:this.cust
        }
      });
    },
    // 消息
    toMessage() {
       this.$router.push({
        path:"/Message",
        query:{
          cust:this.cust
        }
      });
    },
    // 支付
    zf (orderId) {
      this.$router.push({
        path: `/Pay/${orderId}`,
      })
    },
    // 验收通过
    yanshou(orderId){
       this.orderId=orderId
        this.$dialog.confirm({
      width:"80%",
      message:'确定通过验收吗？'
    }).then(()=>{
      this.items={}
         var fd = new FormData()
         this.items=fd
      this.items.append("items",
             `{"orderId":"${this.orderId}",  
                "orderStatus":"8",
                }`)
           this.$axios.post(
                `/orderCustomer/save`,
               this.items
              ).then(res=>{
                if(res.data.successful==false){
                     console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('验收通过')
                        this.reload() 
                  } 
              })  
      })
       .catch(() => {
         // on cancel
        });         
     
    },
    // 投诉
    complaint(orderId){
       this.orderId=orderId
      this.$router.push({
        path:"/complaint",
        query:{
          orderId:this.orderId
        }
      })
    },
    // 评价
    estimate(orderId){
       this.orderId=orderId
        this.$router.push({
        path:"/estimate",
        query:{
          orderId:this.orderId
        }
      })
    },
       // 取消
    cancel(){
      this.show=true       
    },
    // 点击取消时
    cancels(){
     this.show=false
     this.ths=false
    },
    //  取消弹框  点击确认时
    confirm(orderId){
        this.orderId=orderId
         var fd = new FormData()
         this.items=fd
      this.items.append("items",
             `{"orderId":"${this.orderId}",  
                "orderStatus":"4",
                }`)
           this.$axios.post(
                `/orderCustomer/save`,
                this.items,{withCredentials: true}).then(res=>{
                  if(res.data.successful==false){
                     console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('取消成功')
                        this.reload() 
                  } 
                });
    },
    // 点击退回
    thshow(){
      this.ths=true
    },
      //   退回
     th(orderId){
         this.orderId=orderId
         var fd = new FormData()
         this.items=fd
      this.items.append("items",
             `{"orderId":"${this.orderId}",  
                "orderStatus":"26",
                }`)
          this.$axios.post("/orderCustomer/save",this.items,{withCredentials: true}).then(res=>{
            if(res.data.successful==false){
                     console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('退回成功')
                       this.reload() 
                  } 
          })   
     },
    //  确定
     qd(orderId){
        this.orderId=orderId
      var fd = new FormData()
                      this.items=fd
                  this.items.append("items",
                          `{"orderId":"${this.orderId}",  
                              "orderStatus":"3",
                              }`)
                      this.$axios.post("/orderCustomer/save",this.items).then(res=>{
                          if(res.data.successful==false){
                                  // console.log(res.data.resultHint)
                                  Toast.fail(res.data.resultHint)
                              }else{
                                  Toast.success('确定成功')
                                   this.reload() 
                              } 
                      })   
     },
    // 获取滚动消息数据
    getGunlist(orderId){
      this.$axios.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":1,"pageSize":5,"filter":["userId=${this.cust}","status=0"]}`,{withCredentials: true},{
       }).then(res=>{
          //  console.log(res)
           this.messages1=res.data.resultValue.items
       })
    },
    getlist(index){
        this.num=index
             this.list=[]
       this.$axios.get(`/orderCustomer/queryAllToBegin?params={"pageIndex":1,"pageSize":20,"filter":["customerId=${this.cust}","tagType=${this.num}"]}`,{withCredentials: true},{
       }).then(res=>{
        //  console.log(res.data,"sss")
         this.list=res.data.resultValue.items
       })
    },
    getContent(){
          this.$axios.get(`/notifyAnnounceUser/notReadNum/${this.cust}`,{withCredentials: true},{
                }).then(res=>{
                  // console.log(res.data)
                    this.content=res.data.resultValue
                      // console.log(this.content)
                })
    },
    // 系统消息 
    swipe(announceId,orderId){
          this.dawd(announceId)
          this.getdetails(orderId)
    },
     // 点击未读变已读
      dawd(announceId){
         this.announceId=announceId
          this.$axios.get(`/notifyAnnounce/read/?params={"filter":["announceId=${this.announceId}","announceUserId=${this.cust}"]}`,{withCredentials: true},{
       }).then(res=>{
          //  console.log(res.data)
       })
      },
      // 点击获取详情数据
      getdetails(orderId){
        this.orderId=orderId
        this.$axios.get(`/orderCustomer/OrderDetail/${this.orderId}`,{withCredentials: true}).then(res=>{
          console.log(res.data.resultValue.items[0])
         let orderStatus=res.data.resultValue.items[0].orderStatus
        switch (orderStatus) {
        case "4":   //以取消
          this.$router.push({
            path:"/cancelled",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "9":  //以完成
          this.$router.push({
            path:"/complete",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "8":  //待评价
          this.$router.push({
            path:"/complete",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "21":  //未到达现场
          this.$router.push({
            path:"/noArrived",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "3":   //待维修
          this.$router.push({
            path:"/stayRepair",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "20":   //待预约
          this.$router.push({
            path:"/stayMake",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "25":   //待验收
          this.$router.push({
            path:"/accepted",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "1":  //待接单
          this.$router.push({
            path:"/stayOrder",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "11": //待接单
          this.$router.push({
            path:"/stayOrder",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "22":  //待现场勘查察
          this.$router.push({
            path:"/stayScene",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "0":  //待支付
           this.$router.push({
           path: `/Pay/${this.orderId}`,
          })
          break;
        case "23":  //等待用户确认维修费
            this.$router.push({
             path:"/confirmed",
            query:{
              orderId:this.orderId
            }
          })
          break;                
        case "31":  //施工中
          this.$router.push({
            path:"/details",
            query:{
              orderId:this.orderId
            }
          })
          break;
           case "24":  //施工中   施工完成
          this.$router.push({
             path:"/details",
            query:{
              orderId:this.orderId
            }
          })
          break;
          case "26":  //现场探查完成
          this.$router.push({
            path:"/prodemo",
            query:{
              orderId:this.orderId
            }
          })
          break;
        default:
          break;
      }
        })
      },
    // 详情
    about(orderId){
      this.getdetails(orderId)
    },
    // websocketserver
       WebSocketTest(){
         if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                var uid =this.cust
                if( this.socket==null){
                    this.socket = new WebSocket(this.path+uid)
                }
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
//         console.log(msg)
        let obj=JSON.parse(msg.data) 
        // console.log(obj.content)
        this.messages=obj.content
        // console.log(this.messages)
          this.$dialog.alert({
              width:"80%",
              message: this.messages,
              closeOnClickOverlay:true
            }).then(()=>{
              //  this.$router.push("/customer")
               this.reload() 
            })
    },
    send: function () {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f3f8fe;
  display: flex;
  flex-direction: column;
}
/deep/ .notice-swipe .van-swipe{
  width: 100%;
}
header {
  width: 100%;
  height: 215px;
  // position: relative;
  background: url("../../../assets/images/banner.png") no-repeat 0 0;
  background-size: 100% 100%;
  img {
    width: 100%;
    height: 100%;
  }
 /deep/ .van-badge--fixed{
   position: absolute;
   top: 15%;
  //   left: 30%;
  //  width:30px;
    height: 15px;
    line-height: 15px;
    background: red;
    font-size: 12px;
    // border: none;
  }
  .badge {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 4%;
    left: 4%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wo {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 4%;
    right: 4%;
  }
}
nav {
  width: 94%;
  margin: 0 auto;
  height: 142px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 10px #daeaf4;
  margin-top: -70px;
      position: relative;
  .top {
    border-radius: 8px;
    width: 100%;
    height: 110px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    dl {
      margin: 20px 0;
      dt {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        margin-top: 5px;
        font-size: 12px;
        color: #333333;
        text-align: center;
      }
    }
  }
 /deep/ .van-notice-bar{
      background: #f3f8fe;
        font-size: 10px;
        border-radius: 0 0 8px 8px;
        border: 1px solid #f3f8fe;
         height: 34px;
         padding-right: 10px;
           overflow: hidden;
        text-overflow: ellipsis;
         white-space: nowrap;
         position: relative;
         width: 100%;
       
 }
   .imgs{
           position: absolute;
           right: 3%;
           top: 86%;
           width: 6px;
         }
  /deep/ .notice-swipe {
    height: 32px;
    line-height: 32px;
    font-size: 10px;
     color: #2991e2;
  }
   /deep/ .notice-swipe>.van-swipe{
     width: 100%;
   }
 /deep/ .van-swipe-item{
    width: 95%;
    overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  }
}


section{
    flex: 1;
    overflow: auto;
        display: flex;
    flex-direction: column;
}
section::-webkit-scrollbar{
    width: 0;
}
section .tab-box{
    width: 100%;
    height: 30px;
    margin-top: 10px;
}
section .tab-box ul{
width: 100%;
height: 100%;
line-height: 37px;
padding-left: 25px;
color: #828284;
font-size: 12px;
}
section .tab-box ul li{
list-style: none;
float: left;
margin-left: 25px;
}

section .contentbox{
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
    margin-top: 20px;
}
section .contentbox::-webkit-scrollbar{
    width: 0;
}
section .contentbox .content{
    width: 100%;
    height: auto;
    border-radius: 8px;
    background: #ffffff;
    padding: 15px 12px;
    box-sizing: border-box;
    margin-bottom: 10px;
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
margin-top: 10px;
}
section .contentbox .content .addressbox dt p{
    padding: 0;
   margin: 5px 0;
    display: -webkit-box;
    font-size: 11px;
    line-height:14px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
section .contentbox .content .addressbox dd{
padding: 0;
margin: 0;
text-align: right;
padding-left: 10px;
box-sizing: border-box;
}
section .contentbox .content .addressbox dd button{
padding: 0 10px;
height: 20px;
border-radius: 20px;
outline: none;
border: 0;
background: #ffffff;
border: 1px solid #aeaeae;
margin-top: 20px;
box-sizing: border-box;
color: #666666;
font-size: 10px;
}
section .contentbox .content .addressbox dd .zf{
border-color: #52aae1;
color: #52aae1;
}
.active{
    color: #54abe1;
    border-bottom: 3px solid #2293d8;
box-sizing: border-box;
font-size: 14px;
}
/deep/ .show{
    width: 80%;
  
   .box{
    width: 100%;
    font-size: 13px;
    height: 80px;
    text-align: center;
    line-height: 80px;
  }
  button{
    font-size: 13px;
  }
}
/deep/ .van-overlay{
  background-color: rgba(0,0,0,.5);
}
/deep/ .van-sticky{
  background: #f3f8fe;
}
.no-comment{
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  span{
    position: absolute;
    left: 40%;
    bottom: 0px;
    font-size: 13px;
  }
}
.jinxing{
   display:block;
  color: #abd6f0;
   margin-top: 50%;
  font-size: 14px;
}
</style>
