<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="@/assets/images/jiantou.png" alt=""></p>
        <p>订单详情</p>
    </div>
    <div class="contentbox">
        <div class="content">
            <div v-for="(item,index) in data" :key="index">
                <p class="titles"><span></span>订单信息</p>
                <p class="pswidth"><span>订单编号</span><span>{{item.orderId}}</span></p>
                <p class="pswidth"><span>标题</span><span>{{item.customerDescriveTitle}}</span></p>
                <p class="pswidth"><span>联系人</span><span>{{item.customerName}}</span></p>
                <p class="pswidth"><span>联系电话</span><span>{{item.customerPhonenumber}}</span></p>
                <p class="pswidth"><span>发单时间</span><span>{{item.createTime}}</span></p>
                <p class="pswidth"><span>状态</span><span v-if="item.orderStatus==='3'">施工中</span></p>
                <p class="pswidth"><span>维修价格</span><span id="money">{{item.electricianPrice}}</span></p>
                <p class="pswidth"><span>勘察情况</span> <span>{{item.electricianDescrive}}</span> </p>
            </div>
             <div>
                <p class="add"><span></span><span>人员增加</span><span @click="addbtn"><img src="@/assets/images/peopleadd.png" alt=""></span></p>
                <div v-if="addlist!=undefined" style="margin-top:0;">
                        <p style="font-size:15px;margin-top:20px;display:flex"  v-for="(item,index) in addlist" :key="index">{{item.electricianName}}{{item.electricianPhonenumber}} <span @click="deletebtn(item)" style="flex:1;text-align:right;color:red">删除</span> </p>
                </div>
            </div>
        </div>
    <div class="buttons"><button @click="Order">开始施工</button></div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      times: '',
      show: false,
      orderId:"",
      electricianId:"",
      data:[],
      addlist:[]
    }
  },
  mounted(){
      var datas=JSON.parse(sessionStorage.getItem('initialize'))
      var datasA=JSON.parse(sessionStorage.getItem('initialize1'))
    //   console.log(datas)
    //   console.log(datasA)
      var newArr=[]
      if(datasA!=null){
          for(var i=0;i<datasA.length;i++){
                // this.addlist.push(datasA[i])
                newArr.push(datasA[i])
          }
      } 
      this.addlist=datas
      this.getlist()
  },
  methods: {
    getlist(){
        this.orderId=this.$route.params.orderId
        this.electricianId=this.$route.params.electricianId
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            this.data=response.data.resultValue.items
        });
    },
    goback () {
     this.$router.push("/electricianend")
    sessionStorage.clear()
    },
    addbtn(){
         this.$router.push({name:'Electricianinquiry',params:{electricianId:this.electricianId,orderID:this.orderId}})
    },
    Order () {
        var addlists=[]
        addlists=this.addlist
        console.log(addlists)
        var electricianId=[]
        if(addlists===null){
            alert(11)
            var fd=new FormData()
                    var params={}
                    params=fd
                    params.append("items",`{
                    "orderId":"${this.orderId}",
                    "method":"开始施工",
                    "electricianId":"${this.electricianId}",
                    "orderElectricianStatus":"31",
                    "orderStatus":"31",
                    "otherElectricianId":"{${electricianId}}",
                    }`)
                this.$axios.post("/orderElectrician/booking", params).then(res => {
                        this.$router.push("/electricianend")
                        sessionStorage.clear()
                    }).catch(err => {
                        alert(err)
                    })
        }else{
            addlists.forEach(element => {
                electricianId.push(element.electricianId)
             });
             var fd=new FormData()
                    var params={}
                    params=fd
                    params.append("items",`{
                    "orderId":"${this.orderId}",
                    "method":"开始施工",
                    "electricianId":"${this.electricianId}",
                    "orderElectricianStatus":"31",
                    "orderStatus":"31",
                    "otherElectricianId":"{${electricianId}}",
                    }`)
                this.$axios.post("/orderElectrician/booking", params).then(res => {
                        this.$router.push("/electricianend")
                        sessionStorage.clear()
                    }).catch(err => {
                        alert(err)
                    })
        }
        
    },
    returnorder () {
      this.$router.push('/returnorder')
    },
    showPopup () {
      this.show = true
    },
    deletebtn(item){
      var datas=JSON.parse(sessionStorage.getItem('initialize'))

        for(let i=0;i<this.addlist.length;i++){
            if(item.electricianId===this.addlist[i].electricianId){
                this.addlist.splice(i,1)
                // sessionStorage.removeItem("initialize")
                sessionStorage.setItem("initialize",JSON.stringify(this.addlist) )
            }
        }
        if(this.addlist.length===0){
            sessionStorage.clear()
        }
    },
    guanbi () {
      this.show = false
    },
    foubtn(){
      this.show = false
    },
    preservation(){
        var fd=new FormData()
        var params={}
        params=fd
      params.append("items",`{
              "orderId":"24",
              "method":"电工人员保存",
              "electricianId":"321",
              "name":"小红",
              "telephone":"18733243626"
            }`)
     
      this.$axios.post("/orderElectrician/booking", params).then(res => {
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
.contentbox .content div .add{
font-size: 13px;
font-weight: bold;
display: flex;
}
.contentbox .content div .add span:nth-child(1){
display: inline-block;
width: 4px;
height: 13px;
background-color: #f65b6a;
margin-right: 10px;
margin-top: 3px;
}
.contentbox .content div:nth-child(2) p,textarea{
margin-left: 0 15px;
}
.contentbox .content div:nth-child(2) p button{
margin: 0;
padding: 0;
border: 0;
outline: none;
background: #ffffff;
font-size: 11px;
}
.contentbox .content div:nth-child(2) p button:nth-child(1){
color: #157ebf;
font-weight: bold;
margin-right: 20px;
}
.contentbox .content div:nth-child(2) p button:nth-child(2){
color: #626262;
font-weight: bold;
}
.contentbox .content div .add span:nth-child(2){
flex: 1;
}
.contentbox .content div .add span:nth-child(3) img{
width: 21px;
height: 21px;
display: block;
}
.contentbox .content div .pswidth{
display: flex;
margin-top: 5px;
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
    display: flex;
    font-size: 15px;
    padding: 10px 15px;
    box-sizing: border-box;
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
#money{
    color: #f76f7c;
}
.van-popup{
    width: 269px;
    height: 180px;
    border-radius: 15px;
    padding: 12px 15px;
    box-sizing: border-box;
}
.van-popup p{
margin: 0;
padding: 0;
}
.van-popup .guanbi{
text-align: right;
}
.van-popup .guanbi img{
    width: 13px;
    height: 13px;
}
.van-popup .title{
    font-size: 15px;
    font-weight: bold;
}
.van-popup .context{
    width: 100%;
    height:100px;
    font-size: 13px;
    font-weight: bold;
    /* margin-top: 20px; */
    overflow: auto;
}
.van-popup .context p{
margin-top: 10px;
}
.van-popup .btnbox{
    width: 100%;
    height: 50px;
    border-top: 1px solid #cccccc;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
}
.van-popup .btnbox button{
    flex: 1;
    border: 0;
    outline: none;
    background: #ffffff;
}
.van-popup .btnbox button:nth-child(1){
border-right: 1px solid #cccccc;
color: #686868;
}
.van-popup .btnbox button:nth-child(2){
color: #3397ea;
}
.buttons{
    text-align: center;
    margin-top: 10px;
}
.buttons button{
width: 137px;
height: 37px;
border: 0;
outline: none;
border-radius: 20px;
background: #6dc0f5;
color: #ffffff;
font-size: 13px;
font-weight: bold;
}


</style>>
