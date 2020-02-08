<template>
    <div>
        <div class="errors" v-if="errors.length">ERRORS</div>

        Fullname :  <input type="text" v-model="fullname" id="fullname" required/><br/>
        Email :     <input type="email"  v-model="email" required><br/>
        Password :  <input type="password" v-model.lazy="password" required><br/>
        <button type="button" @click="validateForm">Register</button>
    </div>
</template>

<script>
    export default {
        name: "CreationCompte",
        data() {
            return {
                errors: [],
                fullname: null,
                email: null,
                password: null,
            }
        },
        methods : {
            validateForm: function () {
                this.errors = [];
                if (!this.fullname) {
                    this.errors.push("fullname");
                }
                if (this.email) {
                    if (!this.validateEmail(this.email))
                        this.errors.push("format");
                } else {
                    this.errors.push("email");
                }
                if (!this.password) {
                    this.errors.push("password");
                }
                if (!this.errors.length) {
                    this.register();
                }
            },
            validateEmail: function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            register: function () {
                axios.post('members', {
                    fullname: this.fullname,
                    email: this.email,
                    password: this.password
                }).then((response) => {
                    this.$router.push('/connexion');
                }).catch(error => { console.log(error.response)});
            }
        }
    }
</script>

<style scoped>

</style>
