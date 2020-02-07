<template>
    
</template>

<script>
    export default {
        name: "DetailMembre",
        props: ['userId'],
        mounted(){
            axios.get('members').then(response => {
                console.log(response.data);
            })
        }
    }
</script>

<style scoped>

</style>