<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
  name: "About",
  // 通过路由规则，进入该组件时被调用
  beforeRouterEnter(to, from, next) {
    console.log('About-beforeRouterEnter')
    if (to.meta.isAuth) {
      if (localStorage.getItem('school') === 'teng') {
        next()
      } else {
        alert("学校名不对，无权限查看")
      }
    } else {
      next()
    }
  },
  // 通过路由规则，离开该组件时被调用
  beforeRouteLeave(to, from, next) {
    console.log('About-beforeRouteLeave')
    next()
  }
}
</script>
