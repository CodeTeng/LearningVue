// 该文件是整个项目的入口文件
import Vue from 'vue' // 引入Vue
import App from './App.vue' // 引入App组件。它是所有组件的父组件
// import {mixin, mixin2} from "@/components/mixin";

Vue.config.productionTip = false
// 全局混入
// Vue.mixin(mixin);
// Vue.mixin(mixin2);

new Vue({
    render: h => h(App),    // render函数完成了这个功能：将App组件放入容器中
}).$mount('#app')
