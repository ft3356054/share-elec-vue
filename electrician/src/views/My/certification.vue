<template>
    <div class="contianer">
        <div class="backgroundbox">
        <p  @click="goback"><img src="../../assets/images/jiantou.png" alt=""></p>
        <p>实名认证</p>
        </div>
        <div class="content">
          <div class="context">
            <ul class="uls">
                <van-form >
                <li>
                     <van-field
                        v-model="userName"
                        name="validator"
                        placeholder="请输入姓名"
                        label="姓名"
                        clearable
                        maxlength="10"
                        :rules="[{ validator, message: '请填写中文' }]"
                    />
                </li>
                <li>
                    <van-field
                        v-model="idCardNum"
                        name="pattern"
                        placeholder="请输入身份证"
                        label="身份证"
                        clearable
                        maxlength="18"
                        :rules="[{ pattern, message: '请填写正确的身份证号码' }]"
                    />
                </li>
                 </van-form>
            </ul>
            <div class="science">
                
              <p style="margin-top:10px"><span style="color:red">*</span>上传身份证正面</p>
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

              <p style="margin-top:10px"><span style="color:red">*</span>上传身份证背面</p>
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
      userName:"",
      idCardNum:"",
      pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    }
  },
  created () {
    
  },
    mounted () {
      this.customerId=localStorage.getItem("customerId")
  },
  methods: {
    goback () {
      this.$router.push("/my")
    },
     validator(val) {
      return /^[\u4e00-\u9fa5]+$/.test(val);
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
         if(this.userName==""){
           Toast("未输入姓名")
         }else if(this.idCardNum==""){
           Toast("未上输入身份证号码")
         }else if(this.fileList.length==0){
          Toast("未上传身份证正面")
         }else if(this.fileLists.length==0){
          Toast("未上传身份证背面")
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
            this.files.append("items",`{"userId":"${this.customerId}","userName":"${this.userName}","idCardNum":"${this.idCardNum}"}`)
            this.$axios.post("/orderRealAudit/save", this.files, {headers: {'Content-Type': 'multipart/form-data'}},{withCredentials: true}).then(res => {
            console.log(res)
            if(res.data.successful==true){
                Toast.success('提交成功')
                 localStorage.setItem("realNameAuth",0)
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

<style lang="scss" >
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
.uls{
    margin-top: 20px;
}
.contianer .backgroundbox{
      width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #87cefa;
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
  top: 50px;
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
  padding-bottom: 30px;
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
  margin-top: 25px;
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
            top: 0px;
            right: 5px;
      }
      .loader {
        width: 240px;
        height: 100px;
        border: none;
         background: #f7fbff;
      }
    }
      // input 选择历史记录默认样式
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
} 
</style>
