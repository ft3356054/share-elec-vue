<template>
    <div class="contianer">
        <div class="backgroundbox">
        <p  @click="goback"><img src="../../assets/images/jiantou.png" alt=""></p>
        <p>电工注册认证</p>
        </div>
        <div class="content">
          <div class="context">
            <div class="topbox" @click="choosebtn">
              <p>所属公司</p>
              <p>{{companyName}}</p>
              <p><img src="../../assets/images/textjiantou.png" alt=""></p>
            </div>

            <div class="science">
                 <ul class="ipt">
                   <li><span>*</span><div class="p1">姓名：</div><input type="text" v-model="electricianName"></li>
                   <li><span>*</span><div class="p1">手机号：</div><input type="text" v-model="electricianPhonenumber" /></li>
                 </ul>
              <p style="margin-top:10px"><span style="color:red">*</span>证明材料</p>
              <div class="ploader">
            <van-uploader v-model="fileList" multiple :after-read="upimgbtn">
              <van-button type="primary" class="loader">
                <dl>
                  <dt><img :src="imgs" alt="" /></dt>
                  <dd>上传材料</dd>
                </dl>
              </van-button>
            </van-uploader>
              </div>

              <p style="margin-top:10px"><span style="color:red">*</span>电工证</p>
               <div class="ploader">
            <van-uploader v-model="fileLists" multiple :after-read="upimgbtn">
              <van-button type="primary" class="loader">
                <dl>
                  <dt><img :src="imgs" alt="" /></dt>
                  <dd>上传证件</dd>
                </dl>
              </van-button>
            </van-uploader>
              </div>

            </div>
            <div class="examine"><button @click="order">提交审核</button></div>
          </div>
        </div>
    </div>
