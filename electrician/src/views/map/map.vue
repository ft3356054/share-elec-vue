<template>
    <div id="map" class="mapClass">
    <div class="btn-area">
      <button class="btn" id="LBS-btn">点击定位</button>
    </div>
    <div class="infos"></div>
    
          <div class="input-item">
        <div class="input-item-prepend">
          <span class="input-item-text">经纬度</span>
        </div>
        <input id="lnglat2" type="text" value="116.39,39.9" />
      </div>
      <div class="input-item">
        <div class="input-item-prepend">
          <span class="input-item-text">地址</span>
        </div>
        <input id="address2" type="text" disabled />
      </div>
      <input id="regeo" type="button" class="btn" value="经纬度 -> 地址" />
    </div>
</template>

<script>
    export default {
        data() {
          return {
            
          }
        },
         mounted() {
         
         }
    }

</script>
<script>
          // epgis.tokenTask.login('881a354f1ff8342db83ed72f44deb59b',"b1e93370a1ed36c4b777e48badf2faab").then(function(){
          //   initMap();
          // });

          // function initMap() {
          //   map = new epgis.Map({
          //     // 地图绑定的DOM元素ID
          //     container: "map",
          //     // 地图样式
          //     style: "aegis://styles/aegis/Streets",
          //     // 默认缩放层级
          //     zoom: 11,
          //     // 地图中心点
          //     center: [116.397428, 39.90923],
          //     // 地图默认字体
          //     localIdeographFontFamily: "Microsoft YoHei",
          //     transition: {
          //       duration: 300,
          //       delay: 0
          //     },
          //     renderWorldCopies: false
          //   });

          //   map.addControl(
          //     new epgis.ScaleControl({
          //       maxWidth: 80,
          //       unit: "metric"
          //     }),
          //     "bottom-left"
          //   );

          //   map.on("click", function(e) {
          //     console.log(e);
          //   });

          //   //添加定位控件
          //   map.addControl(new epgis.GeolocateControl(), "bottom-right");
          //   // 添加大小
          //   map.addControl(new epgis.NavigationControl(),'bottom-right');
          // }
</script>
<script>
      var map,
        geo,
        wxConfig,
        isChangeStyle = false;
     

      epgis.tokenTask
       .login("881a354f1ff8342db83ed72f44deb59b", "b1e93370a1ed36c4b777e48badf2faab")
        .then(function () {
          loadPlugin();
        });

      function loadPlugin() {
        epgis.plugin("epgis.GeolocationTask").then(function (res) {
          initMap();
        });
      }

      function initMap() {
        map = new epgis.Map({
          // 地图绑定的DOM元素ID
          container: "map",
          // 地图样式
          style: "aegis://styles/aegis/Streets",
          // style: "aegis://styles/aegis/Streets-Raster512",
          // 默认缩放层级
          zoom: 11,
          // 地图中心点
          center: [116.397428, 39.90923],
          // 地图默认字体
          localIdeographFontFamily: "Microsoft YoHei"
        });
        map.on("load", function () {
          initLayer();
          geo = new epgis.GeolocationTask();
        });
        bindEvent();
      }
      function initLayer() {
        //画面
        !map.getLayer("power-polygon") &&
          map.addLayer({
            id: "power-polygon",
            type: "fill",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              }
            },
            paint: {
              "fill-color": "#4aabf7",
              "fill-opacity": 0.3
            }
          });
        !map.getLayer("circleLineLayer") &&
          map.addLayer({
            id: "circleLineLayer",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              }
            },
            paint: {
              "line-color": "#4aabf7",
              "line-width": 3,
              "line-opacity": 0.8
            }
          });
        !map.getLayer("demo") &&
          map.addLayer({
            id: "demo",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              }
            },
            paint: {
              "circle-radius": 4,
              "circle-color": "#4aabf7"
            }
          });
      }
      function bindEvent() {
        // 手动定位
        document.getElementById("LBS-btn").onclick = LBSactive;
        document.querySelector("#regeo").onclick = regeoCode;
      }

      function LBSactive() {
         var infodom = document.querySelector(".infos");
        // var center = [116.397428, 39.90923];
        // setCircleData(center)
        infodom.innerHTML = "获取定位中";
        geo
          .getLocation()
          .then(function (data) {
            console.log("LBSactive", data[0]);
            setCircleData(data[0]);
            infodom.innerHTML = "定位坐标: " + data[0].join(",");
          })
          .catch(function (e) {
            console.log(e);
            infodom.innerHTML = "定位失败" + e;
          });
      }

      // 画点
      function setCircleData(data, accuracy) {
        accuracy = accuracy || 20;
        map.easeTo({ center: data, zoom: 16 });
        map.getSource("demo").setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: data
              },
              properties: {
                name: "测试点"
              }
            }
          ]
        });
        // 精度圈, accuracy: 单位米
        if (accuracy) {
          var coordinates = _countCircle(accuracy, data, 200);

          map.getSource("circleLineLayer").setData({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: coordinates[0]
                }
              }
            ]
          });
          //重设面数据
          map.getSource("power-polygon").setData({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: coordinates
                }
              }
            ]
          });
        }
      }

      // 切换底图
      function changeStyle() {
        var changeStyleDOM = document.getElementById("change-style");

        isChangeStyle = !isChangeStyle;
        if (!isChangeStyle) {
          map.setStyle("aegis://styles/aegis/Streets");
          changeStyleDOM.innerHTML = "切换为栅格";
        } else {
          map.setStyle("aegis://styles/aegis/Streets-Raster512");
          changeStyleDOM.innerHTML = "切换为矢量";
        }
        map.on("styledata", function () {
          initLayer();
        });
      }

      // ============圆计算============
      // 多边形圆
      function _countCircle(radiusInMeters, centerPoint, steps) {
        var dist = radiusInMeters / 6378137,
          center = [centerPoint[0], centerPoint[1]],
          radCenter = [_numberToRadius(center[1]), _numberToRadius(center[0])],
          steps = steps || 15,
          polygon = [];

        for (var i = 0; i < steps; i++) {
          var brng = (2 * Math.PI * i) / steps;
          var lat = Math.asin(
            Math.sin(radCenter[0]) * Math.cos(dist) +
              Math.cos(radCenter[0]) * Math.sin(dist) * Math.cos(brng)
          );
          var lng =
            radCenter[1] +
            Math.atan2(
              Math.sin(brng) * Math.sin(dist) * Math.cos(radCenter[0]),
              Math.cos(dist) - Math.sin(radCenter[0]) * Math.sin(lat)
            );
          polygon.push([_numberToDegree(lng), _numberToDegree(lat)]);
        }
        polygon.push(polygon[0]);

        return [polygon];
      }

      function _numberToRadius(number) {
        return (number * Math.PI) / 180;
      }

      function _numberToDegree(number) {
        return (number * 180) / Math.PI;
      }
      function regeoCode() {
        var geocodingTask = new epgis.GeocodingTask(),
          lnglatInfo = document.getElementById("lnglat2").value.split(",");

        // 逆地理编码
        geocodingTask
          .getAddress({
            location: lnglatInfo
          })
          .then(function(result) {
            document.getElementById("address2").value = result.formattedAddress;
          });
      }
    </script>
<style lang="scss" scoped>
.mapClass{width:100%;height:100%;margin:0;}
  .btn-area {
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 999;
      }
      .btn {
        font-size: 14px;
        padding: 5px 10px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-bottom: 10px;
      }
      .infos {
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 999;
        background-color: #fff;
        padding: 8px;
        font-size: 12px;
      }
</style>