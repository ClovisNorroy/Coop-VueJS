<template>
    <div class="listeMessages">

        <div class="message is-small" v-for="message in messages" v-if="messages.length">
            <div class="message-header" v-if="displayContext">In channel : {{message.channel.label}} </div>
            <div class="message-header" v-if="!displayContext"> From : {{message.memberName}} || {{message.created_at}}</div>
            <div class="message-body">{{  message.message }}</div>

        </div>
        <poster-message v-if="channel" :messages="messages" :channel-id="channel"></poster-message>
    </div>
</template>

<script>
import PosterMessage from "./PosterMessage";
    export default {
        name: "ListeMessages",
        props: ['channel', 'messages', 'displayContext'],
        components:{
            PosterMessage
        },
    }
</script>

<style scoped>

</style>
