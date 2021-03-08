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
          <span class="zt"  v-if="item.orderStatus">现场勘查完成</span>
        </li>
        <li>
          <div class="left">完成时间</div>
          <b>{{ item.updateTime }}</b>
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
        <li style="padding-bottom:20px">
          <div class="left" >施工内容</div>
          <span style="display:table-row;">{{ item.constructionContent}} </span>
        </li>
      </ul>
    </div>
     <div class="box" v-for="(item,id) in demo" :key="id+2">
         <h4>合同</h4>
         <div class="gz"  @click="img">   
        <img :src="item.orderContract" alt="" />
         <van-image-preview v-model="show" :images="[item.orderContract]" >
       </van-image-preview>
      </div>
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
      demo: {},
     orderId:"",
     show:false,
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
    //  确认验收
     TipDialog(){
    this.$dialog.alert({
      // title:'标题呀',
      width:"80%",
      message:'验收成功'
    }).then(()=>{
     console.log('点击了确认')
     this.$router.push("/estimate")
    })
   },
      getdemo(){
        this.$axios.get(`/orderCustomer/OrderDetail/${this.orderId}`,{withCredentials: true}).then(res=>{
           console.log(res.data.resultValue.items)
           this.demo=res.data.resultValue.items
       })
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
//   height: 100%;
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
    padding-bottom: 30px;
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
</style>
