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
    listeMembres : [],
    memberIdToFullname : []
  },
  mutations: {
    setListeMembres(state, data){
      state.listeMembres = data;
      Object.values(data).forEach(member=>{
        this.state.memberIdToFullname[member.id]=member.fullname;
      })
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
    logout(state){
      state.listeMembres=[];
      state.membre=false;
      state.token_session=false;
    }
  },
  actions: {
  },
  modules: {
  }
})
