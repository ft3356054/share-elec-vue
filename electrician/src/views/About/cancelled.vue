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
      <ul class="ipt">
        <li>
          <div class="left">订单编号</div>
          <span>{{ demo.a }}</span>
        </li>
        <li>
          <div class="left">标题</div>
          <span>{{ demo.c }}</span>
        </li>
        <li>
          <div class="left">内容说明</div>
          <b style="display:table-row">{{ demo.d }}</b>
        </li>
        <li>
          <div class="left">地址</div>
          <span>{{ demo.e }}</span>
        </li>
        <li>
          <div class="left">上门费</div>
          <span class="momy">{{ demo.f }}</span>
        </li>
        <li>
          <div class="left">接单时间</div>
          <span>{{ demo.g }}</span>
        </li>
        <li>
          <div class="left">状态</div>
          <span class="zt">{{ demo.h }}</span>
        </li>
      </ul>
      <h4 class="hzh">故障图片</h4>
      <div class="gz" style="margin-bottom:5px">
        <img src="@/assets/images/gztp.png" alt="" />
      </div>
      
    </div>
     <div class="btt">
        <button @click="tocomplaint()">取消订单</button>
      </div>
  </div>
</template>

<script>
import baseest from "../../components/estimate.vue";
export default {
  components: {},
  methods: {
    //   返回上一层
    fh() {
      this.$router.go(-1);
    },
    // 取消订单
    tocomplaint() {
      this.$router.push("/customer");
    },
  
  },
  data() {
    return {
      value: 3,
      fileList: [],
      data: [
        "订单编号",
        "接单人",
        "标题",
        "内容说明",
        "地址",
        "上门费",
        "接单时间",
        "状态",
      ],
      demo: {
        a: "202011121447",
        b: "刘青",
        c: "插座跳闸",
        d: "机房配电箱10kv开关烧坏，开关需要更换。",
        e: "天津市东丽区国网客服中心",
        f: "￥150.00",
        g: "2020/11/09 16:51",
        h: "已取消",
      },
    };
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
        font-weight: 800;
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
  :nth-child(1){
    background: none;
    color: #6b6c6c;
    border: 1px solid #c0c2c4;
  }
}
</style>
