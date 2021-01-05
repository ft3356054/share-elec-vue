<template>
   <div class="warp">
     <div class="head">
         <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span> 支付</p>
     </div>
         <div class="top" v-for="(item,index) in list" :key="index">
           <div class="top-box">
               <b>支付金额</b>
               <p v-if="item.orderStatus=='0'">￥<span>{{item.customerPrice}}</span></p>
               <p v-else>￥<span>{{item.electricianPrice}}</span></p>
           </div>
           <div class="top-bottom">
             <div class="box">标题 <span>{{item.customerDescriveTitle}}</span></div>
             <div class="box">订单编号<span class="spa">{{item.orderId}}</span></div>
             <div class="box">状态 <span class="spans" v-if="item.orderStatus=='0'">待支付上门费</span>
             <span class="spans" v-else>待支付维修费</span>
             </div>
           </div>
             <div class="bt">
              <button v-if="item.orderStatus=='0'" @click="cancel">取消订单</button>
              <button v-else @click="th">退回</button>
              <button @click="pay()">支付</button>
              </div>
               <van-dialog v-model="show" title="" show-cancel-button class="show" 
                        @confirm="confirm(item.orderId)" @cancel="cancels"
                        >
                             <div class="box">确定取消订单吗？取消订单后不能回复</div>
                          </van-dialog>
         </div>
    
   </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            list:[],
            status:"",
            orderId:"",
            show:false,
            items:{}
        }
    },
    mounted() {
        console.log(this.$route.params.orderId)
        this.orderId=this.$route.params.orderId
         this.$api.get(`/orderCustomer/OrderDetail/${this.orderId}`,{
       },res=>{
           console.log(res.data.resultValue.items)
           this.list=res.data.resultValue.items
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
       },
        // 取消
    cancel(){
      this.show=true       
    },
    // 点击取消时
    cancels(){
     this.show=false
    },
     //   退回
     th(){
         var fd = new FormData()
         this.items=fd
      this.items.append("items",
             `{"orderId":"${this.orderId}",  
                "orderStatus":"22",
                }`)
          this.$axios.post("/orderCustomer/save",this.items).then(res=>{
            if(res.data.successful==false){
                     console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('退回成功')
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
/deep/ .show{
  width: 80%;
   .box{
   width: 100%;
    font-size: 13px;
    height: 80px;
    text-align: center;
    line-height: 80px;
  }
  button{
    font-size: 13px;
  }
}
/deep/ .van-overlay{
  background-color: rgba(0,0,0,.4);
}
</style>
