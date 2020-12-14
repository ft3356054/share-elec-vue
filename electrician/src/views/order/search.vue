<template>
  <div class="warp">
      <div class="head">
          <img src="@/assets/images/back.png" alt="" @click="fh()">
            <van-search
      v-model="value"
      show-action
      shape="round"
      placeholder="输入订单状态/需求类型"
      left-icon=""
      @input="onSearch"
    >
      <template #action>
        <div @click="onSearch" class="search">搜索</div>
      </template>
    </van-search>
      </div>
     <main>
           <div class="box" v-for="(item, index) in list" :key="index">
            <div class="box-top">
              <div class="act">类别</div><p> {{ item.name }}</p>
              <span>{{ item.time }}</span>
            </div>
            <div class="box-bottom">
              <dl>
                <dt>
                  <p>{{item.address}}</p>
                  <p>{{ item.title }}</p>
                  <p>{{ item.Voltage }}{{item.store }} {{item.distance}}</p>
                </dt>
                <dd>
                      {{item.state}}
                </dd>
              </dl>
            </div>
          </div>
     </main>
  </div>
</template>

<script>
export default {
    data() {
        return {
            value:"",
            data:"",
            list: [
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          store: "抢修",
          distance: "<5KM",
          momey:"上门费 1500",
          state:"已完成"
        },
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          store: "抢修",
          distance: "<5KM",
          momey:"上门费 1500",
          state:"已完成"
        },
        {
          leb: "类别",
          name: "泵房线路安装",
          time: "2020/11/09 13:49",
          address: "天津市东丽区能量大厦332号",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          store: "抢修",
          distance: "<5KM",
          state:"待支付"
        },
        {
          leb: "类别",
          name: "插座跳闸",
          time: "2020/11/09 13:49",
          address: "天津市东丽区国网客服中心北方园区",
          title: "插座跳闸，需要检修下",
          Voltage: "10v",
          store: "抢修",
          distance: "<5KM",
          state:"待验收"
        },
      ],
        }
    },
    methods: {
        fh(){
           this.$router.go(-1)
        },
        // 搜索
        onSearch(){
           var value = this.value;
           if(value!==""){
               this.list=this.list.filter((item)=>{
                //    console.log(item)
                   return Object.keys(item).some((key)=>{
                        //   console.log(key)
                          return String(item[key]).toLowerCase().indexOf(value) > -1
                   })
                   
               })
           }else if(value===""){
               this.list=this.list
               console.log("暂无数据")
           }
        }
    },
    computed:{
      
    },
   
};
</script>

<style lang="scss" scoped>
.warp{
    width: 100%;
    height: 100%;
}
.head{
    height: 51px;
    position: relative;
    img{
        position: absolute;
        width: 4%;
        left: 5%;
        top: 35%;
    }
    .search{
        color: #000;
        font-weight: bold;
        width: 40px;
        text-align: center;
        border-radius:8px ;
        font-size: 13px;
    }
    .van-search{
        width: 92%;
        float: right;
    /deep/ .van-field__control{
            padding-left: 5px;
        }
    }
  /deep/  input::-webkit-input-placeholder{
        color: #000;
        font-size: 12px;
    }
}
.box {
  width: 90%;
  margin: 0 auto;
  height: 115px;
  background: #fff;
  padding: 0 20px;
  border-radius: 8px;
  .box-top {
    margin-top: 10px;
    height: 37px;
    border-bottom: 1px solid #e0e0e0;
    padding-top: 10px;
    padding-bottom: 8px;
     .act{
         margin-top: 5px;
         margin-right: 6px;
          width: 25px;
          font-size: 9px;
          color: #fff;
          text-align: center;
          height: 15px;
          line-height: 17px;
          border-radius: 6px 0 6px 0;
          background:#ff364a;
          float: left;
        }
    p {
        margin-top: 2px;
      font-size: 14px;
      color: #000;
      float: left;
    }
    span {
      padding-top: 5px;
      font-size: 10px;
      color: #999999;
      float: right;
    }
  }
  .box-bottom {
  
    dl {
      width: 100%;
      height: 70px;
      margin-right: 8px;
      dt {
        width: 70%;
        float: left;
        font-size: 12px;
        padding-top: 10px;
        color: #333;
        p {
          display: block;
          line-height: 18px;
        }
      }
      dd {
        float: right;
        padding-top: 23px;
        font-size: 12px;
        color: #ff364a;
      }
    }
  }
}
</style>
