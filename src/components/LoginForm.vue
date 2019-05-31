<template>
    <form :name="name" method="post" @submit.prevent="onSubmit" @reset="onReset">
        <InputField type="email" name="email" autocomplete="email" v-model="email"
                    :violations="violations | getByProperty('email')" icon="envelope"
                    @reset-violations="onResetViolations" />
        <InputField type="password" name="password" autocomplete="password" v-model="password"
                    :violations="violations | getByProperty('password')" icon="key"
                    @reset-violations="onResetViolations" />

        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button class="button is-primary" type="submit" :disabled="!readyForSubmit">
                    <strong>Login</strong>
                </button>
            </div>
            <div class="control">
                <button class="button is-light" type="reset">Reset</button>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';
    import FormMixin from "@/components/FormMixin";
    import InputField from '@/components/InputField';
    import { LOGIN } from "@/store/auth";

    export default {
        name: "LoginForm",
        mixins: [FormMixin],
        components: {
            InputField
        },
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            ...mapActions('auth', [LOGIN]),
            onSubmit() {
                const {email: username, password} = this;
                this.$log.debug(`onSubmit:: username => ${username}, password => ${password}`);
                this.mutation = true;
                this[LOGIN]({username, password})
                    .then(user => {
                        this.$log.debug(`login: user "${user.username}" logged in.`);
                        this.$router.push('/');
                    })
                    .catch(violations => {
                        this.$log.debug(`violations: ${violations.length} total`);
                        this.violations = violations;
                    }).finally(() => {
                        this.mutation = false;
                    })
                ;
            },
            onReset() {
                this.violations = [];
                this.email = this.password = '';
            },
        }
    };
</script>

