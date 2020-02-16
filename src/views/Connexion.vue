<template>
    <div id="connexion">
        <div class="column is-half  is-offset-one-quarter">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" placeholder="Account Email" v-model="email">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="Account Password" v-model="password">
                </div>
            </div>
            <div class="field is-centered">
                <button class="button is-primary is-rounded" @click="connect">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Connexion",
        data(){
            return{
                email: null,
                password : null
            }
        },
        methods:{
            connect: function(){
                axios.post('members/signin',{email:this.email,password:this.password}).then(response => {
                    this.$store.commit('setSessionMembre',response.data);
                    axios.get('members').then(response =>{
                        let listeMembres = {};
                        response.data.forEach(membre => {
                            listeMembres[membre.id] = membre;
                            }
                        );
                        this.$store.commit('setListeMembres', listeMembres)
                    }).catch(error => { console.log(error.response)});
                    this.$router.push('/');
                }).catch(error => { console.log(error.response)})
            }
        }
    }
</script>

<style scoped>

</style>
