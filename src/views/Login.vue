<template>
    <div class="login">
        <div class="column is-4 is-offset-4">
            <h1 class="title has-text-centered">Login</h1>
            <LoginForm name="login"/>
        </div>
    </div>
</template>

<script>
    import LoginForm from '@/components/LoginForm.vue'

    export default {
        name: 'Login',
        components: {
            LoginForm
        }
    }
</script>