</template>
<script>
import bus from "../../libs/eventBus.js"
import { Toast } from 'vant';
export default {
  data () {
    return {
      uploader: '',
      imgs: require('../../assets/images/addpeople.png'),
      fileList: [],
      fileLists: [],
      files:{},
      fd:{},
      companyName:"",
      electricianId:"321",
      customerId:"",
      companyId:"11",
      subCompanyId:"",
      electricianName:"",
      electricianPhonenumber:""
    }
  },
  created () {
      this.customerId=this.$route.query.customerId
  },
    mounted () {
        console.log(this.$route.params)
        this.companyName=this.$route.params.companyName
        this.companyId=this.$route.params.companyId
  },
  methods: {
    goback () {
       this.$router.push("/my")
    },
    choosebtn(){
      this.$router.push({
        path:"/autCom",
        query:{
          customerId:this.customerId
        }
      })
    },
    blues (file) {
      console.log(file)
      this.files=file.file
    },
    //  图片上传
    upimgbtn (file) {
      console.log(file)
      this.fd=file.file
    },
    order(){
      if(this.companyId===undefined){
          Toast("未选择公司")
      }else if(this.electricianName==""){
          Toast("未输入姓名")
      }else if(this.electricianPhonenumber==""){
          Toast("未输入手机号")
      }else if(this.fileList.length==0){
          Toast("未上传证明材料")
      }else if(this.fileLists.length==0){
          Toast("未上传电工证")
      }else{
        this.customerId=localStorage.getItem("customerId")
      var fd=new FormData()
      if(this.files===null||this.files===""){
        fd.append("myFile","")
        fd.append("file2","")
      }else{
        fd.append("myFile",this.files)
        fd.append("file2",this.fd)
      }
      this.files=fd
       this.files.append("items",`{"customerId":"${this.customerId}","companyId":"${this.companyId}","electricianName":"${this.electricianName}","electricianPhonenumber":"${this.electricianPhonenumber}","companyName":"${this.companyName}"}`)
       this.$axios.post("/customerInfo/changeToElecInfo", this.files, {headers: {'Content-Type': 'multipart/form-data'}},{withCredentials: true}).then(res => {
           console.log(res)
           if(res.data.successful==true){
              Toast.success('提交成功')
             this.$router.push("/my")
           }
        }).catch(err => {
            alert(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contianer p{
  padding: 0;
}
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
position: relative;
padding-bottom: 20px;
box-sizing: border-box;
overflow: auto;
}
.contianer .backgroundbox{
      width: 100%;
    height: 90px;
    line-height: 60px;
    background-color: #87cefa;
    border-bottom-right-radius: 20%;
    border-bottom-left-radius: 20%;
    display: flex;
    box-sizing: border-box;
}
.contianer .backgroundbox p{
    padding: 0;
    margin: 0;
    color: #ffffff;
}
.contianer .backgroundbox p:nth-child(1){
padding-left: 20px;
box-sizing: border-box;
}
.contianer .backgroundbox p:nth-child(2){
flex: 1;
text-align: center;
font-size: 15px;
font-weight: bold;
}
.content{
  width: 100%;
  height: auto;
  position: absolute;
  top: 65px;
  left: 0;
  padding: 0 13px;
  box-sizing: border-box;
}

.context{
  width: 100%;
  height: 100%;
}
.topbox{
  width: 100%;
  height: 68px;
  background: #ffffff;
    border-radius: 10px;
  display: flex;
  line-height: 68px;
  padding: 0 28px;
  box-sizing: border-box;
   box-shadow: 0px -5px 0px  #b4e0fc,0 -9px 0 #93d3fb;
}
.topbox p{
  margin: 0;
  padding: 0;
}
.topbox p:nth-child(1){
  font-size: 13px;
}
.topbox p:nth-child(2){
  flex: 1;
  font-size: 13px;
  margin-left: 20px;
}
.topbox p:nth-child(3) img{
  width: 5px;
  height: 11px;
  display: block;
  margin-top: 28px;
}
.science{
  width: 100%;
  height: auto;
  background: #ffffff;
  margin-top: 10px;
  border-radius: 10px;
  padding: 12px 28px;
  box-sizing: border-box;
  padding-bottom: 20px;
}
.science p{
font-size: 13px;
}
.science p:nth-child(2){
margin-top: 40px;
}
.science .xuxian{
  width: 100%;
  height: 100px;
  border:1px dashed #bae2fc;
  box-sizing: border-box;
  margin-top: 5px;
  background: #f7fbff;
  position: relative;
  overflow: hidden;
}
.science .xuxian dl{
    text-align: center;
}
.science .xuxian dl dt{
  width: 100%;
  height: 100%;
  margin-top: 18px;
}
/deep/ .science .xuxian dl dt .van-uploader__upload{
  width: 50px;
  height:20px;
  margin-top: 10px;
background: #ffffff;
}
/deep/ .science .xuxian dl dt .van-uploader__preview-image{
     display: block;
    height: 100px;
    overflow: hidden;
    margin: 0;
}
/deep/  .science .xuxian dl dt .van-uploader__preview-image{
  display: block;
    width: 100%;
    height: 100px;
    margin-top: -18px;
    object-fit: fill;
}
/deep/  .science .xuxian dl dt .van-uploader__preview-image img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill !important;
}
/deep/ .van-uploader__preview{
  margin: 0;
}
/deep/ .van-uploader__preview-delete{
  margin-top: -16px;
}
.science .xuxian dl dd{
font-size: 13px;
color: #66b3e5;
margin: 0;
padding: 0;
}
.examine{
  text-align: center;
  margin-top:10px;
}
/deep/ .van-uploader__upload{
background: #f7fbff;
}
.examine button{
  border: 0;
  outline: none;
  border-radius: 25px;
  width: 130px;
  height: 35px;
  background: #6ec1f5;
  color: #ffffff;
  font-size: 15px;
}
 .ploader {
      width: 100%;
      height: 100px;
      border: 1px dashed #87cefa;
      margin-top: 5px;
      color: #87cefa;
      position: relative;
      text-align: center;
      overflow: hidden;
   
      dl {
        width: 70px;
        position: absolute;
        top: 30%;
        left: 40%;
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
       width: 240px;
        height: 100px;
        overflow: hidden;
      }
      /deep/ .van-uploader__preview-delete{
            position: absolute;
            top: 18px;
            right: 5px;
      }
      .loader {
        width: 240px;
        height: 100px;
        border: none;
         background: #f7fbff;
      }
    }
 .ipt {
   margin-bottom: 10px;
    span {
      color: red;
      // margin-right: 5px;
    }
    li {
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      .p1 {
        display: contents;
        width: 78px;
        font-size: 13px;
      }
      input {
        width: 70%;
        float: right;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #ebebeb;
        color: #000;
        font-size: 13px;
      }
    }
 }
</style>
