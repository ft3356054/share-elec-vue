<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>上传合同</p>
    </div>
    <div class="contentbox">
        <div class="content">
            <div>
                <p class="titles"><span></span>基本信息</p>
                <p class="pswidth"><span>订单编号</span><span>2020111310500004</span> </p>
                <p class="pswidth"><span>订单来源</span><span>95598</span> </p>
                <p class="pswidth"><span>标题</span><span>插座跳闸</span> </p>
                <p class="pswidth"><span>联系人</span><span>杨磊</span> </p>
                <p class="pswidth del"><span>联系电话</span> <span>159****8080</span></p>
                <p class="pswidth del"><span>发单时间</span> <span>2020/11/09 16:51</span></p>
                <p class="pswidth"><span>上门费</span><span id="money">¥1500</span></p>
                <p class="pswidth"><span>状态</span><span>待预约</span></p>
                <p class="pswidth"><span>勘察情况</span> <span>机房主配电箱10kv开关烧坏，开关需要更换</span> </p>
            </div>

        </div>
        <div class="yuyuetime">
            <div class="prices">
                <span>*</span>
                <span>维修价格</span>
                <span><input type="text" placeholder="请输入服务内容报价"></span>
            </div>
            <div class="uploudimg">
                <span>*</span>
                <span>上传合同</span>
                <span>
               <dl>
                  <dt>
                    <van-uploader v-model="fileLists" multiple :max-count="1"  :after-read="upimgbtn">
                      <img :src="imgs" alt="" style="width: 34px;height: 24px;display:block">
                    </van-uploader>
                  </dt>
                  <dd>上传图片</dd>
                </dl>
                </span>
            </div>
        </div>
    <div class="buttons"><button @click="Order">提交</button></div>

    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      phone: 13739865412,
      imgs: require('../../../assets/images/addpeople.png'),
      fileLists: []
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    Order () {
      this.$router.push('/personneladd')
    },
    godel () {
      window.location.href = `tel:15541544454`
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
position: relative;
padding-bottom: 20px;
box-sizing: border-box;
overflow: auto;
}
.contianer .backgroundbox{
    width: 100%;
    height: 150px;
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
font-size: 25px;
padding-left: 20px;
}
.contianer .backgroundbox p:nth-child(2){
flex: 1;
text-align: center;
font-size: 20px;
font-weight: bold;
}
.contentbox{
    position: absolute;
    top: 85px;
    left: 0;
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
}
.contentbox .content{
    width: 100%;
    height: auto;
    border-radius: 16px;
    background: #ffffff;
    padding: 15px 20px;
box-sizing: border-box;
    margin-top: 10px;
   box-shadow: 0px -5px 0px  #b4e0fc,0 -9px 0 #93d3fb;

}

.contentbox .content div{
margin-top: 30px;
}
.contentbox .content div:nth-child(1){
margin-top: 20px;
}
.contentbox .content div .titles{
font-size: 15px;
font-weight: bold;
}
.contentbox .content div .titles span{
display: inline-block;
width: 4px;
height: 13px;
background-color: #f65b6a;
margin-right: 10px;
}
.contentbox .content div .pswidth{
display: flex;
}
.contentbox .content div .pswidth span:nth-child(1){
width: 55px;
font-size: 13px;
margin-right: 27px;
margin-left: 14px;
color: #6f6f6f;
}
.contentbox .content div .pswidth span:nth-child(2){
flex: 1;
width: 55px;
font-size: 13px;
margin-right: 27px;
color: #111111;
font-weight: bold;
}
.contentbox .content div .pswidth span:nth-child(3) {
    font-size: 14px;
    color: #83ccfa;
}
.contentbox .content div .pswidth span:nth-child(3) img{
float: left;
width: 20px;
height: 20px;
margin-right: 10px;
}
.contentbox .yuyuetime{
    width: 100%;
    height: auto;
    background: #ffffff;
    margin-top: 15px;
    border-radius: 16px;
    line-height: 60px;
    font-size: 15px;
    box-sizing: border-box;
    padding: 10px 15px;
}

.prices{
    display: flex;
    width: 100%;
}
.prices span:nth-child(1){
   color: red;
margin-right: 10px;
}
.prices span:nth-child(2){
   color: #6f6f6f;
   font-size: 13px;
margin-right: 10px;
}
.prices span:nth-child(3){
    flex: 1;
    border-bottom: 1px solid #cccccc;
    box-sizing: border-box;
    margin: 0 20px;
}
.prices span:nth-child(3) input{
 height: 20px;
 border: 0;
 outline: none;
 width: 100%;
}
.uploudimg{
    display: flex;
    width: 100%;
    margin-top: 20px;
}
.uploudimg span:nth-child(1){
   color: red;
margin-right: 10px;
}
.uploudimg span:nth-child(2){
   color: #6f6f6f;
   font-size: 13px;
margin-right: 10px;
}
.uploudimg span:nth-child(3){
   width: 92px;
   height: 92px;
   /* flex: 1; */
   display: inline-block;
   margin-left: 20px;
   overflow: hidden;
}
.uploudimg span:nth-child(3) dl{
    text-align: center;
    margin: 0;
    padding: 0;
    border: 2px dashed #e1f2fd;
    padding-top: 11px;
    box-sizing: border-box;
}
.uploudimg span:nth-child(3) dl dt{
  width: 100%;
  height: 100%;
}
.uploudimg span:nth-child(3) dl dd{
  margin: 0;
    padding: 0;
    margin-top: -15px;
    font-size: 13px;
    color: #68b4e5;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader{
position: static;
display: inline;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader__wrapper{
justify-content: center;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader__preview{
margin: 0;
    width: 100%;
    height: 100%;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader__preview-image{
    margin-top: -10px;
        width: 92px;
    height: 92px;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader__preview-delete{
    top: -7px;
}
#money{
    color: #f76f7c;
}
.buttons{
    text-align: center;
    margin-top: 20px;
}
.buttons button{
width: 140px;
height: 40px;
border: 0;
outline: none;
border-radius: 20px;
background: #6dc0f5;
color: #ffffff;
font-size: 15px;
font-weight: bold;
}
@media (max-width: 375px) {
  .contentbox{
    width: 100%;
    height: 710px;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
}
}

</style>>
