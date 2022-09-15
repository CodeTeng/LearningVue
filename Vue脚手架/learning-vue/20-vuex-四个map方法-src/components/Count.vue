<template>
  <div>
    <h2>当前求和为：{{ sum }}</h2>
    <h3>当前求和的10倍为：{{ bigSum }}</h3>
    <h3>我在{{ school }}，学习{{ subject }}</h3>
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
    // 程序员自己写的计算属性
    /*sum() {
      return this.$store.state.sum;
    },
    school() {
      return this.$store.state.school;
    },
    subject() {
      return this.$store.state.subject;
    },*/
    // bigSum() {
    //   return this.$store.getters.bigSum;
    // },

    // 借助mapState生成计算属性：sum,school,subject（对象写法）
    ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),
    // 借助mapState生成计算属性：sum,school,subject（数组写法）
    // ...mapState(['sum', 'school', 'subject']),

    // 借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum: 'bigSum'}),
    // 借助mapGetters生成计算属性：bigSum（数组写法）
    // ...mapGetters(['bigSum'])
  },
  methods: {
    /*increment() {
      this.$store.commit("ADD", this.n);
    },
    decrement() {
      this.$store.commit("SUB", this.n);
    },*/

    // 靠mapMutations生成：increment,decrement（对象形式）
    ...mapMutations({increment: "ADD", decrement: "SUB"}),
    // 靠mapMutations生成：ADD,SUB（数组形式）前提是click函数名也为ADD和SUB
    // ...mapMutations(['ADD', 'SUB']),

    /*incrementOdd() {
      this.$store.dispatch("addOdd", this.n);
    },
    incrementWait() {
      this.$store.dispatch("addWait", this.n);
    },*/

    // 靠mapActions生成：addOdd，addWait（对象形式）
    ...mapActions({incrementOdd: 'addOdd', incrementWait: 'addWait'}),
    // 靠mapActions生成：addOdd，addWait（数组形式）
    // ...mapActions(['addOdd', 'addWait'])
  },
}
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
