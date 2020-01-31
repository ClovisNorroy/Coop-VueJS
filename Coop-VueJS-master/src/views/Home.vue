<template>
  <div class="home">
    <h1>Home</h1>
    <router-link to="/creationcompte">Create Account</router-link>
    <br>
    <router-link to="/listemembres">Liste Membres</router-link>
    <br>
    <router-link to="/creationcompte">Creer un compte</router-link>
    <br>
    <router-link to="/connexion">Se connecter</router-link>
<!--    <div v-if="></div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import CreationCompte from "@/views/CreationCompte";
import ListeMembres from "@/views/ListeMembres";
import Connexion from "@/views/Connexion";
export default {
  name: 'home',
  components: {
    CreationCompte,
    ListeMembres,
    Connexion
  }
}
</script>
