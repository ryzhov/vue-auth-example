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
                <button class="button is-light" type="reset">Cancel</button>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';
    import InputField from '@/components/InputField';
    import { LOGIN } from "@/store/auth";

    export default {
        name: "LoginForm",
        components: {
            InputField
        },
        provide() {
            return {
                formName: this.name
            };
        },
        props: {
            name: { type: String, required: true },
        },
        data() {
            return {
                email: '',
                password: '',
                violations: [],
                mutation: false,
            }
        },
        filters: {
            getByProperty(violations, property) {
                let result = [];

                violations.forEach(violation => {
                    if (undefined !== violation.property_path && property === violation.property_path) {
                        result.push(violation);
                    }
                });

                return result;
             }
        },
        computed: {
            readyForSubmit() {
                return !this.mutation && 0 === this.violations.length;
            },
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
            onResetViolations(name) {
                this.violations = this.violations.filter(
                    violation => undefined !== violation.property_path && name !== violation.property_path
                );
            }
        }
    }
</script>

