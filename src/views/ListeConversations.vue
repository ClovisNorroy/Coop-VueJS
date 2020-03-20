<template>
    <div id="listeConversations">
        <div class="columns Container" >

            <div class="column is-one-third bordered Left">
                <h2 class="title is-4">Liste des conversations</h2>
                <div class="box" v-if="listeConversations.length" v-for="channel in listeConversations"
                     @click="setChannel(channel.id); selected = channel" v-bind:class="{selected: selected === channel}">
                    <strong>{{  channel.label }}</strong>
                    <p>{{channel.topic}}</p>
                </div>
            </div>
            <div class="column Right">
                <liste-messages :channel="currentChannel" :messages="listeMessages"></liste-messages>
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
                selected: null
            }
        },
        methods:{
            changeColor: function(event){
                console.log(event);
                event.target
            },
            setChannel: function(channelId){
                axios.get('channels/'+channelId+'/posts').then(response=>{
                    this.listeMessages = response.data.reverse();
                    this.currentChannel=channelId;
                    this.listeMessages.map(message=>{
                        message.memberName = this.$store.state.memberIdToFullname[message.member_id];
                    });
                }).catch(error=>{
                    alert(error.response.data.message)
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
        background-color: green !important;
    }
</style>
