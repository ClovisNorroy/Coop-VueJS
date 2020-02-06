<template>
    <div id="listeConversations">
        <div v-for="conversation in listeConversations">
            {{  conversation }}
            <button type=button @click="setChannel(conversation.id)">Set channel</button>
            <ListeMessages :channel="conversation.id" :messages="listeMessages"></ListeMessages>
        </div>

    </div>
</template>

<script>
    import ListeMessages from "../components/ListeMessages";

    export default {
        components:{
          ListeMessages
        },
        name: "ListeConversations",
        data(){
            return {
                listeConversations: [],
                listeMessages: [],
                currentChannel: null
            }
        },
        methods:{
            setChannel: function(channelID){
                axios.get('channels/'+channelID+'/posts').then(response=>{
                    console.log(response.data);
                    // this.listeMessages = response.data
                }).catch(error=>{
                    alert(error.response.data.message)
                })
            }
        },
        mounted() {
            axios.get('channels').then((response)=>{
                this.listeConversations = response.data;
            }).catch(error=>{
                alert(error.response.data.message)
            })
        }
    }
</script>

<style scoped>

</style>
