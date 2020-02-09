<template>
    <div class="listeMessages">
        <div class="message" v-for="message in messages">
            {{  message.message }}
        </div>
        <poster-message v-if="channel" :messages="messages" :channel-id="channel"></poster-message>
    </div>
</template>

<script>
import PosterMessage from "./PosterMessage";
    export default {
        name: "ListeMessages",
        props: ['channel', 'messages'],
        components:{
            PosterMessage
        },
    }
</script>

<style scoped>

</style>
