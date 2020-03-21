<template>
    <div id="listeConversations">
        <div class="columns Container" >

            <div class="column is-one-third bordered Left">
                <h2 class="title is-4">Liste des conversations</h2>
                <div class="box" v-if="listeConversations.length" v-for="channel in listeConversations"
                     @click="setChannel(channel); selected = channel" v-bind:class="{selected: selected === channel}">
                    <article class="media">
                    <div class="media-left">
                        <a><img @click="toggleModal('delete')" src="../assets/icons/trash-solid.svg" width=16></a>
                        <br>
                        <a style="color: black !important"><font-awesome-icon icon="pen" @click="toggleModal('edit', channel) "></font-awesome-icon></a>
                    </div>
                    <div class="media-content">
                    <strong>{{channel.label}}</strong>
                    <p>{{channel.topic}}</p>
                    </div>
                    </article>
                </div>
                <div class="buttons is-centered">
                    <button class="button is-primary" @click="toggleModal('create')">Créer Conversation</button>
                </div>
            </div>
            <div class="column Right">
                <liste-messages v-if="currentChannel" :channel="currentChannel.id" :messages="listeMessages"></liste-messages>
            </div>
        </div>
        <!------------------------------------------------------------------------------------------------------------>
        <!---------------------------------------------------- MODAL ------------------------------------------------->
        <!------------------------------------------------------------------------------------------------------------>
        <div class="modal is-active" v-if="boolModal" >
            <div class="modal-background" @click="boolModal=false"></div>
            <div class="modal-card">
                <div class=modal-card-head>{{headerModal}}</div>
                <div class="modal-card-body">
                    <p v-if="modalType === 'delete'"> Voulez-vous vraiment supprimer la conversation <b>{{currentChannel.label}}</b> ?</p>
                        <div class="field is-horizontal" v-show="modalType === 'create' || modalType === 'edit'">
                            <div class="field-label is-normal">
                            <label class="label">Nom</label>
                            </div>
                            <div class="field-body">
                                <div class="field is-expanded">
                                    <div class="control">
                                        <input class="input" v-model="channelLabel" type="text" placeholder="Nom de la conversation">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="field is-horizontal" v-show="modalType === 'create' || modalType === 'edit'">
                            <div class="field-label is-normal">
                                <label class="label">Topic</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="text" v-model="channelTopic" placeholder="Topic de la conversation">
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="buttons is-centered">
                    <button class="button is-primary" v-show="modalType === 'create'" type=button @click="createChannel">Créer</button>
                    <button class="button is-primary" v-show="modalType === 'edit'" type=button @click="editChannel">Éditer</button>
                    <button class="button is-primary" v-show="modalType === 'delete'" type=button @click="deleteChannel">Oui</button>
                    <button class="button is-danger" type=button @click="boolModal=false">Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListeMessages from "../components/ListeMessages";
    export default {
        components:{
          ListeMessages,
        },
        name: "ListeConversations",
        data(){
            return {
                listeConversations: [],
                listeMessages: [],
                currentChannel: null,
                selected: null,
                boolModal: false,
                headerModal: "",
                modalType: "",
                channelTopic: "",
                channelLabel: ""
            }
        },
        methods:{
            setChannel: function(channel){
                console.log(channel);
                axios.get('channels/'+channel.id+'/posts').then(response=>{
                    this.listeMessages = response.data.reverse();
                    this.currentChannel=channel;
                    this.listeMessages.map(message=>{
                        message.memberName = this.$store.state.memberIdToFullname[message.member_id];
                    });
                }).catch(error=>{
                    alert(error.response.data.message)
                })
            },
            toggleModal: function(mode, channel){
                switch(mode){
                    case 'create':
                        this.headerModal = "Création de conversation";
                        this.channelTopic = " ";
                        this.channelLabel = " ";
                        break;
                    case 'edit':
                        this.headerModal = "Mofification de conversation";
                        this.channelTopic = channel.topic;
                        this.channelLabel = channel.label;
                        break;
                    case 'delete':
                        this.headerModal = "Suppression de conversation";
                        break;
                }
                this.modalType = mode;
                this.boolModal = true;
            },
            deleteChannel: function(){
                axios.delete("channels/"+this.currentChannel.id).then(response=>{
                    console.log(response.data);
                    this.boolModal = false;
                }).catch(error=>{
                    alert(error.response.data.message)
                })
            },
            createChannel: function(){
                axios.post('channels',{label:this.channelLabel, topic:this.channelTopic}).then(response => {
                    this.listeConversations.push(response.data);
                    console.log(response.data);
                    this.boolModal=false;
                }).catch(error => {
                    alert(error.response.data.message);
                })
            },
            editChannel: function(){
                axios.put("channels/"+this.currentChannel, {label: this.channelLabel, topic: this.channelTopic}).then(response => {
                    console.log(response.data);
                    this.currentChannel.label = this.channelLabel;
                    this.currentChannel.topic = this.channelTopic;
                    this.boolModal=false;
                }).catch(error => {
                    alert(error.response.data.message);
                })
            }
        },
        mounted() {
            axios.get('channels').then((response)=>{
                this.listeConversations = response.data;
            }).catch(error=>{
                alert(error.response.data.message)
            });
            if(this.$route.params.channelId) {
                console.log(this.$route.params.channelId);
                this.setChannel(this.$route.params.channelId);
            }
        },
    }
</script>

<style>
    /*from https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css/*/
    .Container {
        display: flex;
        overflow: hidden;
        height: 100vh;
        margin-top: -100px;
        padding-top: 100px;
        position: relative;
        width: 100%;
        backface-visibility: hidden;
        will-change: overflow;
    }
    .Left,
    .Right {
        overflow: auto;
        height: auto;
        padding: .5rem;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }

    .bordered{
        border-right: 1px solid black;
    }
    .Container{
        padding-top: 0;
    }
    .selected{
        background-color: rgba(0, 51, 128, 0.6) !important;
    }
</style>
