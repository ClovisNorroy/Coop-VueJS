<template>
    <div id="listeConversations">
        <div class="columns">
            <div class="column is-one-third bordered">
                <h2 class="title is-4">Liste des conversations : </h2>
                <div class="box" v-if="listeConversations.length" v-for="conversation in listeConversations" @click="setChannel(conversation)">
                    <strong>{{  conversation.label }}</strong>
                    <p>{{conversation.topic}}</p>
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
                    this.listeMessages.map(message=>{
                        message.memberName = this.$store.state.memberIdToFullname[message.member_id];
                    });
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
        },
    }
</script>

<style>
.bordered{
    border-right: 1px solid black;
}
</style>
