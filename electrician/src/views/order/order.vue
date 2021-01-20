<template>
  <div class="warp">
    <div class="header">
      <div class="mask-input">
        <span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>
        <div class="ipt">
          <img src="@/assets/images/serch.png" alt="" />
          <input type="text" placeholder="搜索我的订单" @change="ipt($event)"/>
        </div>
      </div>
       <div class="tab-box">
         <ul>
           <li v-for="(item,index) in tabs" :key="index" :class="{active:num==index}" @click="nums(index)">{{item}}</li>
        </ul>
    </div>
    </div>
    <div class="main">
          <!-- 无数据时的展示 -->
     <div class="no-comment" v-if="this.list.length==0 && this.haveList.length==0 && this.loverList.length==0">
        <img src="../../assets/images/wu.png" alt="">
        <span>暂无消息!</span>
     </div>
         <section v-else>
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
    <div class="contentbox" >
        <div class="content" v-show="num==0" v-for="(item,index) in list" :key="index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p>{{item.orderStatus}}</p>
                <p v-if="item.orderStatus=='0'">上门费 {{item.customerPrice }}</p>
                <p v-else-if="item.orderStatus=='23'">维修费 {{item.electricianPrice }}</p>
                <p v-else-if="item.orderStatus!=='0'|| item.orderStatus!=='23' ">{{item.createTime }}</p>
                <p v-else-if="item.orderStatus=='4'|| item.orderStatus=='9' || item.orderStatus=='8' ">{{item.finishTime }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId,item.orderStatus)">
                       <div v-if="item.orderStatus!=='0'&&item.orderStatus!='23'">
                        <p>{{ item.customerAddress }}</p>
                        <p>{{ item.customerDescrive }}</p>
                        <p v-show="item.orderTypeId=='0'">{{ item.voltage }} 故障抢修</p>
                        <p v-show="item.orderTypeId=='1'">{{ item.voltage }} 检修</p>
                        <p v-show="item.orderTypeId=='2'">{{ item.voltage }} 巡视</p>
                        <p v-show="item.orderTypeId=='3'">{{ item.voltage }} 试验</p>
                        <p v-show="item.orderTypeId=='4'">{{ item.voltage }} 其他</p>
                      </div>
                      <div v-else-if="item.orderStatus=='0' || item.orderStatus=='23'  ">
                              <p>{{ item.customerAddress }}</p>
                              <p>{{ item.createTime }}</p>
                      </div>
                    </dt>
                    <dd v-if="item.orderStatus=='4'|| item.orderStatus=='9' || item.orderStatus=='8'">
                        <span class="wancan">已完成</span>
                    </dd>
                    <dd v-else-if="item.orderStatus=='0'">
                        <button @click="cancel">取消</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                        <van-dialog v-model="show" title="" show-cancel-button class="show" 
                        @confirm="confirm(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定取消订单吗？取消订单后不能回复</div>
                          </van-dialog>
                    </dd>
                    <dd v-else-if="item.orderStatus=='23'">
                         <button @click="thshow(item.orderId)">退回</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                         <van-dialog v-model="ths" title="" show-cancel-button class="show" 
                        @confirm="th(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定退回订单吗？退回订单后不能回复</div>
                          </van-dialog>
                    </dd>
                      <dd v-else-if="item.orderStatus=='25' && item.orderComplaintId===null">
                         <button @click="complaint(item.orderId)">投诉</button> <button class="zf" @click="yanshou(item.orderId)">验收</button>
                    </dd>
                    <dd v-else-if="item.orderStatus=='25' && item.orderComplaintId!==null">
                         <button class="zf" @click="yanshou(item.orderId)">验收</button>
                    </dd>
                    <dd v-else-if="item.orderStatus!=='4' && item.orderStatus!='9' && item.orderStatus!=='0' && item.orderStatus!=='23'   ">
                        <span class="jinxing">进行中</span>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==1" v-for="(item,index) in haveList" :key="'in'+index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p></p>
                <p v-if="item.orderStatus=='0'">上门费 {{item.customerPrice }}</p>
                <p v-else-if="item.orderStatus=='23'">维修费 {{item.electricianPrice }}</p>
                <p v-else-if="item.orderStatus!=='0'|| item.orderStatus!=='23' ">{{item.createTime }}</p>
                <p v-else-if="item.orderStatus=='4'|| item.orderStatus=='9' || item.orderStatus=='8' ">{{item.finishTime }}</p>
            </div>
            <div class="addressbox" >
                <dl>
                    <dt @click="about(item.orderId,item.orderStatus)">
                        <div v-if="item.orderStatus!=='0'&&item.orderStatus!='23'">
                        <p>{{ item.customerAddress }}</p>
                        <p>{{ item.customerDescrive }}</p>
                        <p v-show="item.orderTypeId=='0'">{{ item.voltage }} 故障抢修</p>
                        <p v-show="item.orderTypeId=='1'">{{ item.voltage }} 检修</p>
                        <p v-show="item.orderTypeId=='2'">{{ item.voltage }} 巡视</p>
                        <p v-show="item.orderTypeId=='3'">{{ item.voltage }} 试验</p>
                        <p v-show="item.orderTypeId=='4'">{{ item.voltage }} 其他</p>
                      </div>
                      <div v-else-if="item.orderStatus=='0' || item.orderStatus=='23'  ">
                              <p>{{ item.customerAddress }}</p>
                              <p>{{ item.createTime }}</p>
                      </div>
                    </dt>
                       <dd v-if="item.orderStatus=='4'|| item.orderStatus=='9' || item.orderStatus=='8'">
                        <span class="wancan">已完成</span>
                    </dd>
                    <dd v-else-if="item.orderStatus=='0'">
                        <button @click="cancel">取消</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                        <van-dialog v-model="show" title="" show-cancel-button class="show" 
                        @confirm="confirm(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定取消订单吗？取消订单后不能回复</div>
                          </van-dialog>
                    </dd>
                    <dd v-else-if="item.orderStatus=='23'">
                         <button @click="thshow(item.orderId)">退回</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                         <van-dialog v-model="ths" title="" show-cancel-button class="show" 
                        @confirm="th(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定退回订单吗？退回订单后不能回复</div>
                          </van-dialog>
                    </dd>
                     <dd v-else-if="item.orderStatus=='25' && item.orderComplaintId===null">
                         <button @click="complaint(item.orderId)">投诉</button> <button class="zf" @click="yanshou(item.orderId)">验收</button>
                    </dd>
                    <dd v-else-if="item.orderStatus=='25' && item.orderComplaintId!==null">
                         <button class="zf" @click="yanshou(item.orderId)">验收</button>
                    </dd>
                    <dd v-else-if="item.orderStatus!=='4' && item.orderStatus!='9' && item.orderStatus!=='0' && item.orderStatus!=='23'   ">
                        <span class="jinxing">进行中</span>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==2" v-for="(item,index) in loverList" :key="'info2'+index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p>{{item.orderStatus}}</p>
                 <p>{{item.finishTime }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt @click="about(item.orderId,item.orderStatus)">
                      <div v-if="item.orderStatus!='0'|| item.orderStatus!='23'">
                        <p>{{ item.customerAddress }}</p>
                        <p>{{ item.customerDescrive }}</p>
                        <p v-show="item.orderTypeId=='0'">{{ item.voltage }} 故障抢修</p>
                        <p v-show="item.orderTypeId=='1'">{{ item.voltage }} 检修</p>
                        <p v-show="item.orderTypeId=='2'">{{ item.voltage }} 巡视</p>
                        <p v-show="item.orderTypeId=='3'">{{ item.voltage }} 试验</p>
                        <p v-show="item.orderTypeId=='4'">{{ item.voltage }} 其他</p>
                      </div>
                    </dt>
                    <dd>
                      <span class="wancan">以完成</span>
                    </dd>
                </dl>
            </div>
        </div>
   
    </div>
         		</van-list>
		</van-pull-refresh>
</section>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components: {
    
  },
  data() {
    return {
      tabs: ['全部订单', '进行中订单', '已完成订单'],
      num: 0,
      staus:"",
      active: 0,
      value:"",
      list: [],
      cust:"customer001",
      haveList:[],      //进行中
      loverList:[],   //已完成
      orderComplaintId:"",
      orderId:"",
       show: false,
       ths:false,
        isLoading: false, //下拉刷新
			  loading: false,    //上拉加载
        finished: false,  //下拉完成
        upFinished: false, //上拉加载完毕
        offset: 10, //滚动条与底部距离小于 offset 时触发load事件
        pageNumber:1,
        pageSize:5,
        pageIndex:1,
        itemCount:0,   //总条数
        finName:"已全部加载完成"
    };
  },
   inject:['reload'],
  mounted() {
    this.cust = this.$route.query.cust;
     this.getlist()
  },
  methods: {
    fh(){
      this.$router.go(-1)
    },
    nums(index){
        this.num=index
        // console.log(this.num)
       this.shousui()
    },
    ipt(e){
      var that = this;
       this.value=e.target.value;
        console.log(this.value);
        this.shousui()
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
    // 搜索
    shousui(index){
      this.$api.get(`/orderCustomer/searchBox?params={"filter":["customerId=${this.cust}","tagType=${this.num}","searchContent=${this.value}"]}`,{},
         res=>{
          //  console.log(res)
            this.list=res.data.resultValue.items
            this.haveList=res.data.resultValue.items
            this.loverList=res.data.resultValue.items
         })
    },
    // 获取数据
    async getlist(){
       this.pageIndex=this.pageNumber*this.pageSize-(this.pageSize-1)
       this.$api.get(`/orderCustomer/queryAll?params={"pageIndex":${this.pageIndex},"pageSize":${this.pageSize},"filter":"customerId=${this.cust}"}`,{
       },res=>{
         console.log(res)
        //  this.list=res.data.resultValue.items
        //   res.data.resultValue.items.forEach(item => {
        //    if(item.orderStatus=="4" || item.orderStatus=="9" || item.orderStatus=="8" ){
        //        this.loverList.push(item)
        //       //  console.log( this.loverList,"8")
        //    }else  if(item.orderStatus!=="4"|| item.orderStatus!=="9" || item.orderStatus!=="8" ){
        //       this.haveList.push(item)
        //    }
        //  });
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
     },
       // 下拉刷新
      onRefresh() {
		      setTimeout(() => {
            this.isLoading = false;
            this.list=[]
            this.pageNumber=1
            this.getlist()
            this.finName="已全部加载完成"
		      }, 1000);
        },
        // 上拉加载
		    onLoad() {
             setTimeout(() => {
                this.pageIndex=this.pageNumber*this.pageSize-(this.pageSize-1)
                  this.$api.get(`/orderCustomer/queryAll?params={"pageIndex":${this.pageIndex},"pageSize":${this.pageSize},"filter":"customerId=${this.cust}"}`,{
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
                }, 500);
                
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
    // 支付
    zf (orderId) {
      // this.$router.push({
      //   path: `/Pay/${orderId}`,
      // })
      Toast("等待支付的接口")
    },
    // 详情
    about(orderId,orderStatus){
      this.orderId=orderId
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
        case "2":   //待维修
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
        case "23":  //待现场勘查察
            this.$router.push({
           path: `/Pay/${this.orderId}`,
          })
          break;                
        case "3":  // 施工中
          this.$router.push({
            path:"/details",
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
    },
  
  },
}
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  background: #f3f8fe;
   display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  background: #87cefa;
  
  line-height: 55px;
  .mask-input{
padding: 0 10px;
  }
  span {
    width: 30px;
    img{
      width: 5%;
      height: 5%;
    }
  }
  .ipt {
    width: 90%;
    height: 34px;
    margin-top: 10px;
    line-height: 32px;
    background: #fff;
    float: right;
    border-radius: 20px;
    img {
      margin-left: 15px;
      margin-right: 8px;
      width: 15px;
    }
    input {
      width: 82%;
      height: 90%;
      font-size: 13px;
      color: #333333;
      border: none;
      outline: none;
      border-radius: 20px;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #000;
    }
  }
   .tab-box{
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
  // background: #87cefa;
}
 .tab-box ul{
width: 100%;
height: 43px;
line-height: 40px;
padding-left: 15px;
color: #828284;
font-size: 12px;
background: #fff;
}
 .tab-box ul li{
list-style: none;
float: left;
margin-left: 25px;
}
}
.main{
  flex: 1;
  overflow: auto;
        display: flex;
   flex-direction: column;
}
section{
   display: -webkit-flex; /* Safari */
       display: flex;
   flex-direction: column;
  // flex: 1;
}
section::-webkit-scrollbar{
    width: 0;
}


section .contentbox{
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
    margin-top: 15px;
    background: #f3f8fe;
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
    background: url(../../assets/images/label.png) no-repeat;
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
.wancan{
  display:block;
  color: #ff4758;
  margin-top: 50%;
  font-size: 14px;
}
.sp{
  font-size: 10px;
   color: #aeaeae;
   margin-top: 5px;
}
.jinxing{
   display:block;
  color: #abd6f0;
   margin-top: 50%;
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
  background-color: rgba(0,0,0,.4);
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
    left: 40%;
    bottom: 0px;
    font-size: 13px;
  }
}
</style>





