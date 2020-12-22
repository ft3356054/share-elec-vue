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
          <div class="left">联系人</div>
          <span>{{ demo.b }}</span>
        </li>
        <li>
          <div class="left">联系电话</div>
          <span>{{ demo.q }}</span>
        </li>
        <li>
          <div class="left">发单时间</div>
          <span>{{ demo.g }}</span>
        </li>
        <li>
          <div class="left">状态</div>
          <span class="zt">{{ demo.h }}</span>
        </li>
        <li>
          <div class="left">完成时间</div>
          <b>{{ demo.w }}</b>
        </li>
        <li>
          <div class="left">上门费</div>
          <span class="momy">{{ demo.f }}</span>
        </li>
        <li>
         <div class="left">维修费</div>
          <span class="momy">{{ demo.r }}</span>
        </li>
        <li>
          <div class="left">探测情况</div>
          <span style="display:table-row;">{{ demo.t }}
          </span>
        </li>
        <li>
          <div class="left">施工人员</div>
          <ul style="margin-left:80px">
              <li v-for="(item,index) in demo.y" :key="index">{{item.name}} {{item.pho}}</li>
              </ul>
        </li>
        <li style="padding-bottom:20px">
          <div class="left" >施工内容</div>
          <span style="display:table-row;">{{ demo.u }} </span>
        </li>
      </ul>
    </div>
     <div class="box">
         <h4>合同</h4>
         <div class="gz">
        <img src="@/assets/images/gztp.png" alt="" />
      </div>
      </div>
      <div class="box" >
          <h4>服务报告</h4>
            <div class="gz" style="margin-bottom:60px">
        <img src="@/assets/images/gztp.png" alt="" />
      </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    //   返回上一层
    fh() {
      this.$router.go(-1);
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
    };
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
.box{
    margin: 10px auto;
    width:94%;
    height: 152px;
    background: #fff;
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
