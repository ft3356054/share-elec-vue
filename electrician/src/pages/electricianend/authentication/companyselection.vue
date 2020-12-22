<template>
    <div class="contianer">
        <div class="backgroundbox">
            <div class="toptitle">
                <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
                <p>公司选择</p>
            </div>
             <div class="topinput">
                <p><input type="text" placeholder="输入公司进行搜索"></p>
                <p><button>搜索</button></p>
            </div>
        </div>
        <div class="content">
            <p>天津是东丽区公司1</p>
            <p>天津是东丽区公司2</p>
            <p>天津是东丽区公司3</p>
            <p>天津是东丽区公司4</p>
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
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
padding-bottom: 20px;
box-sizing: border-box;
display: flex;
flex-direction: column;
}
.contianer .backgroundbox{
    width: 100%;
    height: 100px;
    background-color: #87cefa;
    box-sizing: border-box;
    padding-top: 20px;
    box-sizing: border-box;
}
.contianer .backgroundbox .toptitle{
    padding: 0;
    margin: 0;
    color: #ffffff;
    display: flex;
}
.contianer .backgroundbox  .toptitle p:nth-child(1){
padding-left: 20px;
box-sizing: border-box;
}
.contianer .backgroundbox  .toptitle p:nth-child(2){
flex: 1;
text-align: center;
font-size: 15px;
font-weight: bold;
}
.contianer .backgroundbox .topinput{
    padding: 0;
    margin: 0;
    display: flex;
    margin-top: 15px;
}
.contianer .backgroundbox  .topinput p:nth-child(1){
flex: 1;
font-size: 13px;
text-align: center;
}
.contianer .backgroundbox  .topinput p:nth-child(1) input{
width: 240px;
height: 30px;
border-radius: 15px;
border: 0;
padding-left: 15px;
outline: none;
box-sizing: border-box;
}
.contianer .backgroundbox  .topinput p:nth-child(2) button{
font-size: 13px;
text-align: center;
width: 50px;
height: 30px;
border: 0;
outline: none;
background: #87cefa;
color: #ffffff;
}
.content{
  flex: 1;
  overflow: auto;
  padding: 10px 13px;
  box-sizing: border-box;
  font-size: 13px;
}
.content p{
border-bottom: 1px solid #cccccc;
margin-top: 15px;
padding-bottom: 10px;
}
</style>
