<template>
    <div class="hoursTip">{{hoursTip}}</div>
</template>
<script>
    export default {
        name:"hoursTip",
        data() {
            return {
                hoursTip: ''
            }
        },
        created() {
            this.getMycount();
        },
        methods: {
            getMycount () {
                let self = this;
                let date = new Date();

                if (date.getHours() >= 0 && date.getHours() < 12) {

                    self.hoursTip = "上午"

                } else if (date.getHours() >= 12 && date.getHours() < 18) {

                    self.hoursTip = "下午"

                } else {

                    self.hoursTip = "晚上"

                }
            }

        }
    }
</script>
<style lang="scss" scoped>
.hoursTip{

}
</style>