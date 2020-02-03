<template>
    <div id="listeMessages">
        la liste des messages
    </div>
</template>

<script>
    export default {
        name: "ListeMessages",
        props: ['channel', 'messages'],
        mounted() {
            console.log(this);
        }
    }
</script>

<style scoped>

</style>
