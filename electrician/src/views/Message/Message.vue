<template>
  <div class="warp">
    <div class="head">
      <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>消息列表</p>
    </div>
     <main>
           
        <div class="box" v-for="(item,index) in list" :key="index">
          <div class="top"><hoursTip :time="item.createTime"/></div>
          <div class="bottom">
             <div class="bot-top">
                 <div class="act" v-if="item.notifyType==='1'">维修</div>
                 <div class="act" v-else-if="item.notifyType==='2'">支付</div>
                 <div class="act" v-else-if="item.notifyType==='3'">验收</div>
                 <div class="act" v-else-if="item.notifyType==='4'">评价</div>
                  <b>{{item.title}}</b> <span>{{item.createTime}}</span>
             </div>
             <div class="bot-bottom" @click="details(item.announceId,item.orderId)">
               <ul class="left">
                 <li>{{item.content}}</li>
                 <li class="clas" v-show="item.state==='0'? true:false">未读</li>
                   <li class="claa" v-show="item.state==='1'? true:false">已读</li>
               </ul>
               <div class="right" >
                   详情 <img src="@/assets/images/messagejiantou.png" alt="">
               </div>
             </div>
          </div>
        </div>
     </main>
  </div>
</template>

<script>
import hoursTip from "../../components/hoursTip.vue"
import Utils from "../../libs/utils.js"
export default {
  components: {
  },
   data() {
        return {
            cust:"",
            list:"",
            time:"",
            data:[
          {
            time:"上午11:18",
            let:"派单",
            day:"2020/11/09",
            stat:"2020/11/07 11:15:20",
            mame:"刘强"
          },{
            time:"上午12:18",
            let:"评价",
            day:"2020/11/09",
            stat:"2020/11/07 11:15:20",
            mame:"刘强"
          },{
            time:"上午13:18",
            let:"维修",
            day:"2020/11/09",
            stat:"2020/11/07 11:15:20",
            mame:"刘强"
          }
             ],
            announceId:"",
            orderId:""
        }
    },
    inject:['reload'],
      mounted() {
      console.log(this.$route.query.cust)
       this.cust=this.$route.query.cust
       this.getList()
       this.WebSocketTest()
  },
  methods: {
      fh(){
          this.$router.go(-1)
      }, 
      // 获取时间
      times(){
         var aData = new Date()
       this.time =aData.getHours() + ":" + aData.getMinutes()
       console.log(this.time) //2019-8-20 
      },
      // 详请
      details(announceId,orderId){
       console.log(announceId,orderId)
        // console.log(item)
      //   this.$router.push("/details")
      //  this.$bus.$emit("details",{
      //    announceId:item.announceId,
      //    announceUserId:this.cust
      //  })
          this.dawd(announceId)
          this.getdetails(orderId)
          //  this.reload() 
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
      // 获取消息列表
      getList(){
          this.$api.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":1,"pageSize":20,"filter":["userId=${this.cust}","status=2"]}`,{
       },res=>{
          //  console.log(res)
           this.list=res.data.resultValue.items
          //  this.list.sort(Utils.compare())
          //  console.log(this.list)
           this.times()
       })
      },
      WebSocketTest(){
         if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                var uid = "123";
                this.socket = new WebSocket(this.path+uid)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
                console.log(this.socket)
            }
    },
    open: function () {
            console.log("socket连接成功")
        },
    error: function () {
        console.log("连接错误")
    },
    getMessage: function (msg) {
        console.log(msg.data)
    },
    send: function () {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
    },
       showtime(time) {
      let date =
        typeof time === "number"
          ? new Date(time)
          : new Date((time || "").replace(/-/g, "/"));
      let diff = (new Date().getTime() - date.getTime()) / 1000;
      let dayDiff = Math.floor(diff / 86400);

      let isValidDate =
        Object.prototype.toString.call(date) === "[object Date]" &&
        !isNaN(date.getTime());

      if (!isValidDate) {
        window.console.error("not a valid date");
      }
      const formatDate = function(date) {
        let today = new Date(date);
        let year = today.getFullYear();
        let month = ("0" + (today.getMonth() + 1)).slice(-2);
        let day = ("0" + today.getDate()).slice(-2);
        let hour = today.getHours();
        let minute = today.getMinutes();
        let second = today.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      };

      if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
        return formatDate(date);
      }
      return (
        (dayDiff === 0 &&
          ((diff < 60 && "刚刚") ||
            (diff < 120 && "1分钟前") ||
            (diff < 3600 && Math.floor(diff / 60) + "分钟前") ||
            (diff < 7200 && "1小时前") ||
            (diff < 86400 && Math.floor(diff / 3600) + "小时前"))) ||
        (dayDiff === 1 && "昨天") ||
        (dayDiff < 7 && dayDiff + "天前") ||
        (dayDiff < 31 && Math.ceil(dayDiff / 7) + "周前")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: #f3f8fe;
  display: flex;
  flex-direction: column;
}
.head{
    width: 100%;
    height: 50px;
    background: #87CEFA;
    text-align: center;
    p{
        position: relative;
        display: block;
        font-size: 20px;
        color: #fff;
        padding: 10px 10px;
        span{
            position: absolute;
            top:30%;
            left: 5%;
            img{
                width: 80%;
                height: 100%;
            }
        }
    }
}
main{
  flex: 1;
  overflow: auto;
  padding: 0 13px;
   background: #f3f8fe;
   .top{
      text-align: center;
      font-size: 9px;
      color:#989b9d;
      margin: 10px auto;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      span{
        margin-top: 1px;
      }
    }
  .box{
    padding-bottom: 10px;
    .bottom{
      height: 100px;
      border-radius:8px;
      background: #fff;
      padding: 12px 15px;
      .bot-top{
        height: 20px;
        border-bottom:1px solid #ededed ;
        .act{
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 15px;
          line-height: 18px;
          border-radius: 6px 0 6px 0;
             background: #87CEFA;
          float: left;
        }
        .act1{
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 13px;
          border-radius: 6px 0 6px 0;
          background:#ffcd36;
          float: left;
        }
        .act2{
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 13px;
          border-radius: 6px 0 6px 0;
          background:#7ac6f4;
          float: left;
        }
        b{
          margin-left: 5px;
          font-size: 11px;
          float: left;
        } 
        span{
          float:right;
          font-size: 9px;
          color: #c5c5c5;
        }
      }
      .bot-bottom{
        font-size: 12px;
        padding: 10px 0; 
        .left{
          width: 85%;
          float: left;
          li{
            margin: 5px 0; 
            line-height: 20px;
           overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          
          }
          .clas{
            color: #7ac6f4;
          }
          .claa{
           color: #c5c5c5;
          }
        }
        .right{
          float: right;
          margin-top: 10px;
          color: #6cb4e3;
          img{
            width: 10%;
            height: 10px;
          }
        }
      }
    }
  }
}


</style>
