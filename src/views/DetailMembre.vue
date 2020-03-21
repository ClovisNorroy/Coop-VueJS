<template>
    <div id="detailMembre">
        <div class="container">
            <div class="media">
            <div class="media-left">
                <img :src="getGravatar(membre)">
            </div>
            <div class="media-content">
                <b>Member</b> : {{membre.fullname}} <br><b>Email</b> : {{membre.email}}

            </div>

            </div>
            <liste-messages :messages="memberLastMessages" bool-mod="true"></liste-messages>
        </div>
    </div>

</template>

<script>
    import ListeMessages from "../components/ListeMessages";
    export default {
        name: "DetailMembre",
        components: {ListeMessages},
        props: ['userId'],
        data(){
            return{
                memberLastMessages : []
            }
        },
        computed:{
            membre: function(){
                return this.$store.state.listeMembres[this.userId];
            }
        },
        mounted() {
            this.keepNLastMessages(10);
        },
        methods:{
            getAllMessages: async function(){
                let messageList = [];
                axios.get('channels').then(channelResponse => {
                    channelResponse.data.forEach(channel=>{
                        axios.get('channels/'+channel.id+'/posts').then(messagesResponse=>{
                            messagesResponse.data.forEach(message=>{
                                if(message.member_id === this.membre.id)
                                    messageList.push(message)
                            });
                        }).catch(error => { console.log(error.response)})
                    });
                }).catch(error => { console.log(error.response)});
                return messageList;
            },
            keepNLastMessages:async function(nbrMessagesToKeep){
                let listMessages = await this.getAllMessages();
                let channelMap = [];
                setTimeout(function(){
                    axios.get('channels').then(response => {
                        response.data.forEach(channel =>{
                            channelMap[channel.id] = {label: channel.label, topic: channel.topic}
                        });
                        listMessages.forEach(message => {
                            message.channel = channelMap[message.channel_id];
                        });
                        listMessages.sort(
                            function(a,b) {
                                let dateA = new Date(a.created_at); let dateB = new Date(b.created_at);
                                return dateA-dateB;
                            }
                        );
                        this.memberLastMessages = listMessages.slice(0, nbrMessagesToKeep);
                    });
                }, 500);
                setTimeout(()=>{
                    this.memberLastMessages = listMessages.slice(0, nbrMessagesToKeep);
                }, 1000);
            }
        }
    }
</script>

<style scoped>

</style>
