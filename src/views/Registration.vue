<template>
    <div class="registration">
        <div class="column is-4 is-offset-4">
            <h1 class="title has-text-centered">Registration</h1>
            <RegistrationForm name="registration"/>
        </div>
    </div>
</template>

<script>
    import RegistrationForm from '@/components/RegistrationForm.vue'

    export default {
        name: 'Registration',
        components: {
            RegistrationForm
        }
    }
</script>
