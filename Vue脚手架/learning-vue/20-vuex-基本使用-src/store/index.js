// 该文件用于创建Vuex中最为核心的store
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const actions = {           // 准备actions---用于响应组件中的动作
    /*jia(context, value) {
        // console.log("actions中的jia被调用了", context, value)
        context.commit("JIA", value)
    },
    jian(context, value) {
        context.commit("JIAN", value);
    },*/
    jiaOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit("JIA", value);
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit("JIA", value);
        }, 500);
    }
}
const mutations = {      // 准备mutations---用于操作数据(state)
    JIA(state, value) {
        // console.log("mutations中的JIA被调用了", state, value)
        state.sum += value;
    },
    JIAN(state, value) {
        state.sum -= value;
    },
}
const state = {         // 准备state---用于存储数据
    sum: 0, // 当前的和
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
