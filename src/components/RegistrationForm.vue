<template>
    <form name="registration" method="post">
        <div class="field">
            <label class="label" for="emailInputRegistration">Email:</label>
            <div class="control has-icons-left has-icon-right">
                <input class="input" type="email" id="emailInputRegistration" v-model="email" placeholder="Email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label class="label" for="passwordInputRegistration">Password:</label>
            <div class="control has-icons-left has-icon-right">
                <input class="input" type="password" id="passwordInputRegistration" v-model="password" placeholder="Password">
                <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
            </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
            <p class="control">
                <button class="button is-primary" type="submit">
                    <strong>Sign up</strong>
                </button>
            </p>
        </div>
    </form>
</template>

<script>
    export default {
        name: "RegistrationForm",
        data: function () {
            return {
                email: '',
                password: ''
            }
        }
    }
</script>

<style scoped>
    p.control {
        margin-top: 20px;
    }
</style>
