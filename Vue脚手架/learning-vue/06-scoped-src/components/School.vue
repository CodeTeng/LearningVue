<template>
  <div class="school">
    <h2 class="title">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "CQJTU",
      address: "重庆市南岸区",
    }
  }
}
</script>

<style scoped>
.school {
  background-color: skyblue;
}
</style>
