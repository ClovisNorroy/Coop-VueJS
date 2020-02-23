<template>
    <div id="listeConversations">
        <div class="columns">
            <div class="column is-one-third bordered">
                <h2 class="title is-4">Liste des conversations : </h2>
                <div class="box" v-if="listeConversations.length" v-for="channel in listeConversations" @click="setChannel(channel.id)">
                    <strong>{{  channel.label }}</strong>
                    <p>{{channel.topic}}</p>
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
            setChannel: function(channelId){
                axios.get('channels/'+channelId+'/posts').then(response=>{
                    this.listeMessages = response.data.reverse();
                    this.currentChannel=channelId;
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
            });
            if(this.$route.params.channelId) {
                console.log(this.$route.params.channelId);
                this.setChannel(this.$route.params.channelId);
            }
        },
    }
</script>

<style>
.bordered{
    border-right: 1px solid black;
}
</style>
