<template>
  <div id="demo">
    <h2 @click="showName">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
// 引入一个混合
import {mixin} from "@/components/mixin";
import {mixin2} from "@/components/mixin";

export default {
  name: "Student",
  data() {
    console.log(this);
    return {
      name: "CQJTU",
      address: "重庆市南岸区",
      x: 666, // 当原数据与混合引入有相同的名称时，以原数据为主 即不会破坏原有数据
    }
  },
  mounted() {
    console.log("你好啊！！！！"); // 当混合也引入时 原数据的会后出现
  },
  mixins: [mixin, mixin2]
}
</script>

<style scoped>
#demo {
  background: skyblue;
}
</style>
