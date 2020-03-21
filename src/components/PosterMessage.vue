<template>
    <div class="posterMessage">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input type="text" class="input" v-model="message" id="channelLabels">
            </div>
            <div class="control">
                <a class="button is-info" @click="posterMessage()">
                    Send
                </a>
            </div>
        </div>
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
                    this.message="";
                    }).catch(error =>{
                        alert(error.response.data.message)
                })
            }
        }
    }
</script>

<style scoped>

</style>
