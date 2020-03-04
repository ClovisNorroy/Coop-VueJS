<template>
    <div class="listeMessages">

        <div class="message is-small" v-for="(message, index) in messages" v-if="messages.length">

            <div class="message-header" v-if="boolMod">
                <router-link :to="'/listeconversations/' + message.channel_id">
                In channel : {{message.channel.label}}
                </router-link>
                <button class="delete" aria-label="delete" ></button>
            </div>


            <div class="message-header" v-if="Object.keys($store.state.listeMembres).includes(message.member_id) && !boolMod">
                <router-link :to="'/detailmembre/' + message.member_id" >
                From : {{message.memberName}} || {{message.created_at}}
                </router-link>
                <button class="delete" aria-label="delete" v-if="message.member_id === $store.state.membre.id"
                        @click="deleteMessage(message.channel_id, message.id, index)"></button>
            </div>
<!--            -->
            <div class="message-header" v-if="!Object.keys($store.state.listeMembres).includes(message.member_id) && !boolMod">
                From : Deleted Member || {{message.created_at}}
            </div>
            <div class="message-body">{{  message.message }}</div>
        </div>
        <poster-message v-if="channel" :messages="messages" :channel-id="channel"></poster-message>
    </div>
</template>

<script>
import PosterMessage from "./PosterMessage";
    export default {
        name: "ListeMessages",
        props: ['channel', 'messages', 'boolMod'],
        components:{
            PosterMessage
        },
        mounted() {
            console.log(this.messages);
        },
        methods:{
            deleteMessage(channelId, messageId, index){
                console.log(index);
                axios.delete("channels/"+channelId+"/posts/"+messageId).then(response=> {
                    console.log(response.data);
                    this.messages.splice(index, 1);
                }).catch(error => { console.log(error.response)});
            }
        }
    }
</script>

<style scoped>

</style>
