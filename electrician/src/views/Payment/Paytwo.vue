<template>
   <div class="warp">
     <div class="head">
         <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span> 支付</p>
     </div>
         <div class="top">
            <div class="top-box">
               <b>支付金额</b>
               <p>￥<span>{{this.money}}</span></p>
           </div>
           <div class="top-bottom">
             <div class="box">订单编号<span class="spa">{{this.orderId}}</span></div>
             <div class="box">订单来源 <span class="spans">{{this.source}}</span></div>
             <div class="left"></div>
             <div class="right"></div>
           </div>
           <div class="bottom">
                <p>凭此二维码扫码支付</p>
                <div class="ma">
                    <base-Options></base-Options>
                </div>
           </div>
         </div>
         <div class="main">

         </div>
   </div>
</template>

<script>
export default {
   methods: {
       fh(){
           this.$router.go(-1)
       }
   },
   data () {
       return {
        money:"",
        orderId:"",
        source:""
       }
   },
   mounted() {
       console.log(this.$route.query) 
       this.money=this.$route.query.money;
       this.orderId=this.$route.query.orderId;
       this.source=this.$route.query.source
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
    // height: 553px;
    background: #fff;
    top: 10%;
    left: 3%;
    margin: 0 auto;
    padding: 0 30px;
    border-radius: 8px;
    box-shadow: 0 -6px  3px #B4E0FC ;
    // box-shadow: 0 -10px  1px #93D3fb;
      .top-box{
        text-align: center;
        margin: 30px 0;
          margin-top: 40px;
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
        height: 85px;
        border-bottom: 1px dashed #ccc;
        position: relative;
       .box{
           height: 36px;
            line-height: 36px;
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
       .left{
           width: 20px;
           height: 30px;
           line-height: 30px;
           border-radius: 0 30px 30px 0;
           position: absolute;
           left: -16.5%;
           top: 86%;
           background: #f3f8fe;
       }
       .right{
           width: 20px;
           height: 30px;
           line-height: 30px;
           border-radius: 30px 0  0 30px;
           position: absolute;
           right: -16.5%;
           top: 86%;
           background: #f3f8fe;
       }
     }
     .bottom{
         text-align: center;
         margin: 48px 0;
         .ma{
             margin: 23px auto;
             width:148px ;
             height: 148px;
            //  background: #000;
             margin-top: 23px;
         }
     }
}
.main{
    height: 470px;
       background: #f3f8fe;
}
</style>
