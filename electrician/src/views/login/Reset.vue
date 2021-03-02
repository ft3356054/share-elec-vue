<template>
    <div class="warp">
        <div class="head">
      <p>
        <span @click="fh()"><img src="@/assets/images/back.png" alt=""/></span
        >重置密码
      </p>
    </div>
               <van-form @submit="onSubmit">
                     <van-field
                        v-model="password"
                        :type="seen?'password':'text'"
                        placeholder="请设置登录密码(8~20位数字和大小写字母组合)"
                        clearable
                        fontSize="14"
                         maxlength="20"
                        name="pattern"
                        :rules="[{ pattern, message: '填写密码格式不正确' }]"
                        style="fontSize:14px"
                    >
                     <img slot="right-icon" v-if="eye" @click="changeSeen()"  :src="this.img" alt="" >   
                     </van-field>
                    <van-field
                        v-model="password1"
                        :type="seen1?'password':'text'"
                        placeholder="请再次输入登录密码"
                        clearable
                         maxlength="20"
                         style="fontSize:14px"
                        name="pattern"
                        :rules="[{ pattern, message: '填写密码格式不正确' }]"
                    >
                     <img slot="right-icon" v-if="eye1" @click="changeSeen1()"  :src="this.imgs" alt="" >   
                     </van-field>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">完成</van-button>
                    </div>
                 </van-form>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            password: '',
            password1: "",
            pattern:/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
            type:"password",
            seen:"password",
            eye:true,
             type1:"password",
            seen1:"password",
            eye1:true,
            img:require("../../assets/images/yc.png"),
            imgs:require("../../assets/images/yc.png"),
            phone:"",
            sms:"",
            list:""        
        }
    },
    mounted() {
      this.phone=this.$route.params.phone
       this.sms=this.$route.params.sms
       this.list=this.$route.query.list
    },
    methods: {
        fh(){
           this.$router.go(-1)
        },
          onSubmit(values) {
             if(this.password===this.password1){ 
                    this.postpass()
              }else{
                Toast({
                    message: '两次输入的密码不相同',
                    position: 'top',
                    });
              }
            console.log('submit', values);
            },
      // 请求修改密码
      postpass(){
        if(this.list==1){
          // 新增密码
            this.$axios.post(
                `/userLogin/add`,
               `{"items":[{"userPsw":"${this.password}","phonenumber":"${this.phone}","authCode":"${this.sms}"}]}`,{headers: { "Content-Type": "application/json" }} 
              ).then(res=>{
                if(res.data.successful==false){
                    //  console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('设置密码成功')
                       console.log(res.data)
                       this.$router.push("/login")
                  } 
              })  
        }else{
          // 更改密码
              this.$axios.post(
                `/userLogin/change`,
               `{"items":[{"userPsw":"${this.password}","phonenumber":"${this.phone}","authCode":"${this.sms}"}]}`,{headers: { "Content-Type": "application/json" }} 
              ).then(res=>{
                if(res.data.successful==false){
                    //  console.log(res.data.resultHint)
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('更改密码成功')
                       console.log(res.data)
                       this.$router.push("/login")
                  } 
              })  
        }
          
      },
     //点击图标看密码
    changeSeen(){
      var boo=this.type = this.seen ? 'password' : 'text';
      this.seen=!this.seen
    //   console.log(boo)
       if(boo==="password"){
         this.img=require("../../assets/images/xs.png") 
      }else if(boo==="text"){
         this.img=require("../../assets/images/yc.png")  
      }
     },
      changeSeen1(){
      var boo=this.type1 = this.seen1 ? 'password' : 'text';
      this.seen1=!this.seen1
    //   console.log(boo)
       if(boo==="password"){
         this.imgs=require("../../assets/images/xs.png") 
      }else if(boo==="text"){
         this.imgs=require("../../assets/images/yc.png")  
      }
    },
    },
    
}
</script>

<style lang="scss" >
   .warp{
    width: 100%;
    height: 100%;
     background: #fff;
     position: relative;
}
.head {
  width: 100%;
  height: 55px;
  line-height: 55px;
  margin-bottom: 20px;
  p {
position: relative;
    display: block;
    font-size: 16px;
    color: #000;
    padding: 0px 39%;
    span {
      position: absolute;
      top: 3%;
      left: 5%;
      img {
        width: 80%;
        height: 100%;
      }
    }
  }
}
 .van-button--round{
    border-radius: 5px;
}
  // input 选择历史记录默认样式
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
} 
 .van-toast{
    top: 40%;
    color: #000; 
    background: bisque;
    }
</style>