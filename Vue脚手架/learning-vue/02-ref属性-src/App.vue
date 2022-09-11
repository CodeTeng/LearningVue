<template>
  <div id="app">
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showName">点我输出上方DOM元素</button>
    <School ref="sch"></School>
  </div>
</template>

<script>
// 引入组件
import School from "@/components/Student";

export default {
  name: 'App',
  data() {
    return {
      msg: "欢迎学习Vue"
    }
  },
  components: {
    School,
  },
  methods: {
    showName() {
      console.log(this.$refs.title);  // 真实DOM元素
      console.log(this.$refs.btn);  // 真实DOM元素
      // console.log(document.getElementById("sch")); // id="sch";
      console.log(this.$refs.sch);  // VueComponent实例对象(vc) 与当用id属性获取的不同
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
