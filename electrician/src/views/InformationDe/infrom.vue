<template>
  <div class="warp">
    <div class="header">
      <div class="mask-input">
        <span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>
        <div class="ipt">
          <img src="@/assets/images/serch.png" alt="" />
          <input type="text" placeholder="搜索用电资讯" />
        </div>
      </div>
    </div>
    <div class="main">
      <div class="uls">
        <ul>
          <li  @click="toggleSort('money', false)">按默认排序</li>
          <li  @click="toggleSort('money', true)">按发布时间排序</li>
        </ul>
      </div>
      <ol class="ols">
        <li v-for="(item, index) in data" :key="index" 
        @click="toindet()"
        >
          <p class="p">{{ item.name }}</p>
          <p>{{ item.title }}</p>
          <div class="box">
            <img src="../../assets/images/new.png" alt="" /> 共{{ item.num }}字
            <span>{{ item.time }}</span>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  data() {
    return {
      value: "",
      data: [
        {
          name: "冬季安全用电知识须知",
          title:
            "天气转冷，各种电暖设备和空调大量使用。天气转冷，各种电暖设备和空调大量使用...",
          num: 202,
          time: "2020/09/19 17:25",
        }
        
      ],
    };
  },
  components: {},
  methods: {
    //   详情
      toindet(){
          this.$router.push("/indet")
      },
      fh(){
        this.$router.push("/customer")
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
  }
}
.main {
  padding: 0 20px;
  .uls {
    width: 100%;
    height: 36px;
    line-height: 36px;
    ul {
      float: right;
      li {
        margin-left: 20px;
        float: left;
        font-size: 10px;
        color: #999;
      }
      li:hover {
        color: #000;
        font-size: 12px;
      }
    }
  }
  .ols {
    li {
      padding: 16px 20px;
      width: 100%;
      height: 118px;
      background: #fff;
      margin-bottom: 8px;
      border-radius: 8px;
      .p {
        margin-bottom: 12px;
        font-size: 15px;color: #000;
        font-weight: 0;
      }
      p {
        display: inline-block;
        font-size: 8.5px;
        color: #666666;
        line-height: 13px;
      }
      .box {
        img {
          width: 27px;
          height: 14px;
        }
        margin-top: 6px;
        font-size: 11px;
        color: #333;
        span {
          float: right;
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
}
</style>