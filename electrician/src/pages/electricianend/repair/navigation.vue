<template>
    <div class="contianer">
         <header>
          <div class="topserch">
            <p @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
            <p>导航去维修</p>
          </div>
      </header>
        <div class="content">
            <div class="topaddress">
               <div class="amap-wrapper">
                   <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center" :plugin="plugin">
                       <el-amap-marker vid="marker" :position="center" ></el-amap-marker>
                       <el-amap-circle
                            vid="circle"
                            :center="center"
                            :radius="radius"
                            fill-opacity="0.2"
                            strokeColor="#38f"
                            strokeOpacity="0.8"
                            strokeWeight="1"
                            fillColor="#38f"
                            >
                            </el-amap-circle>
                   </el-amap>
                </div>
            </div>
        </div>
        <div class="btnbox">
          <button @click="goaddress" id="xianchang">到达现场</button>
        </div>
    </div>
</template>
<script>
import { location } from '../../../apiconfig/location'
import AMap from 'vue-amap'
export default {
  data () {
    let vm = this
    return {
      zoom: 16,
      center: ['39.17','117.15'],
      lng: '',
      lat: '',
      radius: 100,
      plugin: [
        {
          pName: 'ToolBar',
          // 工具条插件
          position: 'LB'
        },
        {
          pName: 'MapType',
          // 卫星与地图切换
          defaultType: 0,
          showTraffic: true
          // 实时交通图层
        },
        {
          pName: 'OverView'
          // isOpen:true//鹰眼是否打开
        },
        {
          pName: 'Scale'
        },
        {
          pName: 'Geolocation',
          // 定位插件
          showMarker: true,
          events: {
            init (o) {
              // 定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                console.log(result)
                // vm.center = [result.position.lng, result.position.lat]
              })
            }
          }
        }],
        orderId:"",
        electricianId:""
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.orderId=this.$route.params.orderId
    this.electricianId=this.$route.params.electricianId,
    this.getdetail(),
    this.getLocation()
  },
  methods: {
    goback () {
      this.$router.push('electricianend')
    },
    getdetail(){
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            this.center.splice(0,1,response.data.resultValue.items[0].addressLatitude)
            this.center.splice(1,2,response.data.resultValue.items[0].addressLongitude)
        });
    },
    goaddress () {
      document.querySelector('#xianchang').style.background = '#cccccc'
        var fd=new FormData()
        var params={}
        params=fd
      params.append("items",`{
                "orderId":"${this.orderId}",
                "orderElectricianStatus":"22",
                "method":"22",
                "orderStatus":"22",
                "electricianId":"${this.electricianId}"
                }`)
      this.$axios.post("/orderElectrician/booking", params).then(res => {
          this.$router.push({name:'Prospecting',params:{orderId:this.orderId,electricianId:this.electricianId}})
        }).catch(err => {
            alert(err)
        })
    },
    getLocation () {
       
      let _that = this
      let geolocation = location.initMap('map-container') // 定位
      console.log(geolocation)
      // AMap.event.addListener(geolocation, 'complete', result => {
      //   console.log(result)
      // })
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
}
header{
width: 100%;
height: 50px;
}
.topserch{
width: 100%;
height: 100%;
background: #87cefa;
display: flex;
box-sizing: border-box;
line-height: 50px;
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
.amap-wrapper{
  height:400px;
}
.btnbox{
  text-align: center;
  margin-top: 20px;
}
.btnbox p{
margin: 0;
padding: 0;
font-size: 18px;
color: #505050;
font-weight: bold;
}
.btnbox button{
  width: 140px;
  height: 40px;
  border: 0;
  outline: none;
  background: #7bc8f8;
  border-radius: 20px;
  color: #ffffff;
  margin-top: 20px;
}
</style>
