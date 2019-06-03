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
                .then(username => {
                    const {$log: {debug}} = this;
                    debug(`logout: ${username} success`);
                })
                .catch(message => {
                    const {$log: {error}} = this;
                    error(`message: ${message}`);
                })
                .finally(() => {
                    const {$router} = this;
                    $router.push('/');
                })
            ;
        }
    };
</script>
