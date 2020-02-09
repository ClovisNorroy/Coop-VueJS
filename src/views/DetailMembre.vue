<template>
    <div id="detailMembre">
        {{membre}}
        <liste-messages :messages="memberLastMessages"></liste-messages>
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
            this.getMemberLastMessages();
        },
        methods:{
            //TODO : add to local storage and delete on new message
            getMemberLastMessages: async function() {
                this.keepNLastMessages(4, this.getAllMessages());
            },
            getAllMessages: function(){
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
                // this.keepNLastMessages(10, messageList);
                return messageList;
            },
            keepNLastMessages: function(nbrMessagesToKeep, listMessages){
                setTimeout(function(){
                    listMessages.sort(
                        function(a,b) {
                            let dateA = new Date(a.created_at); let dateB = new Date(b.created_at);
                            return dateA-dateB;
                        })}, 1000);
                this.memberLastMessages = listMessages;
            },
        }
    }
</script>

<style scoped>

</style>
