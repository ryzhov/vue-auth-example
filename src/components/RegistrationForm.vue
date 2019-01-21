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
                <button class="button is-primary" type="submit"><strong>Sign up</strong></button>
            </div>
            <div class="control">
                <button class="button is-light" type="reset">Cancel</button>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';
    import InputField from '@/components/InputField';
    import { REGISTER } from "@/store/auth";

    export default {
        name: "RegistrationForm",
        components: {
            InputField
        },
        provide: function () {
            return {
                formName: this.name
            };
        },
        props: {
            name: String
        },
        data: function () {
            return {
                email: '',
                password: '',
                violations: []
            }
        },
        filters: {
            getByProperty: function (violations, property) {
                let result = [];

                violations.forEach(violation => {
                    if (undefined !== violation.property_path && property === violation.property_path) {
                        result.push(violation);
                    }
                });

                return result;
             }
        },
        methods: {
            ...mapActions('auth', [REGISTER]),
            onSubmit() {
                const {email, password} = this;
                this.$log.debug(`onSubmit:: email => ${email}, password => ${password}`);
                this[REGISTER]({email, password})
                    .then(user => {
                        this.$log.debug(`registration: user "${user.email}" registered.`);
                        this.$router.push('/');
                    })
                    .catch(violations => {
                        this.$log.debug(`violations: ${violations.length} total`);
                        this.violations = violations;
                    });
            },
            onReset() {
                this.violations = [];
                this.email = this.password = '';
            },
            onResetViolations(name) {
                this.violations = this.violations.filter(
                    violation => undefined !== violation.property_path && name !== violation.property_path
                );
            }
        }
    }
</script>

