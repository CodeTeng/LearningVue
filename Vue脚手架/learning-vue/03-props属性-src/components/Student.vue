<template>
  <div id="demo">
    <h1>{{ msg }}</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ myAge + 1 }}</h2>
    <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    console.log(this);
    return {
      msg: "欢迎进行学习！",
      myAge: this.age,  // props的优先级更高
    }
  },
  methods: {
    updateAge() {
      this.myAge++; // 进行修改
    }
  },
  // 简单声明接受
  props: ['name', 'sex', 'age'],
  // 接受的同时对数据进行类型限制
  /*props: {
    name: String,
    sex: String,
    age: Number,
  }*/
  // 接受的同时对数据进行类型限制+默认值的指定+必要性的限制
  /*props: {
    name: {
      type: String, // nane类型
      required: true, // 名字是必须的
    },
    age: {
      type: Number,
      default: 99,  // 默认值
    },
    sex: {
      type: String,
      required: true,
    }
  }*/
}
</script>

<style scoped>
#demo {
  background: skyblue;
}
</style>
