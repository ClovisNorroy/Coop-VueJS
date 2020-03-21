<template>
  <div class="home">
    <h1 class="title is-1">Bienvenue sur Coop</h1>
    <h2 class="subtitle is-2">Clone de Slack</h2>
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
