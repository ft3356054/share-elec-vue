<template>
  <div class="warp">
    <div class="head">
      <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>消息列表</p>
    </div>
     <main>
           <div class="top"><hoursTip/><span>{{this.time}}</span></div>
        <div class="box" v-for="(item,index) in list" :key="index">
          <div class="bottom">
             <div class="bot-top">
                 <div class="act" v-if="item.notifyType==='1'">维修</div>
                 <div class="act" v-else-if="item.notifyType==='2'">支付</div>
                 <div class="act" v-else-if="item.notifyType==='3'">验收</div>
                 <div class="act" v-else-if="item.notifyType==='4'">评价</div>
                  <b>{{item.title}}</b> <span>{{item.createTime}}</span>
             </div>
             <div class="bot-bottom" @click="details(item)">
               <ul class="left">
                 <li>{{item.content}}</li>
                 <li class="clas" v-show="item.state==='0'? true:false">未读</li>
                   <li class="claa" v-show="item.state==='1'? true:false">已读</li>
               </ul>
               <div class="right" >
                   详情 <img src="@/assets/images/messagejiantou.png" alt="">
               </div>
             </div>
          </div>
        </div>
     </main>
  </div>
</template>

<script>
import hoursTip from "../../components/hoursTip.vue"
export default {
  components: {
  },
   data() {
        return {
            cust:"",
            list:"",
            time:"",
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
        }
    },
    created() {
      
    },
  methods: {
      fh(){
          this.$router.go(-1)
      }, 
      // 获取时间
      times(){
         var aData = new Date()
       this.time =aData.getHours() + ":" + aData.getMinutes()
      //  console.log(this.time) //2019-8-20 
      },
      // 详请
      details(item){
        // console.log(item)
        this.$router.push("/details")
       this.$bus.$emit("details",{
         announceId:item.announceId,
         announceUserId:this.cust
       })
      }
  },
 
  mounted() {
      console.log(this.$route.query.cust)
      this.cust=this.$route.query.cust
       this.$api.get(`/notifyAnnounceUser/userId/${this.cust}`,{
       },res=>{
           console.log(res)
           this.list=res.data.resultValue.items
           console.log(this.list)
           this.times()
       })
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
   .top{
      text-align: center;
      font-size: 9px;
      color:#989b9d;
      margin: 10px auto;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      span{
        margin-top: 1px;
      }
    }
  .box{
    margin-top: 8px;
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
             background: #87CEFA;
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
          width: 85%;
          float: left;
          li{
            margin-top: 10px;
            line-height: 20px;
           overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          
          }
          .clas{
            color: #7ac6f4;
          }
          .claa{
           color: #c5c5c5;
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
