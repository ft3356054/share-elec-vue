<template>
    <div class="contianer">
      
        <header>
             <p  @click="goback"><img src="@/assets/images/jiantou.png" alt=""></p>
            <p>消息列表</p>
        </header>
               <!-- 无数据时的展示 -->
    
        <section>
          <div v-if="this.data.length===0" class="no-comment">
                <img src="@/assets/images/wu.png" alt="">
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
             <div class="" v-for="(item,index) in data" :key="index" @click="seebtn(item)">
                 <div class="top" v-text="transTime(item.createTime)"></div>
                 <div class="content">
                       <div class="typebox">
                          <p><span>类别</span><span>{{item.title}}</span></p>
                          <p></p>
                          <p>{{item.createTime}}</p>
                      </div>
                <div class="addressbox">
                    <dl>
                        <dt>
                            <p>{{item.content}}</p>
                            <p v-if="item.state==='1'" style="color:blue;margin-top:15px">已读</p>
                            <p v-else style="color:red;margin-top:15px">未读</p>
                        </dt>
                        <dd>
                            <button class="jiedan">查看 <img src="@/assets/images/messagejiantou.png" alt=""></button>
                        </dd>
                    </dl>
                </div>
                 </div>
              
            </div>
            </van-list>
            </van-pull-refresh>
        </section>

        
    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
  data () {
    return {
      data: [],
      path:"ws://localhost:8083/websocketserver/",
      socket:'',
      electricianId:"321",
      orderId:"",
      order_status: 1, //标签默认
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
    }
  },
  inject:['reload'],
  mounted () {
      this.WebSocketTest()
      this.message()
  },
  methods: {
     onRefresh() {
		      setTimeout(() => {
            this.isLoading = false;
            this.data=[]
            this.pageNumber=1
            this.message()
            this.finName="已全部加载完成"
		      }, 1000);
		    },
    onLoad(){
        // this.tomer=setTimeout(() => {
          this.pageIndex=this.pageNumber*this.pageSize-(this.pageSize-1)
             this.$api.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":${this.pageIndex},"pageSize":${this.pageSize},"filter":["userId=${this.electricianId}","status=2"]}`,{
       },res=>{
           let datas= res.data.resultValue.items    //datas是列表集合
           this.data=this.data.concat(datas)
          this.itemCount = res.data.resultValue.itemCount;  //总条数
             // itemCount是后台返回的列表总条数
             if(res.data.resultValue.itemCount > this.data.length){
               this.pageNumber++
                        this.loading = false
                    }else{
                        this.finished = true
                        this.loading = true
                        // this.finName=''
                    }
           })
          // }, 2000);
    },
    goback () {
      this.$router.go(-1)
    },
    seebtn(item){
      var _this=this
            this.$axios.get(`/notifyAnnounce/read/?params={"filter":["announceId=${item.announceId}","announceUserId=${item.announceUserId}"]}`).then(res => {
                console.log(res)
              
             if(res.data.resultValue){
                console.log(_this.orderId)

                _this.orderId=item.orderId
                console.log(_this.orderId)
                this.getdetail()
              }else{

              }
            }).catch(err => {
                alert(err)
            })
    },
    getdetail(){
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
          console.log(response.data)
          if(response.data===undefined){
            return false
            
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
                }else if(items.orderElectricianStatus==="32"){
                    Toast.fail("待用户支付")
                }else if(items.orderElectricianStatus==="3"){
                    this.$router.push({name:'Personneladd',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="4"){
                    this.$router.push({name:'Cancelled',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }else if(items.orderElectricianStatus==="1"){
                    this.$router.push({name:'Cancelled',params:{orderId:items.orderId,electricianId:this.electricianId}})
                }
          }
             
        });
    },
    message(){
            this.loading = true;
            this.$axios.get(`/notifyAnnounceUser/queryAll?params={"pageIndex":${this.pageIndex},"pageSize":${this.pageSize},"filter":["userId=${this.electricianId}","status=2"]}`).then(res => {
                console.log(res)
                this.data=res.data.resultValue.items
                this.itemCount=res.data.resultValue.itemCount
                if(res.data.resultValue.itemCount=== this.data.length){
                  this.finished=true
                }else{
                  this.finished=false
                }
                this.pageNumber=2
                this.isLoading=false
                this.loading=false
            })
            this.finName="加载完成"
             setTimeout(()=>{
                 this.finName=""
                              },2000)
       
    },
    transTime (time) {
      time=new Date(time).valueOf()
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
    WebSocketTest(){
         if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                var uid = "321";
                this.socket = new WebSocket(this.path+uid)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
                console.log(this.socket)
            }
    },
    open: function () {
            console.log("socket连接成功")
        },
    error: function () {
        console.log("连接错误")
    },
    getMessage: function (msg) {
        console.log(msg.data)
    },
    send: function () {
        this.socket.send(params)
    },
    close: function () {
        console.log("socket已经关闭")
    }
  },
  destroyed(){
      this.socket.onclose = this.close
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
/* padding-bottom: 20px;
box-sizing: border-box; */
/* overflow: auto; */
}
/deep/ .van-pull-refresh{
  overflow: auto;
  height: 100%;
}
/deep/ .van-pull-refresh::-webkit-scrollbar{
  width: 0;
}
.top{
      text-align: center;
      font-size: 9px;
      color:#989b9d;
      margin: 5px auto;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center
    }
header{
    width: 100%;
    height: 60px;
    background: #87cefa;
    display: flex;
    line-height: 60px;

}
header p{
    margin: 0;
    padding: 0;
}
header p:nth-child(2){
    flex: 1;
    text-align: center;
    font-size: 15px;
    color: #ffffff;
    font-weight: bold;
}
header p:nth-child(1){
    padding-left: 10px;
box-sizing: border-box;
}
section{
    flex: 1;
    overflow: auto;
    padding: 0 10px;
    box-sizing: border-box;
}
/* section::-webkit-scrollbar{
    width: 0;
} */
.content{
    width: 100%;
    height: auto;
    background: #ffffff;
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    /* margin-top: 20px; */
}
.typebox{
    display: flex;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 5px;
    box-sizing: border-box;
}
.typebox p:nth-child(2){
    flex: 1;
}
.typebox p:nth-child(1) span:nth-child(1){
    width: 30px;
    height: 15px;
    display: inline-block;
    background: url(../../../assets/images/label.png) no-repeat;
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    background-size: 100% 100%;
}
.typebox p:nth-child(1) span:nth-child(2){
font-size: 13px;
font-weight: bold;
margin-left: 8px;
}
.typebox p:nth-child(3){
font-size: 8px;
color: #b2b2b2;
line-height: 20px;
}
.addressbox{
    width: 100%;
    height: auto;
}
.addressbox dl{
    width: 100%;
    height: auto;
    display: flex;
}
.addressbox dl dt{
font-size: 12px;
padding-top: 14px;
box-sizing: border-box;
flex: 1;
}
.addressbox dl dd{
    text-align: center;
    padding-top: 22px;
    font-size: 12px;
    padding-left: 10px;
}
.addressbox dl dd button{
    border: 0;
    outline: none;
    background: #ffffff;
    color: #4aa4dd;
}
.addressbox dl dd button img{
float:right;
margin-top: 5px;
margin-left: 3px;
width: 5;
height: 8px;
}
.no-comment{
  margin-top: 100px;
  position: relative;
  
}
.no-comment img{
    width: 100%;
    height: 100%;
  }
.no-comment  span{
    position: absolute;
    left: 36%;
    bottom: 0px;
  }
</style>
