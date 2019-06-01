<template>
    <form :name="name" method="post" @submit.prevent="onSubmit" @reset="onReset">
        <Notification :message="message" @reset-notify="onResetNotify"/>
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
    import Notification from "@/components/Notification";
    import { REGISTER } from "@/store/auth";

    export default {
        name: "RegistrationForm",
        mixins: [FormMixin],
        components: {
            Notification,
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
                const {email, password, $log: {debug, error}, $router} = this;
                debug(`onSubmit:: email => ${email}, password => ${password}`);
                this.mutation = true;
                this[REGISTER]({email, password})
                    .then(user => {
                        debug(`registration: user "${user.email}" registered.`);
                        $router.push('/');
                    })
                    .catch(({message, violations}) => {
                        error(`violations: ${violations.length} total, message: ${message}`);
                        this.violations = violations;
                        this.message = message;
                    }).finally(() => {
                        this.mutation = false;
                    })
                ;
            },
            onReset() {
                this.violations = [];
                this.message = this.email = this.password = '';
            },
        },
    };
</script>

