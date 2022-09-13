<template>
  <div>
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  methods: {
    getStudents() {
      // 记得加上前缀
      axios.get("http://localhost:8080/api1/students").then(
          response => {
            console.log("请求成功了", response.data);
          },
          error => {
            console.log("请求失败", error.message);
          }
      )
    },
    getCars() {
      axios.get("http://localhost:8080/api2/cars").then(
          response => {
            console.log("请求成功了", response.data);
          },
          error => {
            console.log("请求失败", error.message);
          }
      )
    }
  }
}
</script>
