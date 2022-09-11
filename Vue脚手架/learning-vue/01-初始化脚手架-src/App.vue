<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <School></School>
    <Student></Student>
  </div>
</template>

<script>
// 引入组件
import School from "@/components/Student";
import Student from "@/components/Student";

export default {
  name: 'App',
  components: {
    School,
    Student,
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
