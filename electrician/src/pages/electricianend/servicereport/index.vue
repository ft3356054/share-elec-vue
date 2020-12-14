<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox">
        <div class="content">
            <div>
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>订单编号</span><span>2202323232323</span></p>
                <p class="pswidth"><span>标题</span><span>插座跳闸</span></p>
                <p class="pswidth"><span>联系人</span><span>杨磊</span></p>
                <p class="pswidth"><span>联系电话</span><span>155****4545</span></p>
                <p class="pswidth"><span>发单时间</span><span>2020/11/03 16:10</span></p>
                <p class="pswidth"><span>状态</span><span>带现场勘察</span></p>
                <p class="pswidth"><span>维修价格</span><span id="money">¥1500</span></p>
                <p class="pswidth"><span>勘察情况</span> <span>变压器故障，变压器故障原因当前未知，请于业主联系</span> </p>
                <p class="pswidth"><span>施工人员</span> <span>刘磊 155454545454</span></p>
                <p class="pswidth"><span>施工内容</span> <span>变压器故障，变压器故障原因当前未知，请于业主联系</span></p>
            </div>
             <div>
                <p class="context"><span>*</span>上传服务报告</p>
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

        </div>
    <div class="buttons"><button @click="Order">完成施工</button></div>

    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      imgs: require('../../../assets/images/addpeople.png'),
      fileLists: []
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    Order () {
      this.$router.push('/')
    },
    returnorder () {
      this.$router.push('/returnorder')
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
.contentbox .content div .pswidth span:nth-child(3) img{
float: left;
width: 20px;
height: 20px;
margin-right: 10px;
}
.contentbox .yuyuetime{
    width: 100%;
    height: 60px;
    background: #ffffff;
    margin-top: 15px;
    border-radius: 16px;
    line-height: 60px;
    display: flex;
    font-size: 15px;
}
.contentbox .yuyuetime span:nth-child(1){
    color: red;
    padding-left: 34px;
    box-sizing: border-box;
}
.contentbox .yuyuetime span:nth-child(3){
flex: 1;
padding-left: 22px;
box-sizing: border-box;
}
.contentbox .yuyuetime span input{
border:none;
color: #4097ce;
background: #ffffff;
}
.contentbox .yuyuetime span input::-webkit-clear-button{
visibility:hidden;
}
.contentbox .yuyuetime span input::-webkit-calendar-picker-indicator{
border: 0;
outline: none;
background: #ffffff;
}
.contentbox .content div .context span:nth-child(1){
color: red;
font-size: 18px;
margin-right: 10px;
}
.contentbox .content div .context{
font-size: 15px;
font-weight: bold;
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
.xuxian{
  width: 100%;
  height: 100px;
  border:1px dashed #bae2fc;
  box-sizing: border-box;
  background: #f7fbff;
  position: relative;
  overflow: hidden;
}

 .xuxian dl{
    text-align: center;
    margin: 0;
    padding: 0;
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
