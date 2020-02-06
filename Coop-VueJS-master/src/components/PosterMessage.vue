<template>
    <div class="posterMessage">
        <input type="text" v-model="message" id="channelLabels"><button type=button @click="posterMessage">Send</button>
    </div>
</template>

<script>
    export default {
        name: "PosterMessage",
        props: ['channelId'],
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
                    }).then(response=>{console.log(response.data)}).catch(error =>{
                        alert(error.response.data.message)
                })
            }
        }
    }
</script>

<style scoped>

</style>
