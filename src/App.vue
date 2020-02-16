<template>
  <div id="app">
    <the-nav-bar/>
    <router-view/>
  </div>
</template>

<script>
  import TheNavBar from '@/components/TheNavBar.vue'
  export default {
    name: 'App',
    components: {
      TheNavBar
    },
    mounted(){
    axios.get('ping').then(()=>{
      // let memberID = this.membreConnecte;
      // if(!memberID){
      //   this.$router.push('/connexion');
      // }
      // else{
      //   axios.get("members/"+memberID+"/signedin").catch((error) => {
      //   this.$store.commit('setSessionMembre',false);
      //   this.$router.push('/connexion');
      // });
      // }
    }).catch(()=>{
        alert('Impossible de se connecter à l\'API')
      })
    },
    computed :{
      membreConnecte(){
        return this.$store.state.membre ? this.$store.state.membre.id : false;
      }
    }
  };
</script>
<style>
html{
  background-color: #2b2b2b;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #808080;
}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
