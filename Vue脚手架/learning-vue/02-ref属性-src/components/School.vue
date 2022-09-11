<template>
  <div id="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "CQJTU",
      address: "重庆市南岸区",
    }
  },
}
</script>

<style scoped>
#demo {
  background: skyblue;
}
</style>
