<template>
    <div class="hoursTip">{{hoursTip}}{{time1}}</div>
</template>
<script>
    export default {
        name:"hoursTip",
        data() {
            return {
                hoursTip: '',
                time1:""
            }
        },
        props: {
            time: String,
            required: true
            },
        mounted() {
           this.getMycount();
            // this.showtime(this.time)
            this.times()
        },
        methods: {
            getMycount () {
                // console.log(this.time)
                let self = this;
                let date = new Date();
                // console.log(date)
                if (date.getHours() >= 0 && date.getHours() < 12) {
                    self.hoursTip = "上午"
                } else if (date.getHours() >= 12 && date.getHours() < 18) {
                    self.hoursTip = "下午"
                } else {
                    self.hoursTip = "晚上"
                }
            },
              showtime(time) {
                //   time=new Date(time).getTime()
                  console.log(time)
            let date =
                typeof time === "number"
                ? new Date(time)
                : new Date((time || "").replace(/-/g, "/"));
            let diff = (new Date().getTime() - date.getTime()) / 1000;
            let dayDiff = Math.floor(diff / 86400);

            let isValidDate =
                Object.prototype.toString.call(date) === "[object Date]" &&
                !isNaN(date.getTime());

            if (!isValidDate) {
                window.console.error("不是有效日期格式");
            }
            const formatDate = function(date) {
                let today = new Date(date);
                let year = today.getFullYear();
                let month = ("0" + (today.getMonth() + 1)).slice(-2);
                let day = ("0" + today.getDate()).slice(-2);
                let hour = today.getHours();
                let minute = today.getMinutes();
                let second = today.getSeconds();
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
            };
                //小于0或者大于等于31显示原时间
            if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
                return formatDate(date);
            }
            return (
                (dayDiff === 0 &&
                ((diff < 60 && "刚刚") ||
                    (diff < 120 && "1分钟前") ||
                    (diff < 3600 && Math.floor(diff / 60) + "分钟前") ||
                    (diff < 7200 && "1小时前") ||
                    (diff < 86400 && Math.floor(diff / 3600) + "小时前"))) ||
                (dayDiff === 1 && "昨天") ||
                (dayDiff < 7 && dayDiff + "天前") ||
                (dayDiff < 31 && Math.ceil(dayDiff / 7) + "周前")
            );
            },
            times(){
             let self = this;
             var aData =new Date()
             self.time1 =aData.getHours() + ":" + aData.getMinutes()
            //  console.log(this.time) //2019-8-20 
           },

        }
    }
</script>
<style lang="scss" scoped>
.hoursTip{

}
</style>