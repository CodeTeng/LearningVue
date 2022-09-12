<template>
  <div class="school">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>当前求和为：{{ number }}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentName">把学生名给APP</button>
    <button @click="unbind">解绑teng事件</button>
    <button @click="death">销毁当前Student组件的实例(vc)</button>
  </div>
</template>

<script>

export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      sex: "男",
      number: 0
    }
  },
  methods: {
    sendStudentName() {
      // 触发Student组件实例身上的teng事件
      this.$emit("teng", this.name, 666, 888, 999)
      // this.$emit("demo")
      this.$emit("click");
    },
    unbind() {
      this.$off("teng") // 解绑一个自定义事件
      // this.$off(["teng", "demo"]) // 解绑多个自定义事件
      // this.$off();  // 解绑所有的自定义事件
    },
    death() {
      this.$destroy() // 销毁了当前Student组件的实例,销毁后所有Student实例的自定义事件全都不奏效了。
    },
    add() {
      this.number++;
      console.log("add回调被调用了")
    }
  }
}
</script>

<style scoped lang="less">
.school {
  background-color: pink;
  padding: 5px;
}
</style>
