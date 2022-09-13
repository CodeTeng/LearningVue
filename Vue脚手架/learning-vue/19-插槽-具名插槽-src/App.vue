<template>
  <div class="container">
    <Category title="美食">
      <img slot="center" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
      <a slot="footer" href="https://github.com/CodeTeng/">更多美食</a>
    </Category>

    <Category title="游戏">
      <ul slot="center">
        <li v-for="(item,index) in games" :key="index">{{ item }}</li>
      </ul>
      <div slot="footer" class="foot">
        <a href="https://github.com/CodeTeng/">单机游戏</a><br/>
        <a href="https://github.com/CodeTeng/">网路游戏</a><br/>
      </div>
    </Category>

    <Category title="电影">
      <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
      <template v-slot:footer>
        <div class="foot">
          <a href="https://github.com/CodeTeng/">经典</a><br/>
          <a href="https://github.com/CodeTeng/">热门</a><br/>
          <a href="https://github.com/CodeTeng/">推荐</a><br/>
        </div>
        <h4>欢迎前来观影</h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "@/components/Category";

export default {
  name: 'App',
  components: {Category},
  data() {
    return {
      foods: ['火锅', '烧烤', '小龙虾', '牛排'],
      games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
      films: ['《教父》', '《拆弹专家》', '《你好、李焕英》', "《假如爱有天意》"]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}

h4 {
  text-align: center;
}
</style>

