<template>
  <div class="contianer">
      <header>
        <div class="topserch">
          <p @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
          <p><input type="text" placeholder="搜索我的订单" v-model="search"></p>
        </div>
        <div class="tabbox">
          <ul>
            <li v-for="(item,index) in tabs" :key="index" :class="{active:num==index}" @click="nums(index)">{{item}}</li>
          </ul>
        </div>
      </header>
      <section>
         <div class="contentbox">
        <div class="content"  v-for="(item,index) in searchData"  v-show="num==0" :key="'content'+index" @click="godetail(item)">
             <div class="typebox">
                <p><span>类别</span><span>{{item.orderTypeId}}</span></p>
                <p></p>
                <p>{{item.createTime}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{item.customerAddress}}</p>
                        <p>{{item.customerDescrive}}</p>
                        <p>{{item.voltage}} 抢修 {{item.distance}}</p>
                    </dt>
                    <dd>
                        <p v-show="item.orderElectricianStatus==='3'" style="color:red">人员增加</p>
                        <p v-show="item.orderElectricianStatus==='5'" style="color:red">已取消</p>
                        <p v-show="item.orderElectricianStatus==='9'" style="color:red">已完成</p>
                        <p v-show="item.orderElectricianStatus==='8'" style="color:red">待评价</p>
                        <p v-show="item.orderElectricianStatus==='0'" style="color:red">待预约</p>
                        <p v-show="item.orderElectricianStatus==='21'" style="color:red">待维修</p>
                        <p v-show="item.orderElectricianStatus==='22'" style="color:red">待现场勘察</p>
                        <p v-show="item.orderElectricianStatus==='23'" style="color:red">待支付维修费</p>
                        <p v-show="item.orderElectricianStatus==='24'" style="color:red">施工完成</p>
                        <p v-show="item.orderElectricianStatus==='25'" style="color:red">待验收</p>
                        <p v-show="item.orderElectricianStatus==='26'" style="color:red">待填写维修费</p>
                        <p v-show="item.orderElectricianStatus==='31'" style="color:red">施工中</p>
                        <p v-show="item.orderElectricianStatus==='1'" style="line-height:0"><button @click="quxiao(item)">取消</button> <button class="jiedan" @click="jiedan(item)">接单</button></p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content"  v-for="(item1,index) in doingData" :key="index" v-show="num==1" @click="godetail1(item1)">
            <div class="typebox">
                <p><span>类别</span><span>{{item1.orderTypeId}}</span></p>
                <p></p>
                <p>{{item1.createTime}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{item1.customerAddress}}</p>
                        <p>{{item1.customerDescrive}}</p>
                        <p>{{item1.voltage}} 抢修 {{item1.distance}}</p>
                    </dt>
                    <dd>
                        <p v-show="item1.orderElectricianStatus==='3'" style="color:red">人员增加</p>
                        <p v-show="item1.orderElectricianStatus==='5'" style="color:red">已取消</p>
                        <p v-show="item1.orderElectricianStatus==='9'" style="color:red">已完成</p>
                        <p v-show="item1.orderElectricianStatus==='8'" style="color:red">待评价</p>
                        <p v-show="item1.orderElectricianStatus==='0'" style="color:red">待预约</p>
                        <p v-show="item1.orderElectricianStatus==='21'" style="color:red">待维修</p>
                        <p v-show="item1.orderElectricianStatus==='22'" style="color:red">待现场勘察</p>
                        <p v-show="item1.orderElectricianStatus==='23'" style="color:red">待支付维修费</p>
                        <p v-show="item1.orderElectricianStatus==='24'" style="color:red">施工完成</p>
                        <p v-show="item1.orderElectricianStatus==='25'" style="color:red">待验收</p>
                        <p v-show="item1.orderElectricianStatus==='26'" style="color:red">待填写维修费</p>
                        <p v-show="item1.orderElectricianStatus==='31'" style="color:red">施工中</p>
                        <p v-show="item1.orderElectricianStatus==='1'" style="line-height:0"><button @click="quxiao(item1)">取消</button> <button class="jiedan" @click="jiedan(item)">接单</button></p>
                    </dd>
                </dl>
            </div>
        </div>
         <div class="content context"  v-for="(item2,index) in calledData" :key="'context'+index" @click="gocomlete(item2)" v-show="num==2">
            <div class="typebox">
                <p><span>类别</span><span>{{item2.orderTypeId}}</span></p>
                <p></p>
                <p>{{item2.createTime}}</p>
            </div>
             <div class="addressbox">
                <dl>
                    <dt>
                          <p>{{item2.customerAddress}}</p>
                        <p>{{item2.customerDescrive}}</p>
                        <p>{{item2.voltage}} 抢修 {{item2.distance}}</p>
                    </dt>
                    <dd>
                        <p style="color:orange">已完成</p>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
      </section>
  </div>
