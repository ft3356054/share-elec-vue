<template>
<div class="contianer">
    <div class="topbox">
        <p @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>个人信息</p>
    </div>
    <div class="userbox" v-for="(item,index) in userdata" :key="index">
        <div class="imgbox">
            <dl>
                <dt><img src="../../../assets/images/information.png" alt=""></dt>
                <dd>
                    <div>
                        <p>{{item.electricianName}}</p>
                        <p>{{item.electricianPhonenumber}}</p>
                    </div>
                    <div>
                     <span>电工</span>
                    </div>
                </dd>
            </dl>
        </div>
        <div class="information">
            <p><span>实名认证</span><span>否</span></p>
            <p><span>电工认证</span><span @click="gorenzheng"  style="color:#87cefa">高级电工></span></p>
            <p><span>签约公司</span><span>{{item.companyName}}</span></p>
            <p><span>服务状态</span><span @click="statebtn" style="color:#87cefa">{{morenmessaage}}</span></p>
        </div>
    <div class="btnbox"><button>退出登录</button></div>
    </div>
    <div class="popup">
        <div class="stateset">
            <p @click="guanbi"><img src="../../../assets/images/close.png" alt=""></p>
            <p>接抢单状态设置</p>
            <div>
                <dl @click="stylebtn1">
                    <dt><img :src="jdimgs" alt="" class="jiedan"></dt>
                    <dd>{{morenjd}}</dd>
                </dl>
                <dl @click="stylebtn2">
                    <dt><img :src="xximgs" alt="" class="xiuxi"></dt>
                    <dd>{{morenxx}}</dd>
                </dl>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      status: true,
      status1: false,
      morenjd: '接单中',
      morenxx: '休息',
      message: '接单中',
      message1: '接单',
      xiuxi: '休息',
      xiuxi1: '休息中',
      morenmessaage: '',
      img1: require('../../../assets/images/Receivingorderss.png'),
      img2: require('../../../assets/images/rests.png'),
      img01: require('../../../assets/images/Receivingorders.png'),
      img02: require('../../../assets/images/rest.png'),
      jdimgs: require('../../../assets/images/Receivingorderss.png'),
      xximgs: require('../../../assets/images/rest.png'),
      userdata:[],
      status1:""
    }
  },
  mounted () {
    document.getElementsByClassName('popup')[0].style.display = 'none'
    this.getuserinfo()
  },
  methods: {
    getuserinfo(){
      var params="321"
      var _this=this
      this.$axios.get("/orderElectrician/queryElectricianInfo/"+params).then(res => {
          _this.userdata.push(res.data.resultValue.items[0])
          _this.status1=res.data.resultValue.items[0].electricianStatus
          if(_this.status1=='1'){
            _this.status=true
            this.morenmessaage = "接单中"
          }else{
            _this.status=false
            this.morenmessaage = "休息中"
          }
          this.tab()
        });
    },
    goback () {
      this.$router.push('electricianend')
    },
    statebtn () {
      document.getElementsByClassName('popup')[0].style.display = 'block'
    },
    guanbi () {
      document.getElementsByClassName('popup')[0].style.display = 'none'
    },
    tab () {
      if (this.status === true) {
        this.morenjd = this.message
        this.morenxx = this.xiuxi
        this.jdimgs = this.img1
        this.xximgs = this.img02
        this.morenmessaage = "接单中"
      } else {
        this.morenjd = this.message1
        this.morenxx = this.xiuxi1
        this.jdimgs = this.img01
        this.xximgs = this.img2
        this.morenmessaage = "休息中"
      }
    },
    stylebtn1 () {
      var params={
        statu:"接单中"
      }
      params=qs.stringify(params)
       this.$axios.post("/electricianInfo/changeStatus/321", params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}) .then(res => {
        });
      if (this.status === false) {
        this.status = true
        this.status1 = false
      } else {
        this.status = false
        this.status1 = true
      }
      this.tab()
    },
    stylebtn2 () {
      var params={statu:"休息中"}
     params=qs.stringify(params)
       this.$axios.post("/electricianInfo/changeStatus/321", params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}) .then(res => {
        });
      if (this.status1 === false) {
        this.status1 = true
        this.status = false
      } else {
        this.status1 = true
        this.status = false
      }
      this.tab()
    },
    gorenzheng () {
      this.$router.push('/authentication')
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
position: relative;
overflow: auto;
}
.topbox{
    width: 100%;
    height: 135px;
    background: #87cefa;
    display: flex;
    padding-top: 10px;
    box-sizing: border-box;
}
.topbox p:nth-child(1){
   padding-left: 15px;
   box-sizing: border-box;
}
.topbox p:nth-child(2){
    flex: 1;
    text-align: center;
    color: #ffffff;
}
.userbox{
    width: 100%;
    height: 350px;
    position: absolute;
    top: 92px;
    left: 0;
    padding: 0 15px;
    box-sizing: border-box;
}
.imgbox{
    width: 100%;
    height: 120px;
    background: #ffffff;
    border-radius: 15px;
}
.imgbox dl{
width: 100%;
height: 100%;
display: flex;
}
.imgbox dl dt img{
    width: 50px;
    height: 50px;
    display: block;
    margin-top: 34px;
    margin-left: 23px;
}
.imgbox dl dd{
    width: 100%;
    display: flex;
}
.imgbox dl dd div:nth-child(1){
flex: 1;
margin-top: 36px;
}
.imgbox dl dd div:nth-child(1) p{
    margin: 0;
    padding: 0;
}
.imgbox dl dd div:nth-child(1) p:nth-child(1){
    font-size: 15px;
    font-weight: bold;
}
.imgbox dl dd div:nth-child(1) p:nth-child(2){
    margin-top: 5px;
    font-size: 13px;
    font-weight: bold;
}
.imgbox dl dd div:nth-child(2){
margin-top: 45px;
}
.imgbox dl dd div:nth-child(2) span{
    display: block;
    width: 45px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #ffffff;
    font-size: 13px;
    background: red;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
}
.information{
    width: 100%;
    height: auto;
    background: #ffffff;
    margin-top: 10px;
    border-radius: 15px;
    padding: 10px 15px;
    box-sizing: border-box;
}
.information p{
    margin: 0;
    padding: 0;
    display: flex;
    line-height: 50px;
    font-size: 13px;
}
.information p span:nth-child(1){
flex: 1;
}
.popup{
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
}
.stateset{
    width: 285px;
    height: 165px;
    background: #ffffff;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    padding: 10px;
    box-sizing: border-box;
}
.stateset p{
margin: 0;
padding: 0;
}
.stateset p:nth-child(1){
    width: 100%;
    height: 20px;
text-align: right;
}
.stateset p:nth-child(1) img{
width: 15px;
height: 15px;
display: block;
float: right;
}
.stateset p:nth-child(2){
text-align: center;
font-size: 13px;
font-weight: bold;
}
.stateset div{

display: flex;
}
.stateset div dl{
flex: 1;
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.stateset div dl dd{
padding: 0;
margin: 0;
letter-spacing: 1px;
font-size: 14px;
color: #333333;
}
.stateset div dl dt img{
width: 56px;
height: 56px;
display: block;
}
.btnbox{
  text-align: center;
  margin-top: 40px;
}
.btnbox button{
  border: 0;
  outline: none;
  width: 145px;
  height: 45px;
  background: #f0f6fd;
  border-radius: 25px;
  border: 1px solid #e7162b;
  color: #e7162b;
}
</style>
