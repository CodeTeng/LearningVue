<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!--跳转并携带params参数，to的对象写法（推荐）-->
        <router-link
            :to="{
          name: 'detail', // 使用name进行跳转
          params: {
            id: m.id,
            title: m.title,
          }
        }">
          {{ m.title }}
        </router-link>
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        {id: '001', title: '消息001'},
        {id: '002', title: '消息002'},
        {id: '003', title: '消息003'},
      ]
    }
  },
  methods: {
    pushShow(m) {
      this.$router.push({
        name: 'detail', // 使用name进行跳转
        params: {
          id: m.id,
          title: m.title,
        }
      })
    },
    replaceShow(m) {
      this.$router.replace({
        name: 'detail', // 使用name进行跳转
        params: {
          id: m.id,
          title: m.title,
        }
      })
    }
  }
}
</script>
