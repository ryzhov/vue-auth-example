<template>
    <form :name="name" method="post" @submit.prevent="onSubmit" @reset="onReset">
        <InputField type="email" name="email" autocomplete="email" v-model="email"
                    :violations="violations | getByProperty('email')" icon="envelope"
                    @reset-violations="onResetViolations" />
        <InputField type="password" name="password" autocomplete="new-password" v-model="password"
                    :violations="violations | getByProperty('password')" icon="key"
                    @reset-violations="onResetViolations" />

        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button class="button is-primary" type="submit" :disabled="!readyForSubmit">
                    <strong>Sign up</strong>
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
    import { REGISTER } from "@/store/auth";

    export default {
        name: "RegistrationForm",
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
            ...mapActions('auth', [REGISTER]),
            onSubmit() {
                const {email, password, $log: {debug}, $router} = this;
                debug(`onSubmit:: email => ${email}, password => ${password}`);
                this.mutation = true;
                this[REGISTER]({email, password})
                    .then(user => {
                        debug(`registration: user "${user.email}" registered.`);
                        $router.push('/');
                    })
                    .catch(violations => {
                        debug(`violations: ${violations.length} total`);
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
        },
    };
</script>

