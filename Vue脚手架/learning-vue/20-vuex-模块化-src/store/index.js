import Vue from "vue";
import Vuex from "vuex";
import countOptions from './count';
import personOptions from './person'


Vue.use(Vuex);

// 创建并暴露store
export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions,
    }
})
