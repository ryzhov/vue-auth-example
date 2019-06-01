<template>
    <div class="notification" v-if="message">
        <button class="delete" @click="$emit('reset-notify')"></button>
        {{message}}
    </div>
</template>

<script>
    export default {
        name: "Notification",
        props: {
            message: {type: String, required: true},
        },
   };
</script>

