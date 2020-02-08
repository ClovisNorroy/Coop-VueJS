<template>
    <div id="detailMembre">
        {{membre.fullname}}
    </div>

</template>

<script>
    export default {
        name: "DetailMembre",
        props: ['userId'],
        data(){
            return{
                listeMessagesMembre : []
            }
        },
        computed:{
            membre: function(){
                return this.$store.state.listeMembres[this.userId];
            }
        },
        mounted() {
            this.getDerniersMessageMembre();
            console.log(this.listeMessagesMembre)
        },
        methods:{
            //TODO : add to local storage and delete on new message
            getDerniersMessageMembre: function() {
                axios.get('channels').then(channelResponse => {
                    channelResponse.data.forEach(channel=>{
                        axios.get('channels/'+channel.id+'/posts').then(messagesResponse=>{
                            messagesResponse.data.forEach(message=>{
                                if(message.member_id === this.membre.id)
                                this.listeMessagesMembre.push(message)
                            })
                        }).catch(error => { console.log(error.response)})
                    })
                }).catch(error => { console.log(error.response)})
            }
        }
    }
</script>

<style scoped>

</style>
