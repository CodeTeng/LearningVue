<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="keyWord">
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: "Search",
  data() {
    return {
      keyWord: '',
    }
  },
  methods: {
    searchUsers() {
      // 请求前更新List数据
      this.$bus.$emit("updateListData", {
        isLoading: true,
        errMsg: "",
        users: [],
        isFirst: false,
      })
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
          response => {
            // console.log("请求成功了", response.data.items)
            this.$bus.$emit("updateListData", {
              // 请求成功后更新List数据
              isLoading: false,
              errMsg: "",
              users: response.data.items
            });
          },
          error => {
            this.$bus.$emit("updateListData", {
              // 请求后更新List数据
              isLoading: false,
              errMsg: error.message,
              users: [],
            })
            // console.log("请求失败了", error.message);
          }
      )
    }
  }
}
</script>

<style scoped>

</style>
