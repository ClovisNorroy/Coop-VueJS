<template>
    <div id="ListeMembres">
        <div class="box" v-for="membre in $store.state.listeMembres">
            <div class=media-left><figure class="image is-64x64"><img :src="getGravatar(membre)"></figure></div>
            <router-link :to="'/detailmembre/' + membre.id">
                <div class="content ">
                    <p>{{membre.fullname}}</p>
                    <p>{{membre.email}}</p>
                </div>
            </router-link>
            <img @click="toggleDeleteMember(membre)" src="../assets/icons/trash-solid.svg" v-show="!boolModal && !isSelf(membre)"
                 width=16>
        </div>
        <div class="modal is-active" v-if="boolModal" >
            <div class="modal-background" @click="toggleDeleteMember"></div>
            <div class="modal-card">
                <div class=modal-card-head>Suppresion de membre</div>
                <div class="modal-card-body">
                    Voulez-vous vraiment supprimer <b>{{memberToDelete.fullname}}</b> ?

                <button type=button @click="deleteMember">Oui</button>
                <button type=button @click="toggleDeleteMember">Non</button>
                </div>
            </div>
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
                if(this.memberToDelete.id!==this.$store.state.membre.id) {
                    axios.delete('members/' + this.memberToDelete.id).then(response => {
                        console.log(response.data);
                    }).catch(error => {
                        console.log(error.response.data.message);
                    })
                }
            },
            isSelf: function(member){
                return member.id === this.$store.state.membre.id;
            }
        },
    }
</script>

<style scoped>

</style>
