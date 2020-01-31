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
                tokenA : this.$store.state.token_session
            }
        },
        methods:{
            logMembres(){
                console.log(this.tokenA);
                axios.get('members?token='.tokenA).then(response=>{
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
