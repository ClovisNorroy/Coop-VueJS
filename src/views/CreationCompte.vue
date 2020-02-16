<template>
    <div>
        <div class="column is-half  is-offset-one-quarter">
            <div class="field">
                <label class="label">Fullname</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Your Fullname" v-model="fullname">
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" placeholder="Account Email" v-model="email">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="Account Password" v-model.lazy="password">
                </div>
            </div>
            <div class="field is-centered">
                <button class="button is-primary is-rounded" @click="validateForm">Register</button>
            </div>
        </div>
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
