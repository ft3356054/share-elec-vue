<template>
   <div class="warp">
     <div class="head">
         <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span> 支付</p>
     </div>
         <div class="top">
           <div class="top-box">
               <b>支付金额</b>
               <p>￥<span>{{this.list.customerPrice}}</span></p>
           </div>
           <div class="top-bottom">
             <div class="box">标题 <span>{{this.list.customerEvaluateTitle}}</span></div>
             <div class="box">订单编号<span class="spa">{{this.list.orderId}}</span></div>
             <div class="box">状态 <span class="spans">{{this.status}}</span></div>
           </div>
             <div class="bt">
              <button>取消</button>
              <button @click="pay()">支付</button>
              </div>
         </div>
    
   </div>
</template>

<script>
export default {
    data() {
        return {
            list:"",
            status:"",
            orderId:""
        }
    },
    mounted() {
        console.log(this.$route.params.orderId)
        this.orderId=this.$route.params.orderId
         this.$api.get(`/orderCustomer/${this.orderId}`,{
       },res=>{
            console.log(res)
           console.log(res.data.resultValue.items[0])
           this.list=res.data.resultValue.items[0]
           console.log(this.list)
           if(res.data.resultValue.items[0].orderStatus==="0"){
                this.status="待支付上门费"
           }else{
                this.status="待支付维修费"
           }
       })
    },
   methods:{
       fh(){
           this.$router.go(-1)
       },
    //    支付
       pay(){
           this.$router.push({
               path:'/Paytwo',
                query: {
                money:this.list.customerPrice,
                orderId:this.orderId,
                source:"8888"
                }
           }) 
       }
   }
}
</script>

<style lang="scss" scoped>
.warp{
   width: 100%;
   height: 100%;
   margin: 0 auto;
   position: relative;
     background: #f3f8fe;
}
.head{
    width: 100%;
    height: 140px;
    background: #87CEFA;
    text-align: center;
    border-radius:0 0 20% 20%;
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
.top{
    position: absolute;
    width: 94%;
    height: 425px;
    background: #fff;
    top: 10%;
    left: 3%;
    margin: 0 auto;
    padding: 0 25px;
    border-radius: 8px;
    box-shadow: 0 -6px  3px #B4E0FC ;
    // box-shadow: 0 -10px  1px #93D3fb;
    .top-box{
        text-align: center;
        margin: 62px 0;
        b{
           font-size: 12px;
             color: #000; 
        }
        p{
             font-size: 24px;
              color: #FFBA00;
        }
        span{
            font-size: 45px;
        }
    }
    .top-bottom{
        margin-top: 80px;
        height: 190px;
       .box{
           height: 36px;
            line-height: 30px;
            color: #999999;
            font-size: 13px;
          span{
              float: right;
              color: #666666;
              font-weight: bold;
          }
          .spans{
              color: #318Ec8;
          }
          .spa{
                  word-break:normal; 
                    display:block; 
                    white-space:pre-wrap;
                    word-wrap : break-word ;
                    overflow: hidden ;
                    font-size: 12px;
          }
       }
    }
    }
.bt {
  width: 100%;
  height: 90px;
  float: left;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  button {
    margin-left: 10px;
    width: 85px;
    height: 37px;
    background: #66bdf3;
    border-radius: 20px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
  :nth-child(1){
    background: none;
    color: #6b6c6c;
    border: 1px solid #c0c2c4;
    
  }
}
</style>
