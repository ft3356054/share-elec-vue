<template>
    <div class="contianer">
        <header>
             <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
            <p>消息列表</p>
        </header>
        <section>
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
                    </dt>
                    <dd>
                        <button class="jiedan">接单 ></button>
                    </dd>
                </dl>
            </div>
        </div>
        </section>
    </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'},
        {types: '插座跳闸', times: '2020/11/09 13:49', name: '天津市东丽区国网客服中心北方园区', progess: '插座跳闸，需要检修下'}
      ]
    }
  },
  mounted () {

  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
display: flex;
flex-direction: column;
padding-bottom: 20px;
box-sizing: border-box;
}
header{
    width: 100%;
    height: 90px;
    background: #87cefa;
    display: flex;
    line-height: 90px;

}
header p{
    margin: 0;
    padding: 0;
}
header p:nth-child(2){
    flex: 1;
    text-align: center;
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
}
header p:nth-child(1){
    padding-left: 10px;
box-sizing: border-box;
}
section{
    flex: 1;
    overflow: auto;
    padding: 0 10px;
    box-sizing: border-box;
}
section::-webkit-scrollbar{
    width: 0;
}
.content{
    width: 100%;
    height: 110px;
    background: #ffffff;
    border-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
}
.content p,dl,dd{
margin: 0;
padding: 0;
}
.typebox{
    display: flex;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    box-sizing: border-box;
}
.typebox p:nth-child(2){
    flex: 1;
}
.typebox p:nth-child(1) span:nth-child(1){
    width: 30px;
    height: 15px;
    display: inline-block;
    background: url(../../../assets/images/label.png) no-repeat;
    color: #ffffff;
    font-size: 10px;
    text-align: center;
    background-size: 100% 100%;
}
.typebox p:nth-child(1) span:nth-child(2){
font-size: 15px;
font-weight: bold;
margin-left: 8px;
}
.typebox p:nth-child(3){
font-size: 8px;
color: #b2b2b2;
}
.addressbox{
    width: 100%;
    height: auto;
}
.addressbox dl{
    width: 100%;
    height: auto;
    display: flex;
}
.addressbox dl dt{
font-size: 12px;
padding-top: 14px;
box-sizing: border-box;
}
.addressbox dl dd{
    flex: 1;
    text-align: right;
    padding-top: 15px;
}
.addressbox dl dd button{
    border: 0;
    outline: none;
    background: #ffffff;
    color: #4aa4dd;
}
</style>
