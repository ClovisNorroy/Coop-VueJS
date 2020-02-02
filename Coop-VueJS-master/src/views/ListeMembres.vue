<template>
    <div id="ListeMembres">
        <p> OUI </p>
        <button @click=logMembres>log membres</button>
    </div>
</template>

<script>
    export default {
        name: "ListeMembres",
        data() {
            return {
                members: null,
            }
        },
        methods:{
            logMembres(){
                axios.get('members').then(response=>{
                    this.members=response.data;
                });
                console.log(this.members);
            }
        },

        mounted() {
            console.log(this);
            // axios.get('members?token='.this.$store.state.token_session).then(response=>{
            //     this.members=response.data;
            // });
            // console.log(this.members);
        }
    }
</script>

<style scoped>

</style>
