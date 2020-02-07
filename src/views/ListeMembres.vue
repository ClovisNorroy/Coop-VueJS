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
        methods:{

        },
        mounted() {
            console.log(this.$store.state.listeMembres);
        }
    }
</script>

<style scoped>

</style>