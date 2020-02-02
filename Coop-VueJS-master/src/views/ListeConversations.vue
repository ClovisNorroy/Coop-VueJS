<template>
    <div id="listeConversations">
        <div v-for="conversation in listeConversations">
            {{  conversation }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListeConversations",
        data(){
            return {
                listeConversations : []
            }
        },
        mounted() {
            axios.get('channels').then((response)=>{
                console.log('oui');
                this.listeConversations = response.data;
            }).catch(error=>{
                alert(error.response.data.message)
            })
        }
    }
</script>

<style scoped>

</style>
