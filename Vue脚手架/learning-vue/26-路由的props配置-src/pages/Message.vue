<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!--路由跳转并携带params参数，to字符串写法-->
        <!--<route-link :to="`/home/message/detail/${m.id}/${m.title}`">{{ m.title }}</route-link>-->

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
  }
}
</script>
