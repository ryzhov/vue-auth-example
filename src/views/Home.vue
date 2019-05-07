<template>
    <div class="home column is-three-fifths is-offset-one-fifth content">
        <User />
        <Artist />
    </div>
</template>

<script>
    import User from '@/components/User';
    import Artist from '@/components/Artist';

    export default {
        name: 'Home',
        components: {User, Artist},
    }
</script>
