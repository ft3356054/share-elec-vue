<template>
    <div class="contianer">
        <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>电工注册认证</p>
        </div>
        <div class="content">
          <div class="context">
            <div class="topbox">
              <p>所属公司</p>
              <p>天津市东丽区1公司</p>
              <p><img src="../../../assets/images/textjiantou.png" alt=""></p>
            </div>

            <div class="science">

              <p>证明材料</p>
              <div class="xuxian">
                <dl>

                  <dt> <van-uploader v-model="fileList" multiple :max-count="1"  :after-read="blues">
                    <img :src="imgs" alt="" style="width: 34px;height: 24px;display:block">
                    </van-uploader></dt>
                  <dd>{{uptext}}</dd>
                </dl>
              </div>

              <p>电工证</p>
              <div class="xuxian">
                 <dl>
                  <dt>
                    <van-uploader v-model="fileLists" multiple :max-count="1"  :after-read="upimgbtn">
                      <img :src="imgs" alt="" style="width: 34px;height: 24px;display:block">
                    </van-uploader>
                  </dt>
                  <dd>{{uptext1}}</dd>
                </dl>
              </div>

            </div>
            <div class="examine"><button>提交审核</button></div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      uploader: '',
      imgs: require('../../../assets/images/addpeople.png'),
      fileList: [],
      fileLists: [],
      uptext: '上传材料',
      uptext1: '上传材料'
    }
  },
  mounted () {

  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      this.imgs = file.content
      console.log(this.imgs)
    },
    imgbtn () {
      var inputDOM = this.$refs.inputer
      console.log(inputDOM.files)
    },
    blues (file) {
      console.log(file)
      // this.uptext = ''
      console.log(this.fileList)
      if (this.fileList.length === 0) {
        // this.uptext = '上传材料'
        console.log(this.fileList)
      }
    },
    upimgbtn (file) {
      console.log(file)
      // this.uptext1 = ''
      console.log(this.fileLists)
    }
  }
}
</script>

<style scoped>
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
    height: 110px;
    background-color: #87cefa;
    border-bottom-right-radius: 20%;
    border-bottom-left-radius: 20%;
    display: flex;
    padding-top: 45px;
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
font-size: 20px;
font-weight: bold;
}
.content{
  width: 100%;
  height: auto;
  position: absolute;
  top: 88px;
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
  width: 7px;
  height: 13px;
  display: block;
  margin-top: 26px;
}
.science{
  width: 100%;
  height: auto;
  background: #ffffff;
  margin-top: 10px;
  border-radius: 10px;
  padding: 12px 28px;
  box-sizing: border-box;
  padding-bottom: 50px;
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
  margin-top: 15px;
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
  width: 145px;
  height: 45px;
  background: #6ec1f5;
  color: #ffffff;
  font-size: 15px;
}
</style>
