<template>
    <div class="logout content">
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { LOGOUT } from "../store/auth";

    export default {
        name: 'Logout',
        methods: {
            ...mapActions('auth', [LOGOUT])
        },
        created() {
            this[LOGOUT]()
                .then(user => {
                    const {$log: {debug}} = this;
                    debug(`logout: ${user.email} success`);
                })
                .catch(message => {
                    const {$log: {error}} = this;
                    error(`Error: ${message}`);
                })
                .finally(() => {
                    const {$router} = this;
                    $router.push('/');
                })
            ;
        }
    };
</script>
