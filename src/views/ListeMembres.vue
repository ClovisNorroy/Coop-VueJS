<template>
    <div id="ListeMembres">
        <div class="box" v-for="membre in $store.state.listeMembres">

            <router-link :to="'/detailmembre/' + membre.id">
                <div class="content ">
                    <p>{{membre.fullname}}</p>
                    <p>{{membre.email}}</p>
                </div>
            </router-link>
            <img @click="toggleDeleteMember(membre)" src="../assets/icons/trash-solid.svg" v-show="!boolModal"
                 width=16>
        </div>
        <div class="modalToDo" v-if="boolModal">
            Voulez-vous vraiment supprimer {{memberToDelete.fullname}} ?
            <button type=button @click="deleteMember">Oui</button>
            <button type=button @click="toggleDeleteMember">Non</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListeMembres",
        data() {
            return{
                boolModal : false,
                memberToDelete : null
            }
        },
        methods:{
            toggleDeleteMember: function(membre){
                this.boolModal = ! this.boolModal;
                this.memberToDelete = membre;
            },
            deleteMember: function(){
                axios.delete('members/'+this.memberToDelete.id).then(response =>{
                    console.log(response.data);
                }).catch(error=>{
                    console.log(error.response.data.message);
                })
            }
        }
    }
</script>

<style scoped>

</style>
