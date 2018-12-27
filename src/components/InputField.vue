<template>
    <div class="field">
        <label class="label" v-bind:for="inputId">{{ name }}:</label>
        <div class="control has-icons-left">
            <input class="input" v-bind:class="{ 'is-danger': hasViolations }" v-bind:type="type" v-bind:id="inputId" required="required"
                   v-bind:autocomplete="autocomplete" v-bind:value="value" v-bind:placeholder="name"
                   @input="$emit('input', $event.target.value)"/>
            <span class="icon is-small is-left">
                <i v-bind:class="iconClass"></i>
            </span>
        </div>
        <p v-for="(violation, index) in violations" v-bind:key="index" class="help is-danger">
            {{ violation.message }}
        </p>
    </div>
</template>

<script>
    export default {
        name: "InputField",
        props: {
            type: String,
            name: String,
            icon: String,
            autocomplete: String,
            value: String,
            violations: Array
        },
        computed: {
            inputId: function () {
                return `${this.name}InputField`;
            },
            iconClass: function () {
                return `fas fa-${this.icon}`;
            },
            hasViolations: function () {
                return this.violations.length > 0;
            }
        }
    }
</script>

