<template>
    <div class="home column is-three-fifths is-offset-one-fifth content">
        <User />
    </div>
</template>

<script>
    import User from '@/components/User';

    export default {
        name: 'Home',
        components: {User},
    }
</script>
