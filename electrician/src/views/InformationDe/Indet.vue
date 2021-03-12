<template>
  <div class="warp">
     <div class="head">
         <img src="@/assets/images/back.png" alt=""
         @click="fh()"
         >
         <h3>资讯详情</h3>
     </div>
     <main > 
         <div class="main-top">
              {{hname}}
              <p>{{xname}}</p>
         </div>
         <div class="main">
             <p>{{title}}</p>
             <h4>{{biname}}</h4>
             <p>{{title1}}</p>
             <div class="img">
                <img src="@/assets/images/gj.png" alt=""> 
             </div>
             
         </div>
     </main>
  </div>
</template>

<script>
export default {
  data() {
      return {
          "hname":"冬季安全用电知识须知",
             "xname":"系统管理员 | 2020-09-19  17:25",
             "title":"天气转冷，各种电暖设备和空调大量使用。不合理用电、缺乏用电常识，加上天气干燥就会容易引发冬季火灾，冬季用电安全很重要。家居要知悉以下几点冬季用电小常识，做好冬季的用电安全工作。",
             "biname":"使用正规家用电器",
             "title1":"按规程操作家用电器︰应充分了解各种用电设备原理，严格按照说明书上写明的操作规程进行操作。严禁盲目使用;应使用正规设备厂家生产的家用电器;过期、超期设备应及时淘汰，切勿因尚能使用而舍不得丢弃报废，而导致因小失大，酿成事故;应多向家中老人及小孩讲解安全用电常识、防止火灾的方法及自救措施。"        
      }
  },
  methods: {
      fh(){
           this.$router.push("/infrom")
      }
  },
}
</script>

<style lang="scss" scoped>
.warp{
   width: 100%;
   height: 100%;
   margin: 0 auto;
   background: #fff;
}
.head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
    text-align: center;
    img{
        position: absolute;
        left: 15px;
        top:35%;
        width: 15px;
        height: 15px;
    }
}
main{
    margin: 0px 27px;
    .main-top{
        width: 100%;
        height: 62px;
        margin-top: 20px;
        font-size: 22px;
        color: #000;
        font-weight:bold;
        border-bottom: 1px solid #e0e0e0;
        p{
            font-size: 10px;
            color: #999999;
            margin-top: 8px;
        }
    }
    .main{
        p{
            font-size: 13px;
            color: #333333;
            line-height: 24px;
            margin-top: 24px;
        }
        h4{
            margin-top: 30px;
        }
        .img{
            width: 100%;
            height: 80%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        
    }
}

</style>