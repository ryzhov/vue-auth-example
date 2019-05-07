<template>
    <div class="logout content">
        <p v-for="(violation, index) in violations" v-bind:key="index" class="help is-danger">
            {{ violation.message }}
        </p>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { LOGOUT } from "../store/auth";

    export default {
        name: 'Logout',
        data: function () {
            return {
                violations: []
            };
        },
        methods: {
            ...mapActions('auth', [
                LOGOUT
            ])
        },
        created: function () {
            this[LOGOUT]()
                .then(user => {
                    this.$log.debug(`logout: ${user.email} success`);
                    this.$router.push('/');
                })
                .catch(violations => {
                    this.$log.debug(`violations: ${violations.length} total`);
                    this.violations = violations;
                });
        }
    }
</script>
