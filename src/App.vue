<template>
    <div id="app" class="container">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img src="./assets/logo.png" width="32" height="32">
                </a>
                <a role="button" class="navbar-burger burger" v-on:click="toggle" aria-label="menu"
                   aria-expanded="false" data-target="navbarMain">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarMain" class="navbar-menu">
                <div class="navbar-start">
                    <router-link exact activeClass="is-active" class="navbar-item" to="/">Home</router-link>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons" v-if="isAuthenticated">
                            <router-link exact activeClass="is-active" class="button is-light" to="/logout">
                                <strong>Log out</strong>
                            </router-link>
                        </div>
                        <div class="buttons" v-else>
                            <router-link exact activeClass="is-active" class="button is-primary" to="/registration">
                                <strong>Sign up</strong>
                            </router-link>
                            <router-link exact activeClass="is-active" class="button is-light" to="/login">
                                Log in
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'App',
        computed: {
            ...mapGetters('auth', ['isAuthenticated', 'user'])
        },
        methods: {
            toggle: event => {
                const {target} = event.target.dataset;

                if (undefined !== target) {
                    event.target.classList.toggle('is-active');
                    document.getElementById(target).classList.toggle('is-active');
                }
            }
        },
        created() {
            this.$log.debug('App created');
        }
    };
</script>

<style scoped>
    .navbar-burger span {
        pointer-events: none;
    }
</style>
