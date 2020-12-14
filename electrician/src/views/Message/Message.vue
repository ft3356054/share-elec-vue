<template>
  <div class="warp">
    <div class="head">
      <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>消息列表</p>
    </div>
     <main>
        <div class="box" v-for="(item,index) in data" :key="index">
          <div class="top">{{item.time}}</div>
          <div class="bottom">
             <div class="bot-top">
                 <div class="act">{{item.let}}</div> <b>你收到一条系统{{item.let}}消息</b> <span>{{item.day}}</span>
             </div>
             <div class="bot-bottom">
               <ul class="left">
                 <li>发单时间:{{item.stat}}</li>
                 <li v-if="item.let==='派单'">发单人:{{item.mame}}</li>
                 <li v-if="item.let==='评价'">评价人:{{item.mame}}</li>
                 <li v-if="item.let==='维修'">接单人:{{item.mame}}</li>
               </ul>
               <div class="right">
                   详情 <img src="@/assets/images/messagejiantou.png" alt="">
               </div>
             </div>
          </div>
        </div>
     </main>
  </div>
</template>

<script>
import baseest from "../../components/estimate.vue";
export default {
  components: {
  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
    me(){

    }
    
  },
  data() {
    return {
        data:[
          {
            time:"上午11:18",
            let:"派单",
            day:"2020/11/09",
            stat:"2020/11/07 11:15:20",
            mame:"刘强"
          },{
            time:"上午12:18",
            let:"评价",
            day:"2020/11/09",
            stat:"2020/11/07 11:15:20",
            mame:"刘强"
          },{
            time:"上午13:18",
            let:"维修",
            day:"2020/11/09",
            stat:"2020/11/07 11:15:20",
            mame:"刘强"
          }
        ]
    };
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
.head{
    width: 100%;
    height: 50px;
    background: #87CEFA;
    text-align: center;
    p{
        position: relative;
        display: block;
        font-size: 20px;
        color: #fff;
        padding: 10px 10px;
        span{
            position: absolute;
            top:30%;
            left: 5%;
            img{
                width: 80%;
                height: 100%;
            }
        }
    }
}
main{
  padding: 0 13px;
  .box{
    margin-top: 8px;
    .top{
      text-align: center;
      font-size: 9px;
      color:#989b9d;
      margin: 10px 0;
    }
    .bottom{
      height: 100px;
      border-radius:8px;
      background: #fff;
      padding: 12px 15px;
      .bot-top{
        height: 20px;
        border-bottom:1px solid #ededed ;
        .act{
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 15px;
          line-height: 18px;
          border-radius: 6px 0 6px 0;
          background:#ff364a;
          float: left;
        }
        .act1{
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 13px;
          border-radius: 6px 0 6px 0;
          background:#ffcd36;
          float: left;
        }
        .act2{
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 13px;
          border-radius: 6px 0 6px 0;
          background:#7ac6f4;
          float: left;
        }
        b{
          margin-left: 5px;
          font-size: 11px;
          float: left;
        } 
        span{
          float:right;
          font-size: 9px;
          color: #c5c5c5;
        }
      }
      .bot-bottom{
        font-size: 12px;
        padding: 10px 0; 
        .left{
          float: left;
          li{
            line-height: 20px;
          }
        }
        .right{
          float: right;
          margin-top: 10px;
          color: #6cb4e3;
          img{
            width: 10%;
            height: 10px;
          }
        }
      }
    }
  }
}


</style>
