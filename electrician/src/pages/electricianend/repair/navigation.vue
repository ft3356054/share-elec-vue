<template>
    <div class="contianer">
         <header>
          <div class="topserch">
            <p @click="goback"><img src="@/assets/images/jiantou.png" alt=""></p>
            <p>导航去维修</p>
          </div>
      </header>
        <div class="content" id="map"  style="width: 100%; height: 400px;">
            <!-- <div class="topaddress">
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
            </div> -->
        </div>
        <div class="btnbox">
          <button @click="goaddress" id="xianchang">到达现场</button>
        </div>
    </div>
</template>
<script>
import epgis from "../../../apiconfig/epgis.maps"
var map;
export default {
  data () {
    let vm = this
    return {
      zoom: 16,
      center: ['39.15734030335556','117.38959396833259'],
      lng: '',
      lat: '',
      radius: 100,
        orderId:"",
        electricianId:""
    }
  },
  created() {
  
},
  mounted () {

    this.orderId=this.$route.params.orderId
    this.electricianId=this.$route.params.electricianId,
    this.getdetail()
    this.$nextTick(()=>{
          let _this=this
       // 申请的key和sn
       SGMap.tokenTask.login("b8454220b1ed35b9a0c28dfb7383beaf", "4bced7664302366cb297403389660723").then(function(res){
         console.log(res)
         _this.initMap();
       })
    })
  },
  activated() {
    
  },
  methods: {
       initMap() {
          map = new SGMap.Map({
          // 地图绑定的DOM元素ID
          container: "map",
          // 地图样式
          style: "aegis://styles/aegis/Streets",
          // 默认缩放层级
          zoom: 15,
          // 地图中心点
          center: [117.21081309, 39.1439299],
          // 地图默认字体
          localIdeographFontFamily: "Microsoft YoHei",
          transition: {
            duration: 300,
            delay: 0
          },
          renderWorldCopies:false
        });
      //加载插件
          map.addControl(
            new epgis.ScaleControl({
              maxWidth: 80,
              unit: "metric"
            }),
            "bottom-left"
          );
          map.on("click", function (e) {
            console.log(e);
          });
    //添加定位控件
    map.addControl(new SGMap.GeolocateControl(),"bottom-right");  
    },
    goback () {
      this.$router.push('electricianend')
    },
    getdetail(){
        this.$api.get("/orderElectrician/orderDetails/"+this.orderId, {"electricianId":this.electricianId}, response => {
            
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
