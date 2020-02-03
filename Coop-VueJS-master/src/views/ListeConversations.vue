<template>
    <div id="listeConversations">
        <div v-for="conversation in listeConversations">
            {{  conversation }}
            <button type=button @click="setChannel(conversation.id)">Set channel</button>
        </div>
<!--        <ListeMessages channel="" messages=""></ListeMessages>-->
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
                    console.log(channelID);
                    console.log(response.data);
                    //this.currentChannel = response.data
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
