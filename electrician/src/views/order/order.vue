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
    </div>
    <div class="main">
         <section>
    <div class="tab-box">
        <ul>
           <li v-for="(item,index) in tabs" :key="index" :class="{active:num==index}" @click="nums(index)">{{item}}</li>
        </ul>
    </div>
    <div class="contentbox">
        <div class="content" v-show="num==0" v-for="(item,index) in list" :key="index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p>{{item.orderStatus}}</p>
                <p v-if="item.orderStatus=='0'">上门费 {{item.customerPrice }}</p>
                <p v-else-if="item.orderStatus=='23'">维修费 {{item.electricianPrice }}</p>
                <p v-else-if="item.orderStatus!=='0'|| item.orderStatus!=='23' ">{{item.createTime }}</p>
                <p v-else-if="item.orderStatus=='4'|| item.orderStatus=='9' ">{{item.finishTime }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                       <p>{{ item.customerDescrive }}</p>
                       <p>{{ item.createTime }}</p>
                    </dt>
                    <dd v-if="item.orderStatus=='4'|| item.orderStatus=='9' ">
                        <span class="wancan">以完成</span>
                    </dd>
                    <dd v-else-if="item.orderStatus=='0' || item.orderStatus=='23'  ">
                        <button @click="cancel">取消</button> <button class="zf" @click="zf(item.orderId)">支付</button>
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
                <p>{{item.orderStatus}}</p>
                <p>{{item.createTime}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{ item.customerDescrive }}</p>
                       <p>电工完工的情况描述</p>
                    </dt>
                     <dd>
                       <span class="jinxing">进行中</span>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content" v-show="num==2" v-for="(item,index) in loverList" :key="'info2'+index">
            <div class="typebox">
                <p><span>类别</span><span>{{item.customerDescriveTitle}}</span></p>
                <p></p>
                 <p>{{item.finishTime }}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{ item.customerDescrive }}</p>
                       <p>{{ item.voltage }} {{}}</p>
                    </dt>
                    <dd>
                      <span class="wancan">以完成</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</section>
    </div>
  </div>
</template>

<script>
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
      list: [
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
          address: "天津市东丽区国网客服中心北方ss方园区",
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
          address: "天津市东丽区国网客服中心北方ss方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          state: "抢修",
          distance: "<5KM",
        },
      ],
      cust:"customer001",
      haveList:[],      //进行中
      loverList:[],   //已完成
      orderComplaintId:""
    };
  },
  mounted() {
     this.getlist()
  },
  methods: {
    fh(){
      this.$router.go(-1)
    },
    nums(index){
        this.num=index
       this.shousui()
    },
    ipt(e){
      var that = this;
       this.value=e.target.value;
        console.log(this.value);
        this.shousui()
    },
    shousui(index){
      this.$api.get(`/orderCustomer/searchBox?params={"filter":["customerId=${this.cust}","tagType=${this.num}","searchContent=${this.value}"]}`,{},
         res=>{
          //  console.log(res)
            this.list=res.data.resultValue.items
            this.haveList=res.data.resultValue.items
            this.loverList=res.data.resultValue.items
         })
    },
     getlist(){
       this.$api.get(`/orderCustomer/queryAll?params={"pageIndex":1,"pageSize":20,"filter":"customerId=${this.cust}"}`,{
       },res=>{
         console.log(res)
         this.list=res.data.resultValue.items
          res.data.resultValue.items.forEach(item => {
           if(item.orderStatus!="4" || item.orderStatus!="9" ){
              this.haveList.push(item)
           }else if(item.orderStatus==="4" ||item.orderStatus==="9"  ){
               this.loverList.push(item)
               console.log( this.loverList,"8")
           }
         });
       })
     },
      // 取消
    cancel(){
           
    },

  },
}
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  background: #f3f8fe;
}
.header {
  width: 100%;
  height: 55px;
  background: #87cefa;
  padding: 0 20px;
  line-height: 55px;
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
}
.main{
  flex: 1;
}
section{
   display: -webkit-flex; /* Safari */
       display: flex;
   flex-direction: column;
    overflow: auto;
}
section::-webkit-scrollbar{
    width: 0;
}
section .tab-box{
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
}
section .tab-box ul{
width: 100%;
height: 40px;
line-height: 40px;
padding-left: 15px;
color: #828284;
font-size: 12px;
background: #fff;
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
  margin-top: 15px;
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
  margin-top: 15px;
  font-size: 14px;
}
</style>





