<template>
  <div class="home">
    <header>
      <!-- <img src="@/assets/image/banner.png" alt="" /> -->
      <!-- 消息 -->
      <div class="badge" @click="toMessage()">
        <van-badge :content="this.content" max="99">
          <img src="@/assets/images/message.png" alt="" />
        </van-badge>
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
    <main>
      <van-tabs
        v-model="active"
        color="#2991e2"
        background="#f3f8fe"
        title-active-color="#2991e2"
        title-active-font-size="15px"
        title-style="font-size:50px;font-weight:bold;"
      >
        <van-tab title="待支付">
          <div class="box" v-for="(item, index) in list" :key="index">
            <div class="box-top">
              <div class="act">类别</div>
              <p>{{ item.name }}</p>
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
        </van-tab>
        <van-tab title="待验收">
          <div class="box" v-for="(item, index) in lists" :key="index">
            <div class="box-top">
              <div class="act">类别</div>
              <p>{{ item.name }}</p>
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
        </van-tab>
        <van-tab title="待评价">
          <div class="box" v-for="(item, index) in lists" :key="index">
            <div class="box-top">
              <div class="act">类别</div>
              <p>{{ item.name }}</p>
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
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>

<script>
import "@/assets/tab.scss";
import BaseTab from "@/components/tab.vue";
export default {
  name: "Home",
  components: {},
  data() {
    return {
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
        { name: "1本系统将于24日凌晨24:00开始停机ssssssssss更新1" },
        { name: "2本系统将于sdas " },
        { name: "3阿打算打算打24日凌晨24:00开始停机更新3" },
        { name: "4本系萨达四大晨24:00开始停机更新4" },
      ],
      activeName: "a",
      active: 0,
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
      content: "5",
    };
  },

  methods: {
    nalist(index) {
      if (index === 0) {
        this.$router.push("/demand");
      } else if (index === 1) {
        this.$router.push("/order");
      } else if (index === 2) {
        this.$router.push("/infrom");
      }
    },
    toMy() {
      this.$router.push("/My");
    },
    toMessage() {
      this.$router.push("/Message");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f3f8fe;
  position: relative;
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
    left: 50%;
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
      width: 130%;
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
         position: relative;
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
main {
  position: absolute;
  background: #f3f8fe;
  width: 100%;
  margin-top: 5px;
}

/deep/ .van-tabs__nav--line {
  width: 65%;
  margin-left: 45px;
}
/deep/ .van-tab--active {
  font-size: 15px;
}
/deep/ .van-tab {
  margin-right: 20px;
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
    .act {
      margin-top: 5px;
      margin-right: 6px;
      width: 25px;
      font-size: 9px;
      color: #fff;
      text-align: center;
      height: 15px;
      line-height: 17px;
      border-radius: 6px 0 6px 0;
      background: #ff364a;
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
