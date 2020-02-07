<template>
    <div id="ListeMembres">
        <div v-for="item in this.$store.state.listeMembres">
            {{ item.id }} {{item.details}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListeMembres",
    }
</script>

<style scoped>

</style>