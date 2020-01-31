<template>
    <div>
        Email : <input type="email" v-model="email"><br/>
        Password : <input type="password" v-model="password"><br/>
        <button type="button" v-on:click="connect">get connected</button>
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
                    console.log(response.data)
                }).catch(error => {
                    console.log(error.response)
                })
            }
        }
    }
</script>

<style scoped>

</style>
