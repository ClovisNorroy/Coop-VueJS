<template>
    
</template>

<script>
    export default {
        name: "DetailMembre",
        props: ['userId'],
        methods:{
            getDerniersMessageMembre: function() {
                axios.get('channels').then(channels => {
                    channels.forEach(channel=>{
                        axios.get('channels/'+channel.id+'/posts')
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>