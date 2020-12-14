<template>
  <div class="warp">
    <div class="head">
      <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>需求发起</p>
    </div>
    <div class="bottom">
  <div class="btt">
      <button>提交</button>
      <!-- <input type="button" value="提交"> -->
      </div>
    </div>
    <div class="top">
       <ul class="ipt">
           <li><span>*</span><b>标题</b> <input type="text"></li>
           <li><span>*</span><b>内容说明</b> <textarea v-model="message" placeholder="请输入故障问题"></textarea></li>
           <li><span>*</span><b>需求类型</b>  <select v-model="selected">
                                                <option disabled value="">请选择</option>
                                                <option>故障抢修</option>
                                                <option>巡检</option>
                                                <option>试验</option>
                                                <option>检修</option>
                                                <option>保电</option>
                                                <option>其他</option>
                                              </select></li>
           <li><span>*</span><b>电压</b> <input type="text"></li>
           <li><span v-html="err"></span><b>用电户号</b> <input type="text"></li>
           <li><span>*</span><b>选择身份</b><select v-model="sele">
                                                <option disabled value="">请选择</option>
                                                <option>居民</option>
                                                <option>企业单位</option>
                                              </select></li>
           <li class="liimg"><span>*</span><b>地址</b> <input type="text" style="padding-right: 7%;"> <img src="@/assets/images/position.png" alt=""></li>
           <li><span v-html="err"></span><b>预约时间</b> <input type="text"></li>
           <li><span>*</span><b>联系人</b> <input type="text"></li>
           <li><span>*</span><b>联系电话</b> <input type="text"></li>
           <li><span v-html="err"></span><b>上传照片</b>  
                  <div class="ploader">
                    <van-uploader  v-model="fileList"  multiple>
                      <van-button type="primary" class="loader" >
                        <dl>
                          <dt><img src="@/assets/images/addpeople.png" alt="" /></dt>
                          <dd>添加照片</dd>
                        </dl>
                      </van-button>
                    </van-uploader>
      </div></li>
       </ul>
 
    </div>
     
  </div>
</template>

<script>
export default {
  components: {

  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
      err:"&#160",
      message:"",
      selected:"",
      sele:"",
      fileList:[]
    };
  },
};
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: #f3f8fe;
}
.head{
  width: 100%;
    height: 140px;
    background: #87CEFA;
    text-align: center;
    border-radius:0 0 20% 20%;
    p{
        position: relative;
        display: block;
        font-size: 20px;
        color: #fff;
        padding: 10px 10px;
        span{
            position: absolute;
            top:30%;
            left: 5%;
            img{
                width: 80%;
                height: 100%;
            }
        }
    }
}
.bottom{
  height: 520px;
  background:#f3f8fe;
  position: relative;
}
.top {
  position: absolute;
  width: 94%;
  // height: 650px;
  background: #fff;
  top: 10%;
  left: 3%;
  margin: 0 auto;
  padding: 15px 15px;
  border-radius: 8px;
  box-shadow: 0 -6px 3px #b4e0fc;
  // box-shadow: 0 -10px  1px #93D3fb;
  .ipt{
    span{
      color: red;
      margin-right: 5px;
    }
    li{
      height:30px ;
      line-height:20px;
      margin-bottom:12px;
      b{
        font-size: 12px;
      }
      input{
        width: 70%;
        float: right;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #ebebeb;
        color: #000;
              font-size: 12px;
      }
      textarea{
        // margin-top: 1px;
        float: right;
        width: 185px;
        height: 40px;
        line-height: 15px;
        border: none;
        border-bottom: 1px solid #ebebeb;
        font-size: 12px;
      }
      select{
        float: right;
         width: 190px;
        height: 30px;
        border: none;
        border-bottom: 1px solid #ebebeb;
        outline: none;
         -webkit-appearance: none;
      }
    }
    .liimg{
      position: relative;
      img{
        position: absolute;
        right:0px;
        top: 1%;
        width: 7%;
      }
    }
     .ploader {
       float: right;
       width: 190px;
      height: 73px;
      border: 2px dashed #87cefa;
      color: #87cefa;
      position: relative;
      text-align: center;
      overflow: hidden;
    dl {
      width: 70px;
      // opacity: 1;
      position: absolute;
      top: 20%;
      left: 35%;
      dt {
        width: 35px;
        height: 28px;
        img {
          margin-left: 10px;
          width: 100%;
          height: 100%;
        }
      }
      dd {
        color: #87cefa;
        font-weight: bold;
        margin-top: 5px;
        font-size: 12px;
        text-align: left;
      }
    }
   /deep/ .van-uploader__preview-image{
      display: block;
        width: 185px;
        height: 70px;
        overflow: hidden;
    }
    .loader {
     width: 185px;
      height: 70px;
      border: none;
      background: #fff;
    }

  }
  }
}
.btt {
  position: absolute;
  bottom: 2%;
  left: 50%;
  margin-left: -61px;
  display: flex;
    align-items: center;
    justify-content: center;
  button {
    // margin: 50px 60px;
    width: 132px;
    height: 38px;
    background: #66bdf3;
    border-radius: 20px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;
  }
}
</style>
