<template>
    <div id="posterMessage">
        Message :     <input type="text" v-model="channelTopics" id="channelLabels"><br/>
    </div>
</template>

<script>
    export default {
        name: "PosterMessage",
        props: ['channelID'],
        methods:{
            posterMessage: function(){
                this.channelID
            }
        }
    }
</script>

<style scoped>

</style>
