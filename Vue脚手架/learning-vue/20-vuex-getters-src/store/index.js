import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 准备actions---用于响应组件中的动作
const actions = {
    addOdd(context, value) {
        if (context.state.sum % 2) context.commit("ADD", value);
    },
    addWait(context, value) {
        setTimeout(() => {
            context.commit("ADD", value)
        }, 500)
    }
}
// 准备mutations---用于操作数据(state)
const mutations = {
    ADD(state, value) {
        state.sum += value;
    },
    SUB(state, value) {
        state.sum -= value;
    }
}
// 准备state---用于存储数据
const state = {
    sum: 0, // 当前的和
}
// 准备getters对象---用于将state中的数据进行加工
const getters = {
    bigSum() {
        return state.sum * 10;
    }
}

// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
