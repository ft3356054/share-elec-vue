<template>
  <div class="tab">
    <ul>
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ active: index == num }"
        @click="tab(index)"
      >
        {{ item }}
      </li>
    </ul>
    <div class="tabCon">
      <div
        class="box"
        v-for="(item, index) in list"
        :key="index"
        v-show="index == num"
      >
        <div class="box-top">
          <p><img src="../assets/images/new.png" alt="" /> {{ item.name }}</p>
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
  </div>
</template>

<script>
export default {
  name: "BaseTab",
  data() {
    return {
      tabs: ["待支付", "待验收","待验收"],
      tabContents: [
       
      ],
      num: 0, //默认选中第一个tab,
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
          momey:"上门费 1500"
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
    };
  },
  methods: {
    tab(index) {
      this.num = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  background: #f3f8fe;
}
ul {
  height: 50px;
  line-height: 50px;
  width: 100%;
  cursor: pointer;
  background: #f3f8fe;
  padding: 5PX 40px;
}
ul li {
  display: inline-block;
  color: #8C8E8F;
font-size: 15px;
  margin-right: 12%;
  height: 45px;
}
.tab .active {
  color: #52AAE1;
  border-bottom: 2px solid #52AAE1;
  font-size: 18px;
}
.tabCon {
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
    p {
      font-size: 14px;
      color: #000;
      img {
        width: 25px;
        height: 15px;
      }
      float: left;
    }
    span {
      padding-top: 5px;
      font-size: 12px;
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