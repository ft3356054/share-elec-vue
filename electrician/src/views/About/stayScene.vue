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
      <ul class="ipt" v-for="(item,index) in demo" :key="index">
        <li>
          <div class="left">订单编号</div>
          <span>{{ item.orderId }}</span>
        </li>
         <li>
          <div class="left">接单人</div>
          <span>{{item.electricianName}}</span>
        </li>
        <li>
          <div class="left">标题</div>
          <span>{{ item.customerDescriveTitle}}</span>
        </li>
        <li>
          <div class="left">内容说明</div>
          <b style="display:table-row">{{ item.customerDescrive  }}</b>
        </li>
        <li>
          <div class="left">地址</div>
          <span>{{item.customerAddress}}</span>
        </li>
        <li>
          <div class="left">到达现场时间</div>
          <span>{{ item.updateTime  }}</span>
        </li>
        <li>
          <div class="left">状态</div>
          <span class="zt" v-if="item.orderStatus">待现场勘察</span>
        </li>
      </ul>
      <h4 class="hzh">故障图片</h4>
      <div class="gz" style="margin-bottom:5px"  v-for="(item,index) in demo" :key="index+2" @click="imgs">
        <img :src="item.customerDescriveIcon" alt="" />
         <van-image-preview v-model="shows" :images="[item.customerDescriveIcon]" >
       </van-image-preview>
      </div>
      
    </div>
     <div class="btt">
        <button @click="tocomplaint()">催单</button>
      </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components: {},
    data() {
    return {
      value: 3,
      fileList: [],
      demo: {},
       orderId:"",
       shows:false
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
    imgs(){
     this.shows=true
    },
     getdemo(){
        this.$axios.get(`/orderCustomer/OrderDetail/${this.orderId}`,{withCredentials: true}).then(res=>{
           console.log(res.data.resultValue.items)
           this.demo=res.data.resultValue.items
       })
    },
    // 催单
    tocomplaint() {
      this.$axios.get(`/notifyAnnounce/hasten/${this.orderId}`,{withCredentials: true}).then(res=>{
           console.log(res.data.successful)
           if(res.data.successful==true){
                  Toast.success('催单成功')
           }
      })
    },
  },

};
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  background: #f3f8fe;
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
  // height: 100%;
  background: #fff;
  margin: 0 auto;
  margin-top: -26%;
  padding-bottom: 20px;
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
    li {
      line-height: 25px;
      .left {
        width: 30%;
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
            display: inline-block;
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
.btt {
  width: 100%;
  height: 80px;
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
