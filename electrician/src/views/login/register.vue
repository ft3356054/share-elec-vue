<template>
    <div class="warp">
             <div class="head">
              <p><span @click="fh()"><img src="../../assets/images/back.png" alt=""></span></p>
           </div>
          <header v-if="this.list==1"><h4>欢迎加入</h4></header>
          <header v-else><h4>重置密码</h4></header>
           <van-form >
                    <van-field
                        v-model="phone"
                        name="pattern"
                        placeholder="请填写手机号码"
                        clearable
                        maxlength="11"
                        autocomplete=“off”
                        :rules="[{ pattern, message: '请填写正确的手机号' }]"
                    />
                    <van-field
                        v-model="sms"
                        center
                        clearable
                        autocomplete=“off”
                        name="pattern1"
                        placeholder="请输入填写验证码"
                    >
                     <template #button>
                        <button v-show="show" class="but"   @click="smss()">发送验证码</button>
                        <button v-show="!show" class="but1" disabled>{{count}}s</button>
                    </template>
                    </van-field>
                    <div style="margin: 16px;">
                        <van-button round block type="info" @click="onSubmit">下一步</van-button>
                    </div>
                 </van-form>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
   data() {
       return {
             phone: '',
             sms: "",
             show: true,
            count: '',
            timer: null,
            pattern:/^1[3|4|5|7|8][0-9]{9}$/,
            pattern1:"/^[\s\S]*.*[^\s][\s\S]*$/",
            list:""
       }
   },
   mounted() {
       this.list=this.$route.query.list
   },
     methods: {
         fh(){
            this.$router.go(-1)
         },
        //  下一步
        onSubmit() {
            if(this.phone==""){
               Toast({
                    message: '手机号码不能为空',
                    position: 'top',
                    });
            }else if(this.sms==""){
               Toast({
                    message: '请输入验证码',
                    position: 'top',
                    });
            }else{
                   this.$axios.post(
                    `/userLogin/authCodeVerify`,
                `{"items":[{"phonenumber":"${this.phone}","authCode":"${this.sms}"}]}`,{headers: { "Content-Type": "application/json" }} 
                ).then(res=>{
                    if(res.data.successful==false){
                        //  console.log(res.data.resultHint)
                        Toast(res.data.resultHint)
                    }else{
                        Toast.success('验证成功')
                        // console.log(res.data)
                        this.$router.push({
                            name:"Reset",
                            params:{
                                phone:this.phone,
                                sms:this.sms
                            }
                        })
                    } 
              })  
            }
        },
        // 点击发送验证码
        smss(){
            if(this.phone==""){
               Toast({
                    message: '手机号码不能为空',
                    position: 'top',
                    });
            }else{
                this.getCodes()
                this.getdx()
            }
            
        },
        // 短信验证码
        getdx(){
            this.$api.get(`/userLogin/authCode/${this.phone}`,{
       },res=>{
         console.log(res.data,"sss")
       })
        },
          // 60倒计时
        getCodes(){
        const TIME_COUNT = 60;
        if (!this.timer) {
            this.count = TIME_COUNT;
             this.show = false;
            this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            }
            }, 1000)
        }
        }
    }
}
</script>

<style lang="scss" >
   .warp{
    width: 100%;
    height: 100%;
     background: #fff ;
     position: relative;
}
.head{
    width: 100%;
    height: 55px;
    line-height: 55px;
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
            left: 3%;
            img{
                width: 80%;
                height: 100%;
            }
        }
    }
}
header{
    padding:25px 15px;
}
 .van-button--round{
    border-radius: 5px;
}
 .van-button--primary {
    color: #fff;
    background-color: dodgerblue;
    border: 0.0625rem solid dodgerblue;
}

.but{
   width: 86px;
    height: 32px;
    background: dodgerblue;
    color: #fff;
    border: none;
}
.but1{
   width: 86px;
    height: 32px;
    background: darkgray;
    color: #fff;
    border: none;
}

 .van-toast{
    top: 70px;
    color: #000; 
    background: bisque;
    }
  // input 选择历史记录默认样式
 input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
} 
</style>