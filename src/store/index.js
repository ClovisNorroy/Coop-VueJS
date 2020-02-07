import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"

const vp = new VuexPersistence({
  key : 'store',
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    piece: false,
    membre : false,
    token_session : false,
    listeMembres : []
  },
  mutations: {
    setListeMembres(state, data){
      console.log(data);
      state.listeMembres = data;
    },
    setSessionMembre(state,data) {
      if(data){
        state.membre = data.member;
        state.token_session = data.token;
      }else{
        state.membre=false;
        state.token_session=false;
      }

    },
  },
  actions: {
  },
  modules: {
  }
})
