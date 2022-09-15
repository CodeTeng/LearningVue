import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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

const mutations = {
    ADD(state, value) {
        state.sum += value;
    },
    SUB(state, value) {
        state.sum -= value;
    },
    ADD_PERSON(state, value) {
        state.personList.unshift(value);
    }
}

const state = {
    sum: 0,
    school: 'CQJTU',
    subject: 'Java',
    personList: []
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
