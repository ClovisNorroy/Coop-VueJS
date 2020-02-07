<template>
    <div id="listeConversations">
        <div v-if="listeConversations.length" v-for="conversation in listeConversations">
            {{  conversation }}
            <button type=button @click="setChannel(conversation)">Set channel</button>
        </div>
        <liste-messages :channel="currentChannel" :messages="listeMessages"></liste-messages>
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
            setChannel: function(channel){
                axios.get('channels/'+channel.id+'/posts').then(response=>{
                    console.log(response.data);
                    this.listeMessages = response.data.reverse();
                    this.currentChannel=channel;
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
