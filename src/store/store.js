import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
    handleUserName: (state, user_name) => {
        state.user_name = user_name
        localStorage.setItem('user_name', user_name)
        console.log(user_name)
    }
}
const state = {
    user_name: '' || localStorage.getItem('user_name')
}
const getters = {
    userName: (state) => state.user_name
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export default  store 
