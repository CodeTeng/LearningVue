import Vue from 'vue' // 引入Vue
import App from './App.vue' // 引入App组件。它是所有组件的父组件

// 引入插件
import plugins from "@/plugins";

Vue.config.productionTip = false

// 使用插件
Vue.use(plugins, 1, 2, 3);

new Vue({
    render: h => h(App),    // render函数完成了这个功能：将App组件放入容器中
}).$mount('#app')
