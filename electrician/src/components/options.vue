<template>
  <div v-qr="options" v-if="options" />
</template>
<script>
export default {
  name: "baseOptions",
  data() {
    return {
      //   options: 'www.baidu.com'
      options: {
        text: "www.baidu.com",
        render: "canvas",
        width: 200,
        height: 200,
        typeNumber: -1,
        correctLevel: 2,
        background: "#ffffff",
        foreground: "#000000",
      },
    };
  },
};
</script>
