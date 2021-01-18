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
          :width="360"
        >
          <van-swipe-item v-for="(item,index) in messages" :key="index" @click="swipe(item.announceId,item.orderId)">
            系统消息:  {{item.content}}
          </van-swipe-item>
        </van-swipe>
        <img src="../../../assets/images/messagejiantou.png" alt="">
      </van-notice-bar>
    </nav>
    <section>
    <div class="tab-box">
        <ul>
              <li v-for="(item,index) in tabs" :key="index" :class="{active:num==index}" @click="nums(index)">{{item}}</li>
        </ul>
    </div>
    <div class="contentbox">
        <div class="content" v-show="num==0" v-for="(item,index) in toPay" :key="index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p></p>
                <p v-if="item.orderStatus=='0'">上门费 {{item.customerPrice }}</p>
                <p v-else>维修费 {{item.electricianPrice }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId,item.orderStatus)">
                       <p>{{ item.customerDescrive }}</p>
                       <p>{{ item.createTime }}</p>
                    </dt>
                    <dd v-if="item.orderStatus=='0'">
                        <button @click="cancel(item.orderId)">取消</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                         <van-dialog v-model="show" title="" show-cancel-button class="show" 
                        @confirm="confirm(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定取消订单吗？取消订单后不能回复</div>
                          </van-dialog>
                    </dd>
                    <dd v-else>
                         <button @click="thshow(item.orderId)">退回</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                         <van-dialog v-model="ths" title="" show-cancel-button class="show" 
                        @confirm="th(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定退回订单吗？退回订单后不能回复</div>
                          </van-dialog>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==1" v-for="(item,index) in toAccepted" :key="'in'+index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p></p>
                <p>{{item.finishTime}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId,item.orderStatus)">
                        <p>{{ item.customerDescrive }}</p>
                       <p>电工完工的情况描述</p>
                    </dt>
                    <dd v-if="item.orderComplaintId==null">
                       <button @click="complaint(item.orderId)">投诉</button> <button class="zf" @click="yanshou(item.orderId)">验收通过</button>
                    </dd>
                     <dd v-else>
                       <button class="zf" @click="yanshou(item.orderId)">验收通过</button>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==2" v-for="(item,index) in toEvaluated" :key="'info2'+index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p>{{item.orderStatus}}</p>
                  <p>{{ item.finishTime }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId,item.orderStatus)">
                        <p>{{ item.customerDescrive }}</p>
                        <p v-if="item.orderStatus=='0'">上门费 {{item.customerPrice }}</p>
                        <p v-else>维修费 {{item.electricianPrice }}</p>
                      
                    </dt>
                    <dd>
                        <button class="zf" @click="estimate(item.orderId)">评价</button>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</section>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "Home",
  components: {},
  data() {
    return {
      tabs: ['待支付', '待验收', '待评价'],
      num: "",
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
      messages: [
        { name: "3阿打算打算打24日凌晨24:00开始停机更新3" },
        { name: "4本系萨达四大晨24:00开始停机更新4" },
      ],
      activeName: "a",
      active: "0",
      content:"",
      toPay:[],
      toAccepted:[],
      toEvaluated:[],
      cust:"customer001",
      orderId:"",
      items:{},
      show:false,
      ths:false,
      path:"ws://localhost:8083/websocketserver/",  //websocketserver
      messages:""
    };
  },
  inject:['reload'],
  created () {
    localStorage.setItem("customerId",this.cust)
    
  },
  mounted() {
    this.getContent(),  //获取未读消息数量
    this.getGunlist()   // 获取滚动数据
    this.getlist()   //获取订单数据
     this.WebSocketTest()  //websocketserver
  },
  methods: {
    nums(index){
     this.num=index
    },
    nalist(index) {
      if (index === 0) {
        this.$router.push({
          path:"/demand",
          query:{
            cust:this.cust
          }
        });
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
          cust:this.cust
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
        this.$dialog.confirm({
      width:"80%",
      message:'确定通过验收吗？'
    }).then(()=>{
      this.orderId=orderId
      this.items={}
      this.orderId=orderId
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
    // 点击确认时
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
                this.items).then(res=>{
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
          this.$axios.post("/orderCustomer/save",this.items).then(res=>{
            if(res.data.successful==false){
                     console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('退回成功')
                  } 
          })   
     },
    // 获取滚动消息数据
    getGunlist(orderId){
      this.$api.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":1,"pageSize":5,"filter":["userId=${this.cust}","status=0"]}`,{
       },res=>{
          //  console.log(res)
           this.messages=res.data.resultValue.items
       })
    },
    getlist(){
       this.$api.get(`/orderCustomer/queryAllToBegin?params={"pageIndex":1,"pageSize":20,"filter":"customerId=${this.cust}"}`,{
       },res=>{
         console.log(res.data)
         res.data.resultValue.items.forEach(item => {
           this.orderId=item.orderId
           if(item.orderStatus==="0" ||item.orderStatus==="23" ){
              this.toPay.push(item)
           }else if(item.orderStatus==="25" ){
               this.toAccepted.push(item)
              //  console.log( "25",this.toAccepted )
           }else if(item.orderStatus==="8" ){
               this.toEvaluated.push(item)
              //  console.log( this.toEvaluated,"8")
           }
         });
       })
    },
    getContent(){
          this.$api.get(`/notifyAnnounceUser/notReadNum/${this.cust}`,{
                },res=>{
                  // console.log(res)
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
          this.$axios.get(`/notifyAnnounce/read/?params={"filter":["announceId=${this.announceId}","announceUserId=${this.cust}"]}`,{
       },res=>{
          //  console.log(res.data)
       })
      },
      // 点击获取详情数据
      getdetails(orderId){
        this.orderId=orderId
        this.$api.get(`/orderCustomer/OrderDetail/${this.orderId}`,{   
        },res=>{
          console.log(res.data.resultValue.items[0])
         let orderStatus=res.data.resultValue.items[0].orderStatus
        switch (orderStatus) {
        case "20":   //待预约
          this.$router.push({
            path:"/stayMake",
            query:{
              orderId:this.orderId
            }
          })
          break;
        case "23":  //待现场勘查察
            this.$router.push({
           path: `/Pay/${this.orderId}`,
          })
          break;                
        default:
          break;
      }
        })
      },
    // 详情
    about(orderId,orderStatus){
      this.orderId=orderId
       switch (orderStatus) {
        case "8":  //待评价
          this.$router.push({
            path:"/complete",
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
        case "0":  //待支付
           this.$router.push({
           path: `/Pay/${this.orderId}`,
          })
          break;
          case "23":  //待维修费
           this.$router.push({
           path: `/Pay/${this.orderId}`,
          })
          break;
      }
    },
    // websocketserver
       WebSocketTest(){
         if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                var uid =this.cust
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
//         console.log(msg)
        let obj=JSON.parse(msg.data) 
        // console.log(obj.content)
        this.messages=obj.content
        // console.log(this.messages)
          this.$dialog.alert({
              width:"80%",
              message: this.messages,
              closeOnClickOverlay:true
            });
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
    left: 30%;
   width:15px;
    height: 15px;
    line-height: 15px;
    background: red;
    border: none;
  }
  .badge {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 7%;
    left: 3%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wo {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 7%;
    right: 3%;
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
    justify-content: space-evenly;

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
         img{
           position: absolute;
           right: 0%;
           top: 30%;
           width: 6px;
         }
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
  background-color: rgba(0,0,0,.3);
}
/deep/ .van-sticky{
  background: #f3f8fe;
}
</style>
