<template>
    <div id="formCreateConv">
    Nom Conversation :  <input type="text" v-model="channelLabel" id="channelName" required/><br/>
    Label(s) :     <input type="text" v-model="channelTopics" id="channelLabels" required><br/>
    <button type="button" @click="validateForm">Register</button>
    </div>
</template>

<script>
    export default {
        name: "CreationConversation",
        data(){
            return{
                channelLabel : null,
                channelTopics : null,
                errors: []
            }
        },
        methods: {
            validateForm: function () {
                if (!this.channelLabel) {
                    this.errors.push("channelLabel");
                }
                if (!this.channelTopics) {
                    this.errors.push("channelTopics");
                }
                if (!this.errors.length) {
                    this.createChannel();
                }
            },
            createChannel: function(){
                axios.post('channels',{label:this.channelLabel,topic:this.channelTopics}).then(response => {
                    this.$router.push('/')
                }).catch(error => {
                    alert(error.response.data.message);
                })
            }
        }
    }
</script>

<style scoped>

</style>
