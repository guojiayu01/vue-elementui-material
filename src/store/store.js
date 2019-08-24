import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
    handleUserName: (state, user_name) => {
        state.user_name = user_name
        localStorage.setItem('user_name', user_name)
        console.log(user_name)
    },
    login:(state,n) => {
        //传入登录状态islogin
        let islogin = JSON.parse(n);
        localStorage.setItem('islogin',JSON.stringify(islogin));
        console.log(islogin);
        state.islogin = islogin;
        }
      
    
}

const state = {
    user_name: '' || localStorage.getItem('user_name'),
    islogin:''
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
