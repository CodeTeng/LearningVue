import Vue from 'vue' // 引入Vue
import App from './App.vue' // 引入App组件。它是所有组件的父组件
import store from "@/store";    // 引入store

Vue.config.productionTip = false

new Vue({
    render: h => h(App),    // render函数完成了这个功能：将App组件放入容器中
    store,  // 配置项添加store
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
}).$mount('#app')
