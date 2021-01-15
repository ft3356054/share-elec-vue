<template>
    <div class="contianer">
        <div class="backgroundbox">
            <div class="toptitle">
                <p  @click="goback"><img src="../../../assets/images/jiantou.png" alt=""></p>
                <p>电工选择</p>
            </div>
             <div class="topinput">
                <p><input type="text" placeholder="输入电工名字进行搜索" v-model="searchtext"></p>
                <p><button @click="serchbtn">搜索</button></p>
            </div>
        </div>
        <div class="content">
            <p v-for="(item,index) in data" :key="index" @click="gobackbtn(item)">{{item.electricianName}}{{item.electricianPhonenumber}}</p>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      uploader: '',
      imgs: require('../../../assets/images/addpeople.png'),
      searchtext:'',
      data:[],
      electricianId:"",
      orderId:"",
      datas:[]
    }
  },
  mounted () {
    //   this.getelectri()
    this.electricianId=this.$route.params.electricianId
    this.orderId=this.$route.params.orderID
  },
  methods: {
    //   getelectri(){
    //       this.$axios.get(`/orderElectrician/queryElectrician?electricianId=&electricianName=`).then(res => {
    //       console.log(res)
    //     });
    //   },
    goback () {
      this.$router.go(-1)
    },
    serchbtn(){
      var params=this.searchtext
      this.$axios.get(`/orderElectrician/queryElectrician?electricianId=${this.electricianId}&electricianName=${this.searchtext}`).then(res => {
          this.data=res.data.resultValue
        });
    },
    gobackbtn(item){
      let getData=JSON.parse(sessionStorage.getItem("initialize"))
      if (getData!=null) {
        if(typeof(getData)===Object){
          alert("111")
        }else{
          let newArr=getData.find((n)=>n.electricianId == item.electricianId)
        if(newArr){
            this.$dialog.alert({
              width:"80%",
              message: "不能选择重复的电工",
              closeOnClickOverlay:true
            });
             return;
         
        }else{
           getData.push(item)
           sessionStorage.setItem('initialize', JSON.stringify(getData))
        }
        }
       
	    }else{
        this.datas.push(item)
        sessionStorage.setItem('initialize', JSON.stringify(this.datas))
      }
      this.$router.push({name:'Personneladd',params:{orderId:this.orderId}})
    }
  }
}
</script>

<style scoped>
.contianer{
width: 100%;
height: 100%;
background: #f0f6fd;
padding-bottom: 20px;
box-sizing: border-box;
display: flex;
flex-direction: column;
}
.contianer .backgroundbox{
    width: 100%;
    height: 100px;
    background-color: #87cefa;
    box-sizing: border-box;
    padding-top: 20px;
    box-sizing: border-box;
}
.contianer .backgroundbox .toptitle{
    padding: 0;
    margin: 0;
    color: #ffffff;
    display: flex;
}
.contianer .backgroundbox  .toptitle p:nth-child(1){
padding-left: 20px;
box-sizing: border-box;
}
.contianer .backgroundbox  .toptitle p:nth-child(2){
flex: 1;
text-align: center;
font-size: 15px;
font-weight: bold;
}
.contianer .backgroundbox .topinput{
    padding: 0;
    margin: 0;
    display: flex;
    margin-top: 15px;
}
.contianer .backgroundbox  .topinput p:nth-child(1){
flex: 1;
font-size: 13px;
text-align: center;
}
.contianer .backgroundbox  .topinput p:nth-child(1) input{
width: 240px;
height: 30px;
border-radius: 15px;
border: 0;
padding-left: 15px;
outline: none;
box-sizing: border-box;
}
.contianer .backgroundbox  .topinput p:nth-child(2) button{
font-size: 13px;
text-align: center;
width: 50px;
height: 30px;
border: 0;
outline: none;
background: #87cefa;
color: #ffffff;
}
.content{
  flex: 1;
  overflow: auto;
  padding: 10px 13px;
  box-sizing: border-box;
  font-size: 13px;
}
.content p{
border-bottom: 1px solid #cccccc;
margin-top: 15px;
padding-bottom: 10px;
}
</style>
