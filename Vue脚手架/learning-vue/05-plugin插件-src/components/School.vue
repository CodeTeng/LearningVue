<template>
  <div>
    <h2>学校名称：{{ name | mySlice }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="test">点我测试Vue插件方法</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "CQJTU哈哈哈哈",
      address: "重庆市南岸区",
    }
  },
  methods: {
    test() {
      this.hello();
    }
  }
}
</script>

<style scoped>
</style>
