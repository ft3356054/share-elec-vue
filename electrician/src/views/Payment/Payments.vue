<template>
  <div class="warp">
     <div class="head">
         <img src="../../assets/images/back.png" alt="">
         <b>支付成功</b>
     </div>
     <div class="img">
         <img src="../../assets/images/payments.png" alt="">
     </div>
     <span>您的订单支付成功！</span>
     <p>订单编号：  {{ban}}</p>
     <p>订单金额：   {{na}}</p>
     <button>返回</button>
  </div>
</template>

<script>
export default {
  data() {
      return {
          ban:"20111112022",
          na:"￥150.00"
      }
  },
}
</script>

<style lang="scss" scoped>
.warp{
   width: 100%;
   height: 100%;
   margin: 0 auto;
   text-align: center;
   background: #fff;
}
.head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    img{
        position: absolute;
        left: 15px;
        top:35%;
        width: 15px;
        height: 15px;
    }
    b{
        display: block;
        text-align: center;
        font-size: 20px;
        color: #000;
    }
}
.img{
    margin: 60px 20px 0px 10px;
    img{
        width: 50%;
        height: 50%;
    }
}
span{
    display: block;
    margin: 20px 0 40px 0;
    font-size: 18px;
    color: #000;
    font-weight: 800;
}
p{
    display: block;
    font-size: 13px;
    color: #666666;
    height: 21px;
    text-align: left;
    margin-left: 20%;
    line-height: 21px;
}
button{
    margin-top: 125px;
    width:85px ;
    height: 38px;
    border-radius: 20px;
    background: #fff;
    border: 1px solid #999999;
    outline: none;
    color: #666666;
    font-size: 15px;
}
</style>