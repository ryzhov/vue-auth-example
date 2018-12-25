<template>
    <div class="home column is-three-fifths is-offset-one-fifth content">
        <h1 class="title has-text-centered">User list:</h1>
        <UserList />
    </div>
</template>

<script>
    import UserList from '@/components/UserList';

    export default {
        name: 'Home',
        components: {
            UserList
        }
    }
</script>
