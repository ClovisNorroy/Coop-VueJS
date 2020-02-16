<template>
    <div id="ListeMembres">
        <div class="box" v-for="membre in $store.state.listeMembres">

            <router-link :to="'/detailmembre/' + membre.id">
                <div class="content ">
                    <p>{{membre.fullname}}</p>
                    <p>{{membre.email}}</p>
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
