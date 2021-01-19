<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="@/assets/images/jiantou.png" alt=""></p>
        <p>上传合同</p>
    </div>
    <div class="contentbox">
        <div class="content">
            <div v-for="(item,index) in data" :key="index">
                <p class="titles"><span></span>基本信息</p>
                <p class="pswidth"><span>订单编号</span><span>{{item.orderId}}</span> </p>
                <p class="pswidth"><span>订单来源</span><span>{{item.orderFrom}}</span> </p>
                <p class="pswidth"><span>标题</span><span>{{item.customerDescriveTitle}}</span> </p>
                <p class="pswidth"><span>联系人</span><span>{{item.customerName}}</span> </p>
                <p class="pswidth del"><span>联系电话</span> <span>{{item.customerPhonenumber}}</span></p>
                <p class="pswidth del"><span>发单时间</span> <span>{{item.createTime}}</span></p>
                <p class="pswidth"><span>上门费</span><span id="money">{{item.customerPrice}}</span></p>
                <p class="pswidth"><span>状态</span><span v-if="item.orderStatus==='23'">待支付</span><span v-if="item.orderStatus==='26'">待填写维修费</span></p>
                <p class="pswidth"><span>勘察情况</span> <span>{{item.electricianDescrive}}</span> </p>
            </div>

        </div>
        <div class="yuyuetime">
            <div class="prices">
                <span>*</span>
                <span>维修价格</span>
                <span v-if="status==='26'"><input type="text" v-model="price" placeholder="请输入服务内容报价"></span>
                <span v-if="status==='23'">{{electricianPrice}}</span>
            </div>
            <div class="uploudimg">
                <span>*</span>
                <span>上传合同</span>
                <span>
                    <p v-if="status==='23'">
                        <img :src="imgst" alt="" style="width: 100%;height: 4rem;display:block;" >
                    </p>
                    <p v-if="status==='26'">
                        <van-uploader v-model="fileLists" :after-read="onRead" :max-count="1">
                            <dl>
                                <dt style="margin-top:0">
                                <img :src="imgs" alt="" style="width:34px;height:24px;margin-top: -10px;">
                                </dt>
                                <dd>上传图片</dd>
                            </dl>
                       </van-uploader> 
                    </p>
                     
              
                </span>
            </div>
        </div>
    <div class="buttons"><button @click="Order" v-if="status==='26'">提交</button></div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      imgs: require('../../../assets/images/addpeople.png'),
      fileLists: [],
      files:{},
      fd:{},
      price:"",
      orderId:"",
      electricianId:"",
      data:[],
      status:"",
      imgst:"",
      electricianPrice:""
    }
  },
  mounted(){
      this.getlist()
      console.log(this.$route.params)
  },
  methods: {
    getlist(){
        this.orderId=this.$route.params.orderId
        this.electricianId=this.$route.params.electricianId
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            console.log(response.data);
            this.data=response.data.resultValue.items,
            this.status=response.data.resultValue.items[0].orderElectricianStatus
            this.imgst=response.data.resultValue.items[0].orderContract
            this.electricianPrice=response.data.resultValue.items[0].electricianPrice
        });
    },
    goback () {
      this.$router.push('electricianend')
    },
    godel () {
      window.location.href = `tel:15541544454`
    },
    onRead (file) {
      this.files=file.file  // postData是一个数组
    },
     Order () {
         if(this.price===""){
             this.$dialog.alert({
                width:"80%",
                message: "请输入维修价格",
                confirmButtonText: "确定",
                confirmButtonColor:"#87cefa"
            })
            console.log(this.fileLists)
         }else if(this.fileLists.length===0){
             this.$dialog.alert({
                width:"80%",
                message: "请上传照片",
                confirmButtonText: "确定",
                confirmButtonColor:"#87cefa"
            })
         }else{
               var fd=new FormData()
                if(this.files===null|| this.files===""){
                    fd.append("myFile","")
                console.log(fd)
                }else{
                    fd.append("myFile",this.files)
                    console.log(fd.get("myFile"))
                }
                this.fd=fd
                this.fd.append("items",`{"orderId":"${this.orderId}","orderElectricianStatus":"23","method":"上传合同","orderStatus":"23","electricianId":"${this.electricianId}","electricianPrice":"${this.price}"}`)
                this.$axios.post("/orderElectrician/booking", this.fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
                //   this.$router.push({name:'Personneladd',params:{orderId:this.orderId,electricianId:this.electricianId}})
                this.$router.push('/electricianend')
                    }).catch(err => {
                        alert(err)
                    })
         }
        

    },
  }
}
</script>

