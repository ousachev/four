import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);


import skills from "./modules/skills"
import works from "./modules/works"
import feedback from "./modules/feedback"
export const store = new Vuex.Store({
    modules: {
        skills,
        works,
        feedback

    }
})