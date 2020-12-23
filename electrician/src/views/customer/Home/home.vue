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
        >
          <van-swipe-item v-for="(item,index) in messages" :key="index">系统消息:  {{item.name}}</van-swipe-item>
        </van-swipe>
        <img src="../../../assets/images/messagejiantou.png" alt="">
      </van-notice-bar>
    </nav>
    <section>
    <div class="tab-box">
        <ul>
            <li @click="num=0" :class="{active:num==0}">待支付</li>
            <li @click="num=1" :class="{active:num==1}">待验收</li>
            <li @click="num=2" :class="{active:num==2}">待评价</li>
        </ul>
    </div>
    <div class="contentbox">
        <div class="content" v-show="num==0" v-for="(item,index) in toPay" :key="index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerEvaluateTitle}}</span></p>
                <p></p>
                <p v-if="price==='0'? true : false ">上门费 {{item.customerPrice }}</p>
                <p v-else>维修费 {{item.customerPrice }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                       <p>{{ item.customerDescrive }}</p>
                       <p>{{ item.createTime }}</p>
                    </dt>
                    <dd>
                        <button @click="cancel">取消</button> <button class="zf" @click="zf(item.orderId)">支付</button>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==1" v-for="(item,index) in toAccepted" :key="'in'+index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerEvaluateTitle}}</span></p>
                <p></p>
                <p>{{item.finishTime}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{ item.customerDescrive }}</p>
                       <p>电工完工的情况描述</p>
                    </dt>
                    <dd>
                      <button @click="complaint">投诉</button>  <button class="zf" @click="yanshou">验收通过</button>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==2" v-for="(item,index) in toEvaluated" :key="'info2'+index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerEvaluateTitle}}</span></p>
                <p></p>
                 <p v-if="price=='0'? true : false ">上门费 {{item.customerPrice }}</p>
                <p v-else>维修费 {{item.customerPrice }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{ item.customerDescrive }}</p>
                       <p>{{ item.finishTime }}</p>
                    </dt>
                    <dd>
                        <button class="zf" @click="estimate">评价</button>
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
  name: "Home",
  components: {},
  data() {
    return {
       num: 0,
       price:"",
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
        { name: "sssssssss更新1" },
        { name: "2本系统将于sdas " },
        { name: "3阿打算打算打24日凌晨24:00开始停机更新3" },
        { name: "4本系萨达四大晨24:00开始停机更新4" },
      ],
      activeName: "a",
      active: "0",
      lists: [
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
            mast:"电工完工的情况描述",
             momey: "上门费 1500",
        },
        {
          leb: "类别",
          name: "泵房线路安装",
          time: "2020/11/09 13:49",
          address: "天津市东丽区能量大厦332号",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
          mast:"电工完工的情况描述",
           momey: "上门费 1500",
        },
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
            mast:"电工完工的情况描述",
             momey: "上门费 1500",
        },
      ],
      data: [
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
          momey: "上门费 1500",
        },
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
          momey: "上门费 1500",
        },
        {
          leb: "类别",
          name: "泵房线路安装",
          time: "2020/11/09 13:49",
          address: "天津市东丽区能量大厦332号",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
        },
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
        },{
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
          momey: "上门费 1500",
        },
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
          momey: "上门费 1500",
        },
        {
          leb: "类别",
          name: "泵房线路安装",
          time: "2020/11/09 13:49",
          address: "天津市东丽区能量大厦332号",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
        },
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
        },
      ],
      content:"",
      toPay:[],
      toAccepted:[],
      toEvaluated:[],
      cust:"customer002",
      orderId:""
    };
  },
  mounted() {
    this.getContent(),  //获取未读消息数量
    this.getGunlist(),   // 获取滚动数据
    this.getlist()   //获取订单数据
  },
  methods: {
    nalist(index) {
      if (index === 0) {
        this.$router.push({
          path:"/demand",
          query:{
            cust:this.cust
          }
        });
      } else if (index === 1) {
        this.$router.push("/order");
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
    yanshou(){
        this.$router.push('/')
    },
    // 投诉
    complaint(){
      this.$router.push('/complaint')
    },
    // 评价
    estimate(){
      this.$router.push('/estimate')
    },
    // 取消
    cancel(){
           
    },
    getGunlist(){
      this.$api.get('/notifyAnnounceUser/userId/customer002',{
       },res=>{
          //  console.log(res)
           this.messages.push({
             name:res.data.resultValue.items[0].content
           })
       })
    },
    getlist(){
       this.$api.get(`/orderCustomer/queryAllToBegin?params={"pageIndex":1,"pageSize":20,"filter":"customerId=${this.cust}"}`,{
       },res=>{
        //  console.log(res)
         res.data.resultValue.items.forEach(item => {
           this.orderId=item.orderId
           this.price=item.orderStatus
          //  console.log(this.price)
           if(item.orderStatus==="0" ||item.orderStatus==="23" ){
              this.toPay.push(item)
                // console.log(this.toPay)
                if(item.electricianPrice===""){
                    this.price=true
                }
           }else if(item.orderStatus==="24" ){
               this.toAccepted.push(item)
               console.log( "24",this.toAccepted )
           }else if(item.orderStatus==="8" ){
               this.toEvaluated.push(item)
               console.log( this.toEvaluated)
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
    }
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
  width: 90%;
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
         img{
           position: absolute;
           right: 0;
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
</style>
