<template>
  <div class="warp">
    <div class="head">
      <p>
        <span @click="fh()"><img src="@/assets/images/bai.png" alt=""/></span
        >订单详情
      </p>
    </div>
    <div class="top">
      <h4>
        <div class="x"></div>
        订单信息
      </h4>
      <ul class="ipt"  v-for="(item,index) in demo" :key="index">
        <li>
          <div class="left">订单编号</div>
          <span>{{ item.orderId  }}</span>
        </li>
        <li>
          <div class="left">标题</div>
          <span>{{ item.customerDescriveTitle }}</span>
        </li>
        <li>
          <div class="left">接单人</div>
          <span>{{ item.electricianName }}</span>
        </li>
        <li>
          <div class="left">联系电话</div>
          <span>{{ item.electricianPrice }}</span>
        </li>
        <li>
          <div class="left">接单时间</div>
          <span>{{ item.acceptTime}}</span>
        </li>
        <li>
          <div class="left">状态</div>
          <span class="zt"  v-if="item.orderStatus">已完成</span>
        </li>
        <li>
          <div class="left">完成时间</div>
          <b>{{ item.finishTime }}</b>
        </li>
        <li>
         <div class="left">维修费</div>
          <span class="momy">￥{{ item.electricianPrice }}</span>
        </li>
        <li>
          <div class="left">探测情况</div>
          <span style="display:table-row;">{{ item.electricianDescrive }}
          </span>
        </li>
        <li>
          <div class="left">施工人员</div>
          <ul style="margin-left:80px">
              <li style="width:60%">{{item.otherElectricianName}}</li>
              </ul>
        </li>
        <li style="padding-bottom:20px">
          <div class="left" >施工内容</div>
          <span style="display:table-row;">{{ item.constructionContent}} </span>
        </li>
      </ul>
    </div>
     <div class="box" v-for="(item,id) in demo" :key="id+2">
         <h4>合同</h4>
         <div class="gz" @click="img">   
        <img :src="item.orderContract" alt="" />
         <van-image-preview v-model="show" :images="[item.orderContract]" >
       </van-image-preview>
      </div>
      </div>
      <div class="box" v-for="(item,ss) in demo" :key="ss+5">
          <h4>服务报告</h4>
            <div class="gz" style="margin-bottom:60px" @click="imgs">
                <img :src="item.inspectionReport" alt="" />
                <van-image-preview v-model="shows" :images="[item.inspectionReport]" >
              </van-image-preview>
          </div>
         
      </div>
      <div class="btt" v-show="ts" v-if="this.orderStatus==8">
        <!-- <button v-if="this.orderStatus==9" @click="tocomplaint()">投诉</button>   -->
        <button  @click="estimate">评价</button>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
   data() {
    return {
      value: 3,
      fileList: [],
      demo: {
        a: "202011121447",
        b: "刘青",
        c: "插座跳闸",
        d: "机房配电箱10kv开关烧坏，开关需要更换。",
        e: "天津市东丽区国网客服中心",
        f: "￥150.00",
        g: "2020/11/09 16:51",
        h: "已完成",
        q:"159****8080",
        w:"2020/11/10 16:51",
        r:"￥1500.00",
        t:"机房主配电箱10kv开关烧坏，开关需要更换",
        y:[{
            name:"刘强",
            pho:"13811231548"
        },{
            name:"杨乐",
            pho:"13811231548"
        },{
            name:"meosa",
            pho:"13811231548"
        }],
        u:"机房主配电箱开关已更换完成，施工时间一个工作日。"
      },
     orderId:"",
     show:false,
     shows:false,
     creatTime:"",
     ts:true,
     orderStatus:""
    };
  },
    mounted() {
    this.orderId=this.$route.query.orderId
    this.getdemo()
  },
  methods: {
    //   返回上一层
    fh() {
      this.$router.go(-1);
    },
     // 点击图片显示
    img(){
     this.show=true
    },
    imgs(){
      this.shows=true
    },
    // 投诉
    tocomplaint() {
      this.$router.push("/complaint");
    },
   estimate(){
        this.$router.push({
        path:"/estimate",
        query:{
          orderId:this.orderId
        }
      })
   },
      getdemo(){
        this.$axios.get(`/orderCustomer/OrderDetail/${this.orderId}`,{withCredentials: true}).then(res=>{
           console.log(res.data.resultValue.items)
           this.demo=res.data.resultValue.items
           this.creatTime=res.data.resultValue.items[0].finishTime
           this.orderStatus=res.data.resultValue.items[0].orderStatus
          //  console.log(this.orderStatus)
          //  console.log(this.creatTime)
           let times=new Date(this.creatTime).getTime()
            // console.log(times,"结束")
            let toDay = (new Date()).getTime() // 今天的时间戳
          // console.log(toDay,"现在")
           if((toDay-times)/(1000*3600*24)>15){
             this.ts=false
           }
       })
    },
      tocomplaint() {
        this.$router.push({
        path:"/complaint",
        query:{
          orderId:this.orderId
        }
      })
    },
  },
 
};
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
//   height: 100%;
  margin: 0 auto;
  position: relative;
  background: #f3f8fe;
  padding-bottom: 10px;
  overflow: hidden;
}
.head {
  width: 100%;
  height: 140px;
  background: #87cefa;
  text-align: center;
  border-radius: 0 0 20% 20%;
  p {
    position: relative;
    display: block;
    font-size: 20px;
    color: #fff;
    padding: 10px 10px;
    span {
      position: absolute;
      top: 30%;
      left: 5%;
      img {
        width: 80%;
        height: 100%;
      }
    }
  }
}

.top {
  width: 94%;
  height: 100%;
  background: #fff;
  margin: 0 auto;
  margin-top: -26%;
  border-radius: 8px;
  box-shadow: 0 -6px 3px #b4e0fc;
  h4 {
    padding: 10px 10px;
    .x {
      float: left;
      margin-right: 5px;
      width: 4px;
      height: 15px;
      margin-top: 4px;
      background: #f76876;
    }
  }
  .ipt {
    width: 100%;
    // height: 235px;
    padding: 0 20px;
    font-size: 12px;
    padding-bottom: 20px;
    li {
      line-height: 25px;
      .left {
        width: 25%;
        float: left;
        margin-right: 5px;
        color: #848484;
      }
      b {
        // height: 30px;
        display: block;
        margin-left: 65px;
        margin-bottom: 5px;
        font-weight: normal;
      }
      span {
        // font-weight: 800;
        color: #343434;
      }
      .momy {
        color: #f76876;
      }
      .zt {
        color: #4aa2d9;
        font-weight:800;
      }
    }
  }
  .hzh {
    margin-left: 10px;
  }
  .gz {
    width: 85%;
    margin: 0 25px;
    height: 90px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.box{
    margin: 10px auto;
    width:94%;
    height: 152px;
    background: #fff;
     border-radius: 8px;
    h4{
       padding: 18px 0 10px 20px;
    }
.gz {
    width: 90%;
    margin: 0 auto;
    height: 90px;
   
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.btt {
  width: 100%;
  height: 60px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 7px;
  button {
    margin-left: 10px;
    width: 85px;
    height: 37px;
   background: -webkit-linear-gradient(#83ccfa,#7bcbf7,#6ec1f5,#61bbf3,#57b6f0);
    border-radius: 20px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;
    // font-weight: bold;
  }
}
</style>
