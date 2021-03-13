<template>
    <div class="warp">
     <div class="head">
         <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>添加电工号</p>
     </div>
     <ul class="ipt">
         <li><b>电工号:</b> <input  type="number"  v-model="digit" placeholder="请输入电工号"  /></li>
     </ul>
     <button class="but" @click="but">绑定</button>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
              selectList:[],
              digit: '',
              selected: '',
              showPicker: false,
              customerId:""
        }
    }, 
    mounted() {
       this.customerId=localStorage.getItem("customerId")
       this.getList()
   },
  methods: {
      fh(){
          this.$router.push("/my")
      },
       onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    getList(){
        this.$axios.get(`/baseProvince/queryAll/`,{withCredentials: true} ,{
       }).then(res=>{
           console.log(res.data.resultValue.items)
           this.selectList=res.data.resultValue.items
       })
    },
    // 点击添加户号
    but(){
        if(this.digit==""){
             Toast("请输入电工号")
       }else{
       this.$axios.post(
                `/electricianInfo/save`,
               `{"items":[{"openId":"${this.customerId}","electricianId":"${this.digit}"}]}`,{headers: { "Content-Type": "application/json" }}, {withCredentials: true} 
              ).then(res=>{
                if(res.data.successful==false){
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('绑定成功')
                       console.log(res.data)
                    //    this.$router.push("/my")
                  } 
              })  
       }
    },
  },
 
}
</script>

<style lang="scss" scoped>
.warp{
   width: 100%;
   height: 100%;
   margin: 0 auto;
   position: relative;
   background: #fff;
   overflow: hidden;
}
.head{
    width: 100%;
    height: 55px;
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
.but{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
   background: #87CEFA;
   border: none;
   color: #fff;
   cursor: pointer;
}
.ipt {
    li {
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      padding-right: 10px;
      b {
        font-size: 12px;
        display: inline-block;
       width: 50px;
       height: 30px;
       text-align: right;
      }
      input {
        width: 80%;
        float: right;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #ebebeb;
        color: #000;
        font-size: 12px;
      }
      select {
        float: right;
        width: 80%;
        height: 30px;
        border: none;
        border-bottom: 1px solid #ebebeb;
        outline: none;
        -webkit-appearance: none;
      }
    }
}
</style>