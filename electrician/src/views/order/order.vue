<template>
  <div class="warp">
    <div class="header">
      <div class="mask-input">
        <span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>
        <div class="ipt" @click="ipt">
          <img src="@/assets/images/serch.png" alt="" />
          <input type="text" placeholder="搜索我的订单" />
        </div>
      </div>
    </div>
    <div class="main">
      <van-tabs
        v-model="active"
        line-width="60px"
        line-color="#52AAE1"
        title-active-color="#52AAE1"
        color="#52AAE1"
      >
        <van-tab title="全部订单" class="tt">
          <div class="tabCon">
            <div
              class="box"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="box-top">
                <div class="act">类别</div><p> {{ item.name }}</p>
                <span>{{ item.momey }}</span>
              </div>
              <div class="box-bottom">
                <dl>
                  <dt>
                    <p>{{ item.title }}</p>
                    <p>{{ item.time }}</p>
                  </dt>
                  <dd>
                    <button class="bu1">取消</button>
                    <button class="bu2">支付</button>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="进行中订单">内容 2</van-tab>
        <van-tab title="已完成订单">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  data() {
    return {
      active: 0,
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
        },
      ],
    };
  },
  methods: {
    fh(){
      this.$router.go(-1)
    },
    ipt(){
      this.$router.push("/search")
    }
  },
};
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  background: #f3f8fe;
}
.header {
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
.box {
  width: 90%;
  margin: 0 auto;
  height: 115px;
  background: #fff;
  padding: 0 20px;
  border-radius: 8px;
 .box-top {
    margin-top: 10px;
    height: 37px;
    border-bottom: 1px solid #e0e0e0;
    padding-top: 10px;
    padding-bottom: 8px;
     .act{
         margin-top: 5px;
         margin-right: 6px;
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 15px;
          line-height: 17px;
          border-radius: 6px 0 6px 0;
          background:#ff364a;
          float: left;
        }
    p {
        margin-top: 2px;
      font-size: 14px;
      color: #000;
      float: left;
    }
    span {
      padding-top: 5px;
      font-size: 10px;
      color: #999999;
      float: right;
    }
  }
  .box-bottom {
     font-weight: bold;
    dl {
      width: 100%;
      height: 70px;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      margin-right: 8px;
      dt {
        width: 60%;
        float: left;
        font-size: 12px;
        padding-top: 10px;
        color: #333;
        p {
        display: block;
          line-height: 20px;
        }
      }
      dd {
        float: left;
        padding-top: 23px;
        .bu1 {
          width: 44px;
          height: 24px;
          border-radius: 20px;
          background: #fff;
          outline: none;
          font-size: 12px;
          color: #666666;
          border: 1px solid #e0e0e0;
        }
        .bu2 {
          margin-left: 10px;
          width: 44px;
          height: 24px;
          border-radius: 20px;
          background: #fff;
          font-size: 12px;
          border: 1px solid #52aae1;
          color: #52aae1;
          outline: none;
        }
      }
    }
  }
}
</style>