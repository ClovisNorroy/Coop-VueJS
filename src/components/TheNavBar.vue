<template>
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Home
                </router-link>

                <router-link to="/listemembres" class="navbar-item" v-show="$store.state.token_session">
                    Membres
                </router-link>
                <router-link to="/listeconversations" class="navbar-item" v-show="$store.state.token_session">
                    Conversations
                </router-link>
                <router-link to="/connexion" class=navbar-item v-if="!$store.state.token_session">
                    Login
                </router-link>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <button class="button is-danger is-rounded" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "TheNavBar",
        methods:{
            logout: function(){
                this.$store.commit('logout', false);
                if(this.$route.path !== "/")
                    this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>
