<template>
    <div class="home column is-three-fifths is-offset-one-fifth content">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from '@/components/HelloWorld.vue';

    export default {
        name: 'Home',
        components: {
            HelloWorld
        }
    }
</script>
