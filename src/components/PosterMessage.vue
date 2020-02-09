<template>
    <div class="posterMessage">
        <input type="text" v-model="message" id="channelLabels"><button type=button @click="posterMessage()">Send</button>
<!--        ; $emit('addMessage')-->
    </div>
</template>

<script>
    export default {
        name: "PosterMessage",
        props: ['channelId', 'messages'],
        data(){
            return{
                message : null
            }
        },
        methods:{
            posterMessage: function(){
                axios.post('channels/'+this.channelId+'/posts',
                    {
                        message: this.message,
                        member_id : this.$store.state.member_id
                    }
                    ).then(response=>{
                    console.log(response.data);
                    this.messages.push(response.data);
                    }).catch(error =>{
                        alert(error.response.data.message)
                })
            }
        }
    }
</script>

<style scoped>

</style>
