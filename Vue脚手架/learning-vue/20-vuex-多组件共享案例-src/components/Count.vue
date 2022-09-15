<template>
  <div>
    <h2>当前求和为：{{ sum }}</h2>
    <h3>当前求和的10倍为：{{ bigSum }}</h3>
    <h3>我在{{ school }}，学习{{ subject }}</h3>
    <h3 style="color: red">Person组件的总人数是：{{ personList.length }}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <!--需要传参时需要-->
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "Count",
  data() {
    return {
      n: 1, // 用户选择的数字
    }
  },
  computed: {
    ...mapState(['sum', 'school', 'subject', 'personList']),
    ...mapGetters(['bigSum']),
  },
  methods: {
    ...mapMutations({increment: "ADD", decrement: "SUB"}),
    ...mapActions({incrementOdd: 'addOdd', incrementWait: 'addWait'}),
  },
}
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
