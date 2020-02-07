<template>
    <div id="ListeMembres">
        <div v-for="membre in this.$store.state.listeMembres">
            {{ membre.fullname }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListeMembres",
        methods:{

        },

        mounted() {
        }
    }
</script>

<style scoped>

</style>
