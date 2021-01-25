<template>
  <div class="warp">
    <div class="head">
      <p>
        <span @click="fh()"><img src="@/assets/images/bai.png" alt="" /></span
        >需求发起
      </p>
    </div>
    <div class="bottom">
      <div class="btt">
        <button @click="submit">提交</button>
        <!-- <input type="button" value="提交"> -->
      </div>
    </div>
    <div class="top">
      <ul class="ipt">
        <li>
          <span>*</span><b>标题</b>
          <input type="text" v-model="customerEvaluateTitle" placeholder="请输入标题" />
        </li>
        <li class="des">
          <span>*</span><b>内容说明</b>
          <textarea
            v-model="customerDescrive"
            placeholder="请输入故障问题"
          ></textarea>
        </li>
        <li>
          <span>*</span><b>需求类型</b>
          <select v-model="selected" >
            <option disabled value="">请选择</option>
            <option  v-for="(item,index) in selectList" :key="index" v-bind:value="item.orderTypeId">{{item.orderTypeName}}</option>
          </select>
        </li>
        <li>
          <span>*</span><b>电压</b>
          <select v-model="voltage" >
            <option disabled value="">请选择</option>
            <option  v-for="(item,index) in baseVoltageData" :key="index" v-bind:value="item.voltage">{{item.voltage}}</option>
          </select>
        </li>
        <li><span v-html="err"></span><b>用电户号</b> <input type="text" v-model="registeredNumber" placeholder="请输入户号" /></li>
        <li>
          <span>*</span><b>选择身份</b     
          ><select v-model="sele">
            <option disabled value="">请选择</option>
            <option v-for="(item,index) in idendata" :key="index" v-bind:value="item.identityId">{{item.identityName}}</option>
          </select>
        </li>
        <li class="liimg">
          <span>*</span><b>地址</b>
          <input
            type="text"
            v-model="customerAddress"
            style="padding-right: 7%"
            placeholder="请输入地址"
          />
          <img src="@/assets/images/position.png" alt="" />
        </li>
        <li>
          <span v-html="err"></span><b>预约时间</b>
          <van-cell v-model="dataTime" @click="showPopup"
            ><input type="text" v-model="dataTime"
          /></van-cell>
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '40%' }"
          >
            <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              title="选择完整时间"
              :formatter="formatter"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="confirm"
              @cancel="cancel"
            />
          </van-popup>
        </li>
        <li>
          <span>*</span><b>联系人</b>
          <input type="text" v-model="customerName" />
        </li>
        <li>
          <span>*</span><b>联系电话</b>
          <input type="text" v-model="customerPhonenumber" />
        </li>
        <li>
          <span v-html="err"></span><b>上传照片</b>
          <div class="ploader">
            <van-uploader v-model="fileList" multiple :after-read="onRead">
              <van-button type="primary" class="loader">
                <dl>
                  <dt><img :src="imgs" alt="" /></dt>
                  <dd>添加照片</dd>
                </dl>
              </van-button>
            </van-uploader>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      show: false,
      err: "&#160",
      selected: "",  //类型ID 
      sele: "",  //身份ID
      imgs: require("@/assets/images/addpeople.png"),
      fileList: [],
      selectList:[],
      idendata:[],
      customerId: "",  //用户
      customerName: "",   //联系人
      customerPhonenumber: "",  //手机号
      customerEvaluateTitle: "", //标题
      customerDescrive: "",  //详情内容
      voltage: "",  //  电压
      customerAddress: "", //地址
      appointmentTime: "",  //预约时间
      provinceId:"", //省份ID
      minDate: new Date(),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
      dataTime: "",
      registeredNumber:"",  //户号
      baseVoltageData:[],
      files:{},
      fd:{},
      addressLongitude:117.223132, //坐标
      addressLatitude:39.134212,  //坐标
      set:"",
    };
  },
  created() {
    this.select()   //获取类型的数据
    this.iden()  //获取身份
    this.baseVoltage()  //获取电压
  }, 

  methods: {
    showPopup() {
      this.show = true;
    },
    confirm(d) {   //时间点击确认
      
      this.show = false;
      this.dataTime =
        d.getFullYear() +
        "/" +
        (Number(d.getMonth()) + 1) +
        "/" +
        d.getDate() +
        "/ " +
        d.getHours() +
        "/" +
        d.getMinutes();
      console.log(this.dataTime);
      this.appointmentTime=this.dataTime
      // this.starttime1 = new Date(this.currentDate).getTime() / 1000
    },
    cancel() {     //时间  点击取消
      this.show = false;
    },
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      if (type === "hour") {
        return val + "时";
      }
      if (type === "minute") {
        return val + "分";
      }
      return val;
    },
    fh() {
      //返回上一级
        this.$router.push("/customer")
    },
    select() {    //获取类型
      this.$api.get(
        `/baseOrderType/queryAll/`,
        {},
        (res) => {
          // console.log(res.data.resultValue);
          this.selectList=res.data.resultValue.items    
        }
        
      );
      console.log(this.selected)
    },
    iden(){   //获取身份
        this.$api.get(
                `/baseIdentityDetail/queryAll/`,
                {},
                (res) => {
                  // console.log(res.data.resultValue);
                  this.idendata=res.data.resultValue.items
                }
              );
    },
    baseVoltage(){  //获取电压
          this.$api.get(
                `/baseVoltage/queryAll/`,
                {},
                (res) => {
                  // console.log(res.data.resultValue);
                  this.baseVoltageData=res.data.resultValue.items
                }
              );
    },
    submit() {    //提交
       if(this.customerEvaluateTitle==""|| null){
             Toast("标题不能为空")
       }else if(this.customerDescrive=="" || null){
              Toast("内容说明不能为空")
       }else if(this.selected=="" || null){
              Toast("请选择需求类型")
       }else if(this.voltage=="" || null){
              Toast("请选择电压")
       }else if(this.sele=="" || null){
              Toast("请选择身份")
       }else if(this.customerAddress=="" || null){
              Toast("地址不能为空")
       }else if(this.customerName=="" || null){
              Toast("联系人不能为空")
       }else if(this.customerPhonenumber=="" || null){
              Toast("联系电话不能为空")
       }else{
           var fd = new FormData()
              if(this.files===null || this.files===""){
                  fd.append("myFile","")
              }else{
                fd.append('myFile',this.files)
              }
             this.fd=fd
            let customerDescrive=this.customerDescrive.replace(/\n|\r\n/g,"")
             this.fd.append("items",
             `{"customerId":"${this.customerId}",  
                "customerName":"${this.customerName}",
                 "customerPhonenumber":"${this.customerPhonenumber}", 
                  "customerDescriveTitle":"${this.customerEvaluateTitle}", 
                  "customerDescrive":"${customerDescrive}",  
                  "orderTypeId":"${this.selected}",   
                  "voltage":"${this.voltage}", 
                  "identityId":"${this.sele}",  
                  "registeredNumber":"${this.registeredNumber}", 
                  "provinceId":"1",
                  "customerAddress":"${this.customerAddress}", 
                  "appointmentTime":"${this.appointmentTime}", 
                  "addressLongitude":"${this.addressLongitude}",
                  "addressLatitude":"${this.addressLatitude}"
                }`)
            this.$axios.post(
                    `/orderCustomer/save`,
                    this.fd,{headers: {'Content-Type': 'multipart/form-data'}},
                    
                  ).then(res=>{
                    console.log(res)
                    if(res.data.successful==true){
                       Toast.success('发单成功'), 
                      this.set=setTimeout(()=>{
                            this.$router.push({
                            path: `/Pay/${res.data.resultValue.items[0].orderId}`,
                         })  
                        },1000)    
                    }else{
                       Toast.fail('发单失败')
                    }
                    
                  });  
       }  
    },
    // 用户信息
    custtom(){
          this.$api.get(
                `/customerInfo/${this.customerId}`,
                {},
                (res) => {
                  console.log(res.data);
                  let red=res.data.resultValue
                  this.customerName=red.customerName
                  this.customerPhonenumber=red.customerPhonenumber
                  this.registeredNumber=red.registeredNumber
                }
              );
    },
    //  图片上传
    onRead(file) {
           this.files=file.file  
      // console.log(this.files)
    },
  },
  mounted() {
    this.customerId = this.$route.query.cust;
     this.custtom()  //获取个人信息
  },
    destroyed() {
      clearInterval(this.set)
  },
};
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: #f3f8fe;
}
.head {
  width: 100%;
  height: 140px;
  background: #87cefa;
  text-align: center;
  border-radius: 0 0 20% 20%;
  p {
    position: relative;
    display: block;
    font-size: 20px;
    color: #fff;
    padding: 10px 10px;
    span {
      position: absolute;
      top: 30%;
      left: 5%;
      img {
        width: 80%;
        height: 100%;
      }
    }
  }
}
.bottom {
  height: 540px;
  background: #f3f8fe;
  position: relative;
}
.top {
  position: absolute;
  width: 94%;
  // height: 650px;
  background: #fff;
  top: 10%;
  left: 3%;
  margin: 0 auto;
  padding: 15px 15px;
  border-radius: 8px;
  .ipt {
    span {
      color: red;
      margin-right: 5px;
    }
    li {
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      b {
        font-size: 12px;
      }
      input {
        width: 70%;
        float: right;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #ebebeb;
        color: #000;
        font-size: 12px;
      }
      textarea {
        float: right;
        width: 185px;
        height: 80px;
        line-height: 20px;
        border: none;
        border-bottom: 1px solid #ebebeb;
        font-size: 12px;
      }
      select {
        float: right;
        width: 190px;
        height: 30px;
        border: none;
        border-bottom: 1px solid #ebebeb;
        outline: none;
        -webkit-appearance: none;
      }
    }
    .liimg {
      position: relative;
      img {
        position: absolute;
        right: 0px;
        top: 1%;
        width: 7%;
      }
    }
    .ploader {
      float: right;
      width: 190px;
      height: 73px;
      border: 2px dashed #87cefa;
      color: #87cefa;
      position: relative;
      text-align: center;
      overflow: hidden;
      dl {
        width: 70px;
        // opacity: 1;
        position: absolute;
        top: 20%;
        left: 35%;
        dt {
          width: 35px;
          height: 28px;
          img {
            margin-left: 10px;
            width: 100%;
            height: 100%;
          }
        }
        dd {
          color: #87cefa;
          font-weight: bold;
          margin-top: 5px;
          font-size: 12px;
          text-align: left;
        }
      }
      /deep/ .van-uploader__preview-image {
        display: block;
        width: 185px;
        height: 70px;
        overflow: hidden;
      }
      .loader {
        width: 185px;
        height: 70px;
        border: none;
        background: #fff;
      }
    }
    /deep/ .van-cell {
      input {
        border: none;
        width: 77%;
        float: left;
      }
      width: 70%;
      float: right;
      padding: 0 0;
      border-bottom: 1px solid #ebebeb;
    }
  }
}
.btt {
  position: absolute;
  bottom: 2%;
  left: 50%;
  margin-left: -61px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    // margin: 50px 60px;
    width: 132px;
    height: 38px;
    background: #66bdf3;
    border-radius: 20px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;
  }
}
.des{
  // background: red;
  height: 80px !important;
}
</style>
