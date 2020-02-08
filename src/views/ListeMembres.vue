<template>
    <div id="ListeMembres">
        <div v-for="membre in $store.state.listeMembres">
            <router-link :to="'/detailmembre/' + membre.id">
                <div class="membre">
                    {{ membre }}
                </div>
            </router-link>
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
