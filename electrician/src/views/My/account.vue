<template>
    <div class="warp">
     <div class="head">
         <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>添加户号</p>
     </div>
     <ul class="ipt">
         <li>
         <b>地区:</b>
          <select v-model="selected">
            <option disabled value="">请选择</option>
            <option  v-for="(item,index) in selectList" :key="index" v-bind:value="item.provinceId">{{item.provinceName}}</option>
          </select>
        </li>
         <li><b>户号:</b> <input  type="number" onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="digit" placeholder="请输入户号"  /></li>
         <!-- <li><van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="地区"
            placeholder="请选择地区"
            @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="list"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
            </van-popup>
         </li>
         <li> <van-cell-group>
               <van-field v-model="digit" type="digit" label="户号" placeholder="请输入户号" clearable />
              </van-cell-group>
        </li> -->
     </ul>
     <button class="but" @click="but">添加户号</button>
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
        if(this.selected==""){
             Toast("请选择地区")
       }else if(this.digit==""){
             Toast("请输入户号")
       }else{
       this.$axios.post(
                `/customerInfo/save`,
               `{"items":[{"customerId":"${this.customerId}","provinceId":"${this.selected}","registeredNumber":"${this.digit}"}]}`,{headers: { "Content-Type": "application/json" }}, {withCredentials: true} 
              ).then(res=>{
                if(res.data.successful==false){
                       Toast.fail(res.data.resultHint)
                  }else{
                       Toast.success('添加成功')
                       console.log(res.data)
                       this.$router.push("/my")
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
       width: 40px;
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