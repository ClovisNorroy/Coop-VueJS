<template>
    <div class="listeMessages">
        <div class=message" v-for="message in messages">
            {{  message.message }}
        </div>
<!--        <poster-message :channel-id="channel"></poster-message>-->
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
        mounted() {
            console.log(this.props);
        }
    }
</script>

<style scoped>

</style>
