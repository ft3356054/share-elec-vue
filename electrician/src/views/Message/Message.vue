<template>
  <div class="warp">
    <div class="head">
      <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>消息列表</p>
    </div>
     <main>
        <!-- 无数据时的展示 -->
     <div class="no-comment" v-if="this.list.length==0">
        <img src="../../assets/images/wu.png" alt="">
        <span>暂无消息!</span>
     </div> 
         <van-pull-refresh  v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
		    	<van-list 
                v-model="loading"
            :finished="finished"
            :immediate-check="false"
            :finished-text="this.finName"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            :offset="10"
          >
					  <div class="box" v-for="(item,index) in list" :key="index">
          <!-- <div class="top"><hoursTip :time="item.createTime"/></div> -->
         <div class="top" v-text="transTime(item.createTime)"></div>
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
			</van-list>
		</van-pull-refresh>
      
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
            list:[],
            time:"",
            announceId:"",
            orderId:"",
            socket:'',
            isLoading: false, //下拉刷新
			    	loading: false,    //上拉加载
            finished: false,  //下拉完成
            upFinished: false, //上拉加载完毕
            offset: 20, //滚动条与底部距离小于 offset 时触发load事件
            pageNumber:1,
            pageSize:5,
            pageIndex:1,
            itemCount:0,//总条数
            finName:"已全部加载完成",
            timer:null  //定时器
        }
    },
    inject:['reload'],
      mounted() {
      // console.log(this.$route.query.cust)
       this.cust=this.$route.query.cust
       this.getList()
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
      //  console.log(announceId,orderId)
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
    async  getList(){
      this.pageIndex=this.pageNumber*this.pageSize-(this.pageSize-1)
          this.$api.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":${this.pageIndex},"pageSize":${this.pageSize},"filter":["userId=${this.cust}","status=2"]}`,{
       },res=>{
           console.log(res.data)
          this.list = res.data.resultValue.items    //datas是列表集合
          this.itemCount = res.data.resultValue.itemCount;  //总条数
             // itemCount是后台返回的列表总条数
             if(res.data.resultValue.itemCount === this.list.length){
                 this.finished = true
            }else {
                this.finished = false
             }
             this.pageNumber=2
             this.isLoading = false
             this.loading = false
       })
        this.finName="已全部加载完成"
          setTimeout(()=>{
                 this.finName=""
                              },5000)
      },
      // 展示消息时间
      transTime (time) {
      time=new Date(time).valueOf()
      // console.log(time)
    let toDay = (new Date()).getDate() // 今天是哪号
    let timeDay = (new Date(time)).getDate() // 时间缀转为具体的哪一号
    var toYear = (new Date()).getFullYear() // 获取年
    var timeYear = (new Date(time)).getFullYear() // 获取年

    var toMonth = (new Date()).getMonth() + 1 // 获取月
    var timeMonth = (new Date(time)).getMonth() + 1 // 获取月
    let myMonth = toMonth - timeMonth
    let toHours = (new Date()).getHours() // 获取小时
    let timeHours = (new Date(time)).getHours() // 获取小时
    let Minutes = (new Date()).getMinutes() // 获取分钟
    let timeMinutes = (new Date(time)).getMinutes() // 获取分钟
    if (timeHours < 10) {
      timeHours = '0' + timeHours
    }
    if (Minutes < 10) {
      Minutes = '0' + Minutes
    }
    // console.log(toYear, timeYear)
    if (toYear - timeYear > 0) {
      let tm = timeMonth
      if (tm < 10) {
        tm = ('0' + tm)
      }
      let td = timeDay
      if (td < 10) {
        td = ('0' + td)
      }
      // console.log('一年前')
      // console.log(timeYear + '-' + timeMonth + '-' + timeDay)
      return (timeYear + '-' + tm + '-' + td + ' ' + timeHours + ':' + Minutes)
    }
    // 大于一周
    // console.log(toDay, timeDay)
    if ((myMonth === 0) && ((toYear - timeYear) === 0)) {
      // 本月
      // 一周内的
      if ((toDay - timeDay) === 0) {
        // 日期是今天的
        // 一个小时内3分钟前的
        // 15分内3分前的
        if ((toHours - timeHours) === 0) {
          // 一个小时内
          let xz = ((new Date()) - time) / 60000
          let fz = Math.floor(xz)
          if (fz > 3) {
            return Math.floor(xz) + '分钟前'
          }
        } else {
          // 大于一个小时
          if (timeMinutes < 10) {
            timeMinutes = '0' + timeMinutes
          }
          return (timeHours + ':' + timeMinutes)
        }
      } else if (((toDay - timeDay) >= 1) && (toDay - timeDay <= 7)) {
        // 1周内的
        let weekTime = (new Date(time)).getDay()
        let weekD
        if (weekTime === 0) weekD = '星期日'
        if (weekTime === 1) weekD = '星期一'
        if (weekTime === 2) weekD = '星期二'
        if (weekTime === 3) weekD = '星期三'
        if (weekTime === 4) weekD = '星期四'
        if (weekTime === 5) weekD = '星期五'
        if (weekTime === 6) weekD = '星期六'
        // console.log(weekD)
        return (weekD + ' ' + timeHours + ':' + Minutes)
        // console.log('昨天')
      } else {
        // 大于一周显示日期（如：3月25日
        let tm = timeMonth
        if (tm < 10) {
          tm = ('0' + tm)
        }
        let td = timeDay
        if (td < 10) {
          td = ('0' + td)
        }
        return (timeYear + '-' + tm + '-' + td + ' ' + timeHours + ':' + Minutes)
      }
    }
    if ((myMonth > 0) && ((toYear - timeYear) === 0)) {
      // 大于1个月，同一年的
      let tm = timeMonth
      if (tm < 10) {
        tm = ('0' + tm)
      }
      let td = timeDay
      if (td < 10) {
        td = ('0' + td)
      }
      return (timeYear + '-' + tm + '-' + td + ' ' + timeHours + ':' + Minutes)
    }
     },
      onRefresh() {
		      setTimeout(() => {
            this.isLoading = false;
            this.list=[]
            this.pageNumber=1
            this.getList()
            this.finName="已全部加载完成"
		      }, 1000);
		    },
		  async  onLoad() {
      this.tomer=setTimeout(() => {
          this.pageIndex=this.pageNumber*this.pageSize-(this.pageSize-1)
             this.$api.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":${this.pageIndex},"pageSize":${this.pageSize},"filter":["userId=${this.cust}","status=2"]}`,{
       },res=>{
           let datas= res.data.resultValue.items    //datas是列表集合
           this.list=this.list.concat(datas)
          this.itemCount = res.data.resultValue.itemCount;  //总条数
             // itemCount是后台返回的列表总条数
             if(res.data.resultValue.itemCount > this.list.length){
                         this.pageNumber++
                        this.loading = false
                    }else{
                        this.finished = true
                        this.loading = true
                        setTimeout(()=>{
                                    this.finName=""
                              },10000)
                    }
           })
          }, 2000);
		    }
  },
  beforeDestroy() {
       clearTimeout(this.timer)
       this.timer=null
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
      margin: 5px auto;
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
.no-comment{
  margin-top: 100px;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  span{
    position: absolute;
    left: 36%;
    bottom: 0px;
  }
}
/deep/ .van-list{
  position: relative;
}
/deep/ .van-list>.van-list__finished-text{
            // position: fixed;
            // bottom: 50px;
            // left: 33%;
            transition-duration: 0;
}
</style>
