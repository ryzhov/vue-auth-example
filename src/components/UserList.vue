<template>
    <div class="users">
        <table>
            <tr>
                <th>#Id</th>
                <th>Email</th>
                <th>Password</th>
            </tr>
            <tr v-for="user in users" v-bind:key="user.id">
                <td><strong>{{ user.id }}</strong></td>
                <td><span>{{ user.email }}</span></td>
                <td><span>{{ user.password }}</span></td>
            </tr>
        </table>
        <div>Total: <strong>{{ usersCount }}</strong> users</div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "UserList",
        computed: {
            ...mapGetters([
                'users',
                'usersCount'
            ])
        }
    }
</script>

<style scoped>
</style>