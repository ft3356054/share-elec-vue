<template>
  <div class="contianer">
      <header>
        <div class="topserch">
          <p @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
          <p><input type="text" placeholder="搜索我的订单" v-model="search"></p>
        </div>
        <div class="tabbox">
          <ul>
            <li @click="num=0" :class="{active:num==0}">全部订单</li>
            <li @click="num=1" :class="{active:num==1}">进行中订单</li>
            <li @click="num=2" :class="{active:num==2}">已完成订单</li>
          </ul>
        </div>
      </header>
      <section>
         <div class="contentbox">
        <div class="content"  v-for="(item,index) in datas"  v-show="num==0" :key="'content'+index" @click="godetail(item)">
            <div class="typebox">
                <p><span>类别</span><span>{{item.types}}</span></p>
                <p></p>
                <p>{{item.times}}</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{item.name}}</p>
                        <p>{{item.progess}}</p>
                        <p>{{item.address}}</p>
                    </dt>
                    <dd>
                        <button>取消</button> <button class="jiedan">接单</button>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="content"  v-for="(item1,index) in cancelledList" :key="index" v-show="num==1">
            <div class="typebox">
                <p><span>类别</span><span>泵房线路安装</span></p>
                <p></p>
                <p>2020/11/09 13:49</p>
            </div>
            <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{item1.name}}</p>
                        <p>{{item1.progess}}</p>
                        <p>{{item1.address}}</p>
                    </dt>
                    <dd>
                        <!-- <button>取消</button> <button class="jiedan">接单</button> -->
                    </dd>
                </dl>
            </div>
        </div>
         <div class="content context"  v-for="(item2,index) in completedList" :key="'context'+index" @click="gocomlete" v-show="num==2">
            <div class="typebox">
                <p><span>类别</span><span>泵房线路安装</span></p>
                <p></p>
                <p>2020/11/09 13:49</p>
            </div>
             <div class="addressbox">
                <dl>
                    <dt>
                        <p>{{item2.name}}</p>
                        <p>{{item2.progess}}</p>
                        <p>{{item2.address}}</p>
                    </dt>
                    <dd>
                        <!-- <button>取消</button> <button class="jiedan">接单</button> -->
                    </dd>
                </dl>
            </div>
        </div>
    </div>
      </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: ['全部订单', '进行中订单', '已完成订单'],
      num: 0,
      cancelledList: [
        {types: '泵房坏掉', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区7进行中', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区7进行中', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'}
      ],
      completedList: [
        {types: '泵房坏掉', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区1已完成', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区2已完成', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'}
      ],
      datas: [
        {types: '泵房坏掉', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区3已取消', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km', status: '3'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区4已取消', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km', status: '3'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区5待评价', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区6待评价', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区7进行中', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区8进行中', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区9', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区0', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '泵房坏掉', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区1已完成', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km', status: '1'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区2已完成', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km', status: '1'}
      ],
      search: ''
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    gocomlete (item) {
      console.log(item)
      this.$router.push('/statusfile/completed')
      // this.$router.push('/statusfile/cancelled')
    },
    nums (index) {
      this.num = index
    },
    godetail (item) {
      // eslint-disable-next-line eqeqeq
      if (item.status == 3) {
        this.$router.push('/statusfile/cancelled')
      // eslint-disable-next-line eqeqeq
      } else if (item.status == 1) {
        this.$router.push('/statusfile/completed')
      } else {

      }
    }
  },
  computed: {
    // searchData: function () {
    //   var serch = this.search
    //   if (serch) {
    //     return this.datas.filter(function (product) {
    //       return Object.keys(product).some(function (key) {
    //         return String(product[key]).toLowerCase().indexOf(serch) > -1
    //       })
    //     })
    //   }
    //   return this.datas
    // }
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
padding-top: 15px;
box-sizing: border-box;
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
section .contentbox .content .addressbox dd{
text-align: right;
padding-left: 10px;
box-sizing: border-box;
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
