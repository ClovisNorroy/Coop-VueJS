<template>
    <div class="listeMessages">

        <div class="message is-small" v-for="(message, index) in messages" v-if="messages.length">
            <div class="message-header" v-if="boolMod">
                <router-link :to="'/listeconversations/' + message.channel_id">
                In channel : {{message.channel.label}}
                </router-link>
                <button class="delete" aria-label="delete" ></button>
            </div>


            <div class="message-header" v-if="Object.keys($store.state.listeMembres).includes(message.member_id) && !boolMod">
                <router-link :to="'/detailmembre/' + message.member_id" >
                From : {{message.memberName}} || {{message.created_at}}
                </router-link>
                <font-awesome-icon style="cursor:pointer;"icon="pen" @click="toggleEditMessage(message)"></font-awesome-icon>
                <button class="delete" aria-label="delete" v-if="message.member_id === $store.state.membre.id"
                        @click="deleteMessage(message.channel_id, message.id, index)"></button>
            </div>

            <div class="message-header" v-if="!Object.keys($store.state.listeMembres).includes(message.member_id) && !boolMod">
                From : Deleted Member || {{message.created_at}}
            </div>
            <div class="message-body">{{  message.message }}</div>
        </div>
        <poster-message v-if="channel" :messages="messages" :channel-id="channel"></poster-message>
        <!------------------------------------------------------------------------------------------------------------>
        <!---------------------------------------------------- MODAL ------------------------------------------------->
        <!------------------------------------------------------------------------------------------------------------>
        <div class="modal is-active" v-if="boolModal" >
            <div class="modal-background" @click="toggleEditMessage"></div>
            <div class="modal-card">
                <div class=modal-card-head>Modifier un message</div>
                <div class="modal-card-body">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label"></label>
                        </div>
                        <div class="field-body">
                            <div class="field is-expanded">
                                <div class="control">
                                    <input class ="input" type="text" v-model="editedMessage.message">
                                </div>
                            </div>
                        </div>
                        <div class="buttons is-centered">
                            <button class="button is-primary" type=button @click="confirmEditMessage">Envoyer</button>
                            <button class="button is-danger" type=button @click="toggleEditMessage">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PosterMessage from "./PosterMessage";
    export default {
        name: "ListeMessages",
        props: ['channel', 'messages', 'boolMod'],
        components:{
            PosterMessage
        },
        data(){
            return {
                boolModal: false,
                editedMessage: null,
                newMessage: ""
            }
        },
        methods:{
            deleteMessage(message, index){
                axios.delete("channels/"+message.channel_id+"/posts/"+message.id).then(response=> {
                    console.log(response.data);
                    this.messages.splice(index, 1);
                }).catch(error => { console.log(error.response)});
            },
            toggleEditMessage(message){
                this.boolModal = !this.boolModal;
                this.editedMessage = message;
            },
            confirmEditMessage(){
                axios.put("channels/"+this.editedMessage.channel_id+"/posts/"+this.editedMessage.id, {message: this.editedMessage.message}).then(response=> {
                    console.log(response.data);
                    this.boolModal=false;
                }).catch(error => { console.log(error.response)});
            }
        }
    }
</script>

<style scoped>

</style>
