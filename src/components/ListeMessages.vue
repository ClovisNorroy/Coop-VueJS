<template>
    <div class="listeMessages">

        <div class="message is-small" v-for="message in messages" v-if="messages.length">
            <router-link :to="'/listeconversations/' + message.channel_id">
            <div class="message-header" v-if="boolMod">In channel : {{message.channel.label}} </div>
            </router-link>
            <router-link :to="'/detailmembre/' + message.member_id">
            <div class="message-header" v-if="!boolMod"> From : {{message.memberName}} || {{message.created_at}}</div>
            </router-link>
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
    }
</script>

<style scoped>

</style>