<style lang="scss" scoped>
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
position: relative;
box-sizing: border-box;
overflow: auto;
}

.contianer .backgroundbox{
    width: 100%;
    height: 135px;
    background-color: #87cefa;
    border-bottom-right-radius: 20%;
    border-bottom-left-radius: 20%;
display: flex;
padding-top: 10px;
    box-sizing: border-box;
}
.contianer .backgroundbox p{
    padding: 0;
    margin: 0;
    color: #ffffff;
}
.contianer .backgroundbox p:nth-child(1){
font-size: 15px;
padding-left: 20px;
}
.contianer .backgroundbox p:nth-child(2){
flex: 1;
text-align: center;
font-size: 15px;
font-weight: bold;
}
.contentbox{
    position: absolute;
    top: 35px;
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
margin-top: 15px;
}
.contentbox .content div .titles{
font-size: 13px;
font-weight: bold;
}
.contentbox .content div .titles span{
display: inline-block;
width: 2px;
height: 10px;
background-color: #f65b6a;
margin-right: 10px;
}
.contentbox .content div .pswidth{
display: flex;
margin-top: 5px;
line-height: 20px;
}
.contentbox .content div .pswidth span:nth-child(1){
width: 55px;
font-size: 12px;
margin-right: 27px;
margin-left: 14px;
color: #6f6f6f;
}
.contentbox .content div .pswidth span:nth-child(2){
flex: 1;
width: 55px;
font-size: 11px;
margin-right: 27px;
color: #111111;
font-weight: bold;
}

.contentbox .yuyuetime{
    width: 100%;
    height: auto;
    background: #ffffff;
    margin-top: 15px;
    border-radius: 16px;
    line-height: 60px;
    font-size: 13px;
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
   font-size: 12px;
margin-right: 10px;
}
.prices span:nth-child(3){
    flex: 1;
    /* border-bottom: 1px solid #cccccc; */
    box-sizing: border-box;
    margin: 0 20px;
}
.prices span:nth-child(3) input{
 height: 15px;
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
   width: 83px;
   height: auto;
   /* flex: 1; */
   display: inline-block;
   margin-left: 20px;
   overflow: hidden;
}
.uploudimg span:nth-child(3) dl{
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    border: 2px dashed #e1f2fd;
    /* padding-top: 11px; */
    box-sizing: border-box;
}
.uploudimg span:nth-child(3) dl dt{
  /* width: 100%;
  height: 100%; */
      margin-top: 16px;
}
.uploudimg span:nth-child(3) dl dd{
  margin: 0;
    padding: 0;
    margin-top: -40px;
    font-size: 11px;
    color: #68b4e5;
}
/deep/ .van-uploader{
    width: 100%;
    height: 100%;
    display: inline;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader{
position: static;
display: inline;
width: 100%;
height: 100%;
}
/deep/ .van-uploader__input-wrapper{
    width: 100%;
    height: 100%;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader__wrapper{
justify-content: center;
}
/deep/ .van-uploader__preview{
margin: 0;
    width: 100%;
    height: 100%;
}
/deep/  .van-uploader__preview-image{
   width: 100%;
   height: 100%;
}
/deep/ .uploudimg span:nth-child(3) dl dt .van-uploader__preview-delete{
    top: -16px;
}
#money{
    color: #f76f7c;
}
.buttons{
    text-align: center;
    margin-top: 20px;
}
.buttons button{
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
</style>>
