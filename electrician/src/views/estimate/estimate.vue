<template>
  <div class="warp">
    <div class="head">
      <p><span @click="fh()"><img src="@/assets/images/bai.png" alt=""></span>服务评价</p>
    </div>
    <div class="top">
      <div class="est">
         <h5>请评价为您服务的电工</h5>
          <baseest @score="getscore"></baseest>
      </div>
      <ul class="top-li">
        <li v-for="(item, index) in data" :key="index"
        :class="{'active': rSelect.indexOf(item)!=-1}"
        @click="topli(item,index)"
        >
          {{ item }}
        </li>
      </ul>
      <textarea  class="ipt" v-model="message"  placeholder="投诉内容描述"></textarea>
        <div class="ploader" style="margin-bottom:20px">
        <van-uploader  v-model="fileList"  multiple :after-read="blues">
          <van-button type="primary" class="loader" >
            <dl>
              <dt><img src="@/assets/images/addpeople.png" alt="" /></dt>
              <dd>添加照片</dd>
            </dl>
          </van-button>
        </van-uploader>
      </div>
       
    </div>
   <div class="btt">
      <button  @click="submit()">提交</button>
      </div>
  </div>
</template>

<script>
import baseest from "../../components/estimate.vue"
export default {
  components: {
  
  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
     // 点击ul
    topli(item,index){
      console.log(index ,item)
       console.log(this.rSelect.indexOf(item));
     if (this.rSelect.indexOf(item) !== -1) {
      this.rSelect.splice(this.rSelect.indexOf(item), 1); //取消
     } else {
      this.rSelect.push(item);//选中添加到数组里
     }
     console.log(this.rSelect);
    },
     // 图片上传
      blues (file) {
      console.log(file)
      console.log(this.fileList)
      // if (this.fileList.length === 0) {
      //   console.log(this.fileList)
      // }
    },
    // 获取评价星数
    getscore(data){
        this.score=data
    },
    // 提交
    submit(){
        console.log(this.message)
        console.log(this.rSelect)
        console.log(this.score)
    }
  },
  data() {
    return {
      value:3,
      fileList: [],
      rSelect:[],
      score:5,
      message:"",
      data: ["服务态度好", "不错", "非常专业", "懂得多", "准备很充分","按时到达"],
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
.top {
  width: 94%;
  // height: 460px;
  background: #fff;
  margin: 0 auto;
  padding: 0 42px;
  border-radius: 8px;
  box-shadow: 0 -6px 3px #b4e0fc;
  margin-top: -80px;
  overflow: hidden;
  .est{
    text-align: center;
    margin-top: 20px;
    h5{
      margin: 0 0;
    }
  }
  .top-li {
    height: 70px;
    margin-top: 20px;
    li {
      padding: 0 12px;
      text-align: center;
      margin-left: 5px;
      margin-top: 12px;
      height: 28px;
      line-height: 28px;
      background: #eaf2fb;
      border-radius: 20px;
      float: left;
      font-size: 8px;
      color: #87cefa;
      font-weight: bold;
    }
    .active {
      margin-left: 5px;
      background: #87cefa;
      color: #fff;
    }
  }
  .ipt {
    width: 100%;
    height: 100px;
    background: #f7fbff;
    border: none;
    margin-top: 15px;
    font-size: 14px;
    color: #87cefa;
    text-indent: 10px;
    padding-top: 5px;
    outline: none;
    overflow: hidden;
  }
  .ipt:empty::before {
    content: attr(placeholder);
  }
   textarea::-webkit-input-placeholder {
          /* WebKit browsers */
          /* placeholder颜色  */
          color: #87cefa;
          /* placeholder字号  */
          // font-size: 0.14rem;
        }
  .ploader {
    margin-top: 15px;
    height: 102px;
    border: 2px dashed #87cefa;
    color: #87cefa;
    position: relative;
    text-align: center;
    overflow: hidden;
    dl {
      width: 70px;
      // opacity: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -25px;
      margin-top: -20px;
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
    /deep/ .van-uploader__preview-image {
      display: block;
      width: 215px;
      height: 102px;
      overflow: hidden;
    }
    .loader {
      width: 210px;
      height: 100px;
      border: none;
      background: #fff;
    }
  }
}
.btt {
  display: flex;
  align-items: center;
  justify-content: center;
   background: #f3f8fe;
  button {
    margin: 20px 0;
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
