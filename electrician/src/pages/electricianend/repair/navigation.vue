<template>
    <div class="contianer">
        <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/back.png" alt=""></p>
        </div>
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
          <p>导航去维修</p>
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
      center: ['117.45989', '39.178392'],
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
                vm.center = [result.position.lng, result.position.lat]
              })
            }
          }
        }]
    }
  },
  mounted () {
    this.getLocation()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    goaddress () {
      document.querySelector('#xianchang').style.background = '#cccccc'
      this.$router.push('/prospecting')
    },
    getLocation () {
      // let _that = this
      let geolocation = location.initMap('map-container') // 定位
      AMap.event.addListener(geolocation, 'complete', result => {
        console.log(result)
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
padding-bottom: 20px;
box-sizing: border-box;
}
.contianer .backgroundbox{
    padding: 0;
    margin: 0;
    position: absolute;
    top: 10px;
    left: 20px;
}
.amap-wrapper{
  height:575px;
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
