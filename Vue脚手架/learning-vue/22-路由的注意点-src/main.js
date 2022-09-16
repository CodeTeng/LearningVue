import Vue from 'vue' // 引入Vue
import App from './App.vue' // 引入App组件。它是所有组件的父组件
import VueRouter from 'vue-router'; // 引入VouRouter
import router from "@/router";  // 引入路由器
import Banner from "@/components/Banner";

Vue.config.productionTip = false

Vue.use(VueRouter); // 应用插件

new Vue({
    render: h => h(App),    // render函数完成了这个功能：将App组件放入容器中
    router: router,
    components: [Banner],
}).$mount('#app')
