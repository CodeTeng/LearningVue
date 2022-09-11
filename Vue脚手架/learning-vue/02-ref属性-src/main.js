// 该文件是整个项目的入口文件
import Vue from 'vue' // 引入Vue
import App from './App.vue' // 引入App组件。它是所有组件的父组件

Vue.config.productionTip = false

new Vue({
    render: h => h(App),    // render函数完成了这个功能：将App组件放入容器中
}).$mount('#app')
