<template>
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">
                    Home
                </a>

                <router-link to="/listemembres" class="navbar-item" v-if="$store.state.token_session">
                    Membres
                </router-link>

                <router-link to="/connexion" class=navbar-item v-if="!$store.state.token_session">
                    Login
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "TheNavBar"
    }
</script>

<style scoped>

</style>
