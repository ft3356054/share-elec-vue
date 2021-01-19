<template>
  <div class="contianer">
      <header>
        <div class="topserch">
          <p @click="goback"><img src="@/assets/images/jiantou.png" alt=""></p>
          <p>服务评价</p>
        </div>
      </header>
      <section>
            <textarea v-model="context" name="" id="" cols="51" rows="6" placeholder="评价内容"></textarea>

            <div class="content">
                  <div class="xuxian">
                    <dl>
                        <dt>
                            <van-uploader v-model="fileLists" multiple :max-count="1"  :after-read="upimgbtn">
                            <img :src="imgs" alt="" style="width: 34px;height: 24px;display:block">
                            </van-uploader>
                        </dt>
                        <dd>添加照片</dd>
                    </dl>
                </div>
            </div>
            
            <div class="btns"><button @click="order">提交</button></div>

      </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      context:"",
      imgs: require('../../../assets/images/addpeople.png'),
      fileLists:[],
      files:{},
      orderId:"",
      electricianId:""
    }
  },
  mounted(){
    this.orderId=this.$route.params.orderId
    this.electricianId=this.$route.params.electricianId
  },
  methods: {
    goback(){
      this.$router.push("/electricianend")
    },
    upimgbtn(file){
        this.files=file.file
    },
    order(){
         var fd=new FormData()
         if(this.files===null|| this.files===""){
             fd.append("myFile","")
         }else{
             fd.append("myFile",this.files)
         }
         this.files=fd
        this.files.append("items",`{
            "orderId":"${this.orderId}",
            "method":"评价",
            "electricianId":"${this.electricianId}",
            "orderElectricianStatus":"9",
            "electricianEvaluate":"${this.context}"}`)
        this.$axios.post("/orderElectrician/booking", this.files, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
            this.$router.push("/electricianend")
            console.log(res)
        }).catch(err => {
            alert(err)
        })

    }
  }
}
</script>

<style scoped>
.contianer{
width: 100%;
height: 100%;
margin: 0;
padding: 0;
background: #f0f6fd;
display: flex;
flex-direction: column;
}
header{
width: 100%;
height: 80px;
}
.topserch{
width: 100%;
height: 100%;
background: #87cefa;
display: flex;
box-sizing: border-box;
line-height: 80px;
}
.topserch p:nth-child(1){
padding-left: 15px;
}
.topserch p:nth-child(2){
flex: 1;
text-align: center;
box-sizing: border-box;
color: #ffffff;
}
section{
    flex: 1;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
}
section textarea{
    border: 0;
    font-size: 12px;
}
.content{
    margin-top: 10px;
}
.xuxian{
  width: 100%;
  height: 100px;
  border:1px dashed #bae2fc;
  box-sizing: border-box;
  background: #f7fbff;
  position: relative;
  overflow: hidden;
    margin-top: 10px;
}
 .xuxian dl{
    text-align: center;
    margin: 0;
    padding: 0;
    padding-top: 20px;
}
.xuxian dl dt{
  width: 100%;
  height: 100%;
}
.xuxian dl dd{
font-size: 13px;
color: #66b3e5;
margin: 0;
padding: 0;
}
/deep/  .xuxian dl dt .van-uploader__upload{
  width: 50px;
  height:20px;
  margin-top: 10px;
background: #ffffff;
}
/deep/  .xuxian dl dt .van-uploader__preview-image{
     display: block;
    height: 100px;
    overflow: hidden;
    margin: 0;
}
/deep/   .xuxian dl dt .van-uploader__preview-image{
  display: block;
    width: 100%;
    height: 100px;
    margin-top: -22px;
    object-fit: fill;
}
/deep/   .xuxian dl dt .van-uploader__preview-image img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill !important;
}
/deep/ .van-uploader__preview{
  margin: 0;
}
/deep/ .van-uploader__preview-delete{
  margin-top: -17px;
}
.btns{
    text-align: center;
    margin-top: 20px;
}
.btns button{
width: 83px;
height: 36px;
border: 0;
outline: none;
border-radius: 20px;
background: #6dc0f5;
color: #ffffff;
font-size: 15px;
font-weight: bold;
}
</style>
