import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: "",
    name: "",
    districtid:""
  },
  mutations: {
    names(state,obj){
      state.name=obj;
    },
    opid(state,obj){
      state.userId=obj;
    },
    districtid1(state,obj){
      state.districtid=obj;
    }
  },
  actions: {
  },
  modules: {
  }
  
})
export default store
