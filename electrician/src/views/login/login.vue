<template>
     <div class="warp">
           <div class="image">
               <img src="../../assets/images/banner.png" alt="">
           </div>
           <div class="conent">
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
      console.log('submit', values);
          // console.log(this.items)
          // var fd=new FormData()
          // this.items={}
          // this.items.append("items",`[{"userAccount":"${this.phone}","userPsw":"${this.password}"}]`)
          //  this.$axios.post(
          //       `/userLogin/login`,
          //      this.items
          //     ).then(res=>{
          //       if(res.data.successful==false){
          //           //  console.log(res.data.resultHint)
          //              Toast.fail("失败")
          //         }else{
          //              Toast.success('登陆成功')
                
          //         } 
          //     })  
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
.conent{
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

