<template>
    <div class="artist">
        <div>
            <strong>Artists:</strong>
        </div>
        <ul>
            <li v-for="artist in artists" :key="artist.id">
                <span> #{{ artist.id }} - "{{ artist.name }}" </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {LOAD_ARTISTS} from "@/store/art";
    import {mapActions, mapState} from 'vuex';

    export default {
        name: 'Artist',
        created() {
            console.log(`artist::created route.fullPath => ${this.$route.fullPath}`);

            this[LOAD_ARTISTS]().then(count => {
                console.log(`artist::load count => ${count}`);
            });
        },

        methods: {
            ...mapActions('art', [LOAD_ARTISTS]),
        },

        computed: {
            ...mapState('art', {
                artists: state => state.artists,
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .artist {
        ul li span {
            font-size: 20px;
        }
    }
</style>