</template>

<script>
import qs from "qs"
import { Toast,Dialog} from 'vant'
export default {
  data () {
    return {
      tabs: ['全部订单', '进行中订单', '已完成订单'],
      num: 0,
      cancelledList: [],
      completedList: [],
      datas: [],
      search: '',
      electricianId:"321"
    }
  },
  mounted(){
    this.getAll(),
    this.getcancel()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    gocomlete (item) {
      console.log(item)
      // this.$router.push('/statusfile/completed')
      this.$router.push({name:'Completed',params:{orderId:item.orderId,electricianId:this.electricianId}})
    },
    getAll(){
        this.$axios.get(`/orderElectrician/?params={"pageIndex":1,"pageSize":20,"filter":"electricianId=${this.electricianId}","sorter":"DESC=createTime"}`).then(res => {
            console.log(res)
            this.datas=res.data.resultValue.items
        }).catch(err => {
            alert(err)
        })
    },
    getcancel(){
      this.$axios.get("/orderElectrician/queryAllHaveEsc/"+this.electricianId) .then(res => {
          console.log(res);
        });
    },
    nums(index) {
      this.num = index
      if(this.num===0){
        this.$axios.get(`/orderElectrician/?params={"pageIndex":1,"pageSize":20,"filter":"electricianId=${this.electricianId}","sorter":"DESC=createTime"}`).then(res => {
            console.log(res)
        }).catch(err => {
            alert(err)
        })
      }else if(this.num===1){
        console.log("进行中订单")
        this.$axios.get("/orderElectrician/queryAllDoing/"+this.electricianId) .then(res => {
          console.log(res);
          this.cancelledList=res.data.resultValue.items
        });
      }else{
         this.$axios.get(`/orderElectrician/queryAllHaveDone/${this.electricianId}?pageIndex=1&pageSize=10`) .then(res => {
          console.log(res);
          this.completedList=res.data.resultValue.items
        });
        console.log("已完成订单")
      }
    },
     godetail(item){
         if(item.orderElectricianStatus==="8"){
            this.$router.push({name:'Evaluate',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="9"){
            this.$router.push({name:'Completed',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="0"){
            this.$router.push({name:'Appointment',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="21"){
            this.$router.push({name:'Repair',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="22"){
            this.$router.push({name:'Prospecting',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="23"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="24"){
            this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="25"){
            //  如果电工上传完待验收 改为只读状态
            // this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
            Toast.fail("待用户验收完成")
         }else if(item.orderElectricianStatus==="26"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="31"){
            this.$router.push({name:'Completion',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="3"){
            this.$router.push({name:'Personneladd',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="5"){
            this.$router.push({name:'Cancelled',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }
     },
     godetail1(item){
         if(item.orderElectricianStatus==="8"){
            this.$router.push({name:'Evaluate',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="0"){
            this.$router.push({name:'Appointment',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="21"){
            this.$router.push({name:'Repair',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="22"){
            this.$router.push({name:'Prospecting',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="23"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="24"){
            this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="25"){
            //  如果电工上传完待验收 改为只读状态
            // this.$router.push({name:'Servicereport',params:{orderId:item.orderId,electricianId:this.electricianId}})
            Toast.fail("待用户验收完成")
         }else if(item.orderElectricianStatus==="26"){
            this.$router.push({name:'Uploadcontract',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="31"){
            this.$router.push({name:'Completion',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }else if(item.orderElectricianStatus==="3"){
            this.$router.push({name:'Personneladd',params:{orderId:item.orderId,electricianId:this.electricianId}})
         }
     },
  },
  computed: {
    // 全部订单
    searchData: function () {
      var serch = this.search
      if (serch) {
        return this.datas.filter(function (product) {
          return Object.keys(product).some(function (key) {
            return String(product[key]).toLowerCase().indexOf(serch) > -1
          })
        })
      }
      return this.datas
    },
    // 进行中订单
     doingData: function () {
      var serch = this.search
      if (serch) {
        return this.cancelledList.filter(function (product) {
          return Object.keys(product).some(function (key) {
            return String(product[key]).toLowerCase().indexOf(serch) > -1
          })
        })
      }
      return this.cancelledList
    },
    // 已完成
     calledData: function () {
      var serch = this.search
      if (serch) {
        return this.completedList.filter(function (product) {
          return Object.keys(product).some(function (key) {
            return String(product[key]).toLowerCase().indexOf(serch) > -1
          })
        })
      }
      return this.completedList
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
height: 120px;
}
.topserch{
width: 100%;
height: 80px;
background: #87cefa;
display: flex;
}
.topserch p{
margin: 0;
padding: 0;
}
.topserch p:nth-child(1){
line-height: 80px;
padding-left: 15px;
}
.topserch p:nth-child(2){
flex: 1;
padding: 22px 20px 0 20px;
box-sizing: border-box;
}
.topserch p:nth-child(2) input{
  width: 100%;
  height: 32px;
  border-radius: 20px;
  border: 0;
  outline: none;
  font-size: 11px;
  padding-left: 20px;
  box-sizing: border-box;
}
.tabbox{
  width: 100%;
  height: 40px;
  background: #ffffff;
}
.tabbox ul{
width: 100%;
height: 100%;
display: flex;
}
.tabbox ul li{
list-style: none;
flex: 1;
margin: 0 20px;
line-height: 40px;
text-align: center;
font-size: 11px;
}
.active{
    color: #54abe1;
    border-bottom: 2px solid #2293d8;
box-sizing: border-box;
font-size: 13px;
}
section{
    flex: 1;
    overflow: auto;
}
section::-webkit-scrollbar{
  width: 0;
}
section .contentbox{
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
}
section .contentbox .content{
    width: 100%;
    height: auto;
    border-radius: 16px;
    background: #ffffff;
    padding: 15px 20px;
    box-sizing: border-box;
    margin-top: 10px;

}
section .contentbox .content .typebox{
display: flex;
border-bottom: 1px solid #f2f2f2;
box-sizing: border-box;
}
section .contentbox .content .typebox p:nth-child(2){
    flex: 1;
}
section .contentbox .content .typebox p:nth-child(1) span:nth-child(1){
    width: 30px;
    height: 15px;
    display: inline-block;
    background: url(../../../assets/images/label.png) no-repeat;
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    background-size: 100% 100%;
}
section .contentbox .content .typebox p:nth-child(1) span:nth-child(2){
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    margin-left: 7px;
}
section .contentbox .content .typebox p:nth-child(3){
    line-height: 22px;
    color: #aeaeae;
    font-size: 10px;
}
section .contentbox .content .addressbox{
width: 100%;
height: auto;
}
section .contentbox .content .addressbox dl{
width: 100%;
height: auto;
display: flex;
margin: 0;
}
section .contentbox .content .addressbox dt{
  flex: 1;
font-size: 11px;
}
section .contentbox .content .addressbox dt p{
margin: 0;
padding: 0;
margin-top: 5px;
}
section .contentbox .content .addressbox dt p:nth-child(2){
width: 150px;
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
line-clamp: 2;
-webkit-box-orient: vertical;
}
section .contentbox .content .addressbox dd{
text-align: right;
padding-left: 10px;
box-sizing: border-box;
line-height: 70px;
font-size: 12px;
}
section .contentbox .content .addressbox dd button{
width: 50px;
height: 20px;
border-radius: 20px;
outline: none;
border: 0;
background: #ffffff;
border: 1px solid #aeaeae;
margin-top: 30px;
box-sizing: border-box;
color: #666666;
font-size: 10px;
}
section .contentbox .content .addressbox dd .jiedan{
border-color: #52aae1;
color: #52aae1;
}
</style>
