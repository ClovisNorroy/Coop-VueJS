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
    token_session : false
  },
  mutations: {
    setSessionMembre(state,data) {
      if(data){
        state.membre = data.member;
        state.token_session = data.token;
      }else{
        state.membre=false;
        state.token_session=false;
      }

    },
    // setPiece(state,piece) {
    //   state.piece = piece;
    // },
    // initialiseStore(state) {
    //   if(localStorage.getItem('store')) {
    //     this.replaceState(
    //         Object.assign(state, JSON.parse(localStorage.getItem('store')))
    //     );
    //   }
    // }
  },
  actions: {
  },
  modules: {
  }
})
