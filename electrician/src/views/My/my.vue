<template>
    <div class="warp">
     <div class="head">
         <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span> 个人信息</p>
     </div>
     <div class="head-top">
         <img src="@/assets/images/information.png" alt="">
         <dl>
             <dt>{{this.list.customerName}}</dt>
             <dd>{{this.list.customerPhonenumber}}</dd>
         </dl>
         <div class="dian">用户</div>
     </div>
     <div class="head-bottom">
           <div class="box" >实名认证
               <span v-if="this.list.realNameAuth=='0'">是</span>
               <span v-else>否</span>
            </div>
               <div class="box">电工认证
                   <span @click="gorenzheng" style="color:#87cefa" v-if="this.list.auditStatus=='0'">未认证</span>
                   <span @click="gorenzheng" style="color:#87cefa" v-else-if="this.list.auditStatus=='1'">待审核</span>
                   <span @click="gorenzheng" style="color:#87cefa" v-else-if="this.list.auditStatus=='2'">已审核</span>
                </div>
            <!-- <div class="box">电工认证<span @click="gorenzheng"  style="color:#87cefa">高级电工></span></div> -->
            <div class="box">常用户号<span>{{this.list.registeredNumber}}</span></div>
     </div>
     <!-- <button>退出登录</button> -->
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            customerId:"",
            list:"",
        }
    },
  methods: {
      fh(){
          this.$router.push("/customer")
      },
    //   电工认证
       gorenzheng () {
           if(this.list.realNameAuth=="1"){
               Toast("您还没有实名认证，请实名认证")
           }else{
                Toast("有实名认整")
                console.log(this.list.realNameAuth)
               if(this.list.auditStatus=="0"){
                    console.log(this.customerId,"a1")
             this.$router.push({
                 path:'/autation',
                 query:{
                     customerId:this.customerId
                 }
             })
           }else if(this.list.auditStatus=="1"){
               Toast('正在审核中，请稍等');
           }else if(this.list.auditStatus=="2"){
                 Toast('已审核');
           }
           }
    }
  },
  mounted() {
      this.customerId=localStorage.getItem("customerId")
       this.$api.get(`/customerInfo/${this.customerId}`,{
       },res=>{
           console.log(res.data)
           this.list=res.data.resultValue
       })
  },
}
</script>

<style lang="scss" scoped>
.warp{
   width: 100%;
   height: 100%;
   margin: 0 auto;
   position: relative;
   background: #f3f8fe;
   overflow: hidden;
}
.head{
    width: 100%;
    height: 140px;
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
.head-top{
    position: absolute;
    width: 94%;
    height: 112px;
    // line-height: 112px;
    background: #fff;
    top: 14.5%;
    left: 3%;
    margin: 0 auto;
    border-radius: 8px;
    img{
        width:50px;
        height: 50px;
        float: left;
        margin: 30px 12px 30px 20px ;
    }
    dl {
        float: left;
        width: 170px;
        dt{
            margin-top: 25px;
            margin-bottom: 8px;
            font-size: 20px;
            font-weight: bold;
        }
        dd{
            font-weight: bold;
            font-size: 15px;
        }
    }
    .dian{
        width: 41px;
        height: 23px;
        text-align: center;
        margin-top: 40px;
        padding-left: 5px;
        color: #fff;
        float: right;
        border-radius: 20px 0 0 20px;
        background: #F76876;
    }
}
.head-bottom{
     width: 94%;
     height: auto;
     background: #fff;
     margin: 70px auto;
     margin-bottom: 0;
     border-radius: 8px;
     padding: 10px 20px;
     font-weight: bold;
}
.box{
    height:58px ;
    line-height: 58px;
    border-bottom: 1px solid #F2F2F2;
    span{
        float: right;
    }
}
.box:nth-child(3){
    border: none;
}
button{
    //   display: flex;
    // align-items: center;
    // justify-content: center;
    width: 130px;
    height: 38px;
    color: #F76876;
    border: 1px solid #F76876;
    border-radius:30px ;
    background: #f3f8fe;
    margin: 20px 30%;
}
</style>