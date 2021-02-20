<template>
     <div class="warp">
           <div class="image">
               <img src="../../assets/images/banner.png" alt="">
           </div>
           <div class="conents">
               <van-form @submit="onSubmit">
                    <van-field
                        v-model="phone"
                        name="pattern"
                        placeholder="手机号码"
                        clearable
                        maxlength="11"
                        :rules="[{ pattern, message: '请填写正确的手机号' }]"
                    />
                    <van-field
                        v-model="password"
                        :type="seen?'password':'text'"
                        placeholder="密码"
                        clearable
                         maxlength="20"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    >
                     <img slot="right-icon" v-if="eye" @click="changeSeen"  :src="this.img" alt="" >   
                     </van-field>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">登陆</van-button>
                    </div>
                 </van-form>
                <span class="sps" @click="goregister(0)">忘记密码</span>   <span class="sp" @click="goregister(1)">立即注册</span> 
           </div>
     </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
    return {
      phone: '',
      password: "",
      pattern:/^1[3|4|5|7|8][0-9]{9}$/,
      type:"password",
      seen:"password",
      eye:true,
      img:require("../../assets/images/yc.png"),
      items:{}        
    }
  },
  methods: {
    onSubmit(values) {
      // console.log('submit', values);
           this.$axios.post(
                `/userLogin/login`,
               `{"items":[{"userAccount":"${this.phone}","userPsw":"${this.password}"}]}`,{headers: { "Content-Type": "application/json" }} 
              ).then(res=>{
                if(res.data.successful==false){
                    //  console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('登陆成功')
                       console.log(res.data)
                       if(res.data.resultValue.items[0].userType==0){
                           localStorage.setItem("customerId",res.data.resultValue.items[0].userId)
                           localStorage.setItem("realNameAuth",res.data.resultValue.items[0].realNameAuth)
                         this.$router.push("/customer")
                       }else if(res.data.resultValue.items[0].userType==1){
                          localStorage.setItem("customerId",res.data.resultValue.items[0].userId)
                         this.$router.push("/electricianend")
                       }
                       
                  } 
              })  
    },
     //点击图标看密码
    changeSeen(){
      var boo=this.type = this.seen ? 'password' : 'text';
      this.seen=!this.seen
      console.log(boo)
       if(boo==="password"){
         this.img=require("../../assets/images/xs.png") 
      }else if(boo==="text"){
         this.img=require("../../assets/images/yc.png")  
      }
    },
    goregister(index){
      this.$router.push({
        path:"/register",
        query:{
          list:index
        }
      })
    }
  },
}
</script>

<style lang="scss" >
.warp{
    width: 100%;
    height: 100%;
     background: #f3f8fe;
     position: relative;
}
.image{
    width: 100%;
    height: 230px;
    img{
        width: 100%;
        height: 100%;
    }
}
.conents{
    position: absolute;
    left: 2.5%;
     top: 32%;
     background: #fff;
     width: 95%;
     height: 380px;
     border-radius: 20px 20px;
     padding-top: 20px;
}
 .van-button--round{
    border-radius: 5px;
}
.sp{
   float: right;
    margin-right: 9px;
    font-size: 14px;
    color: blue;
}
.sps{
   float: left;
    margin-left: 9px;
    font-size: 14px;
    color: blue;
}
  // input 选择历史记录默认样式
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
} 
</style>

