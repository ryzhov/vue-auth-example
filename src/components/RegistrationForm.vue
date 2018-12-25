<template>
    <form v-bind:name="name" method="post" @submit.prevent="onSubmit">
        <InputField type="email" name="Email" autocomplete="email" v-model="email" icon="envelope" />
        <InputField type="password" name="Password" autocomplete="new-password" v-model="password" icon="key" />

        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button class="button is-primary" type="submit"><strong>Sign up</strong></button>
            </div>
            <div class="control">
                <button class="button is-light" type="reset">Cancel</button>
            </div>
        </div>
    </form>
</template>

<script>
    import InputField from '@/components/InputField';

    export default {
        name: "RegistrationForm",
        components: {
            InputField
        },
        props: {
            name: String
        },
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            onSubmit() {
                this.$log.debug(`onSubmit:: email => ${this.email}, password => ${this.password}`);
            }
        }
    }
</script>

<style scoped>
</style>
