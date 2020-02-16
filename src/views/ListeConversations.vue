<template>
    <div id="listeConversations">
        <div class="columns">
            <div class="column is-one-third">
                <div v-if="listeConversations.length" v-for="conversation in listeConversations" @click="setChannel(conversation)">
                    {{  conversation }}
                </div>
            </div>
            <div class="column">
                <liste-messages :channel="currentChannel" :messages="listeMessages"></liste-messages>
            </div>
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
            setChannel: function(channel){
                axios.get('channels/'+channel.id+'/posts').then(response=>{
                    this.listeMessages = response.data.reverse();
                    this.currentChannel=channel.id;
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
