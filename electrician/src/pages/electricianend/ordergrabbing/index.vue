<template>
<div class="contianer">
    <div class="backgroundbox">
        <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
        <p>待抢订单</p>
    </div>
    <div class="contentbox">
        <div class="content" v-for="(item,index) in data" :key="index">
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
                        <button class="jiedan" @click="godetail">抢单</button>
                    </dd>
                </dl>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
  data () {
    return {
      num: 0,
      data: [
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下', address: '10kv 抢修 < 5km'}
      ]
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    godetail () {
      alert('抢单成功')
      this.$router.push('/appointment')
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
}
.contianer .backgroundbox{
    width: 100%;
    height: 150px;
    background-color: #87cefa;
    border-bottom-right-radius: 20%;
    border-bottom-left-radius: 20%;
display: flex;
padding-top: 45px;
    box-sizing: border-box;
}
.contianer .backgroundbox p{
    padding: 0;
    margin: 0;
    color: #ffffff;
}
.contianer .backgroundbox p:nth-child(1){
font-size: 25px;
padding-left: 20px;
}
.contianer .backgroundbox p:nth-child(2){
flex: 1;
text-align: center;
font-size: 20px;
font-weight: bold;
/* margin-left: -30px; */
}
.contentbox{
    position: absolute;
    top: 85px;
    left: 0;
    width: 100%;
    height: 640px;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;

}
.contentbox::-webkit-scrollbar{
    width: 0;
}
.contentbox .content{
    width: 100%;
    height: auto;
    border-radius: 16px;
    background: #ffffff;
    padding: 15px 20px;
box-sizing: border-box;
    margin-top: 10px;

}
.contentbox .content .typebox{
display: flex;
font-size: 14px;
border-bottom: 1px solid #f2f2f2;
}
.contentbox .content .typebox p:nth-child(2){
    flex: 1;
}
.contentbox .content .typebox p:nth-child(1) span:nth-child(1){
    width: 30px;
    height: 15px;
    display: inline-block;
    background: url(../../../assets/images/label.png) no-repeat;
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    background-size: 100% 100%;
}
.contentbox .content .typebox p:nth-child(1) span:nth-child(2){
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    margin-left: 7px;
}
.contentbox .content .typebox p:nth-child(3){
    line-height: 22px;
    color: #aeaeae;
}
.contentbox .content .addressbox{
width: 100%;
height: auto;
}
.contentbox .content .addressbox dl{
width: 100%;
height: auto;
display: flex;
margin: 0;
}
.contentbox .content .addressbox dt{
width: auto;
font-size: 14px;
}
.contentbox .content .addressbox dt p{
margin: 0;
padding: 0;
margin-top: 5px;
}
.contentbox .content .addressbox dd{
flex: 1;
padding: 0;
margin: 0;
text-align: center;
padding-left: 10px;
box-sizing: border-box;
}
.contentbox .content .addressbox dd button{
width: 53px;
height: 25px;
border-radius: 20px;
outline: none;
border: 0;
background: #ffffff;
border: 1px solid #aeaeae;
margin-top: 30px;
box-sizing: border-box;
}
.contentbox .content .addressbox dd .jiedan{
border-color: #52aae1;
color: #52aae1;
}

@media (max-width: 375px) {
  .contentbox{
    width: 100%;
    height: 710px;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
}
}
@media (max-height: 667px) {
  .contentbox{
    width: 100%;
    height: 570px;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
}
}
</style>>
