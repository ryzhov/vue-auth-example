<template>
    <div class="user">
        <div v-if="isAuthenticated">
            <strong>Hello, {{ username }}!</strong>
        </div>
        <div v-else>
           <strong>Welcome, guest!</strong>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "User",
        computed: {
            ...mapGetters('auth', ['isAuthenticated', 'username'])
        },
    };
</script>

