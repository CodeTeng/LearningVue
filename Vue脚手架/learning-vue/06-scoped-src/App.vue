<template>
  <div>
    <h1 class="title">你好啊</h1>
    <Student/>
    <School/>
  </div>
</template>

<script>
import Student from "@/components/Student";
import School from "@/components/School";

export default {
  name: 'App',
  components: {
    Student,
    School
  },
}
</script>

<style scoped>
.title {
  color: red;
}
</style>
