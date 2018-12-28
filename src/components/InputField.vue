<template>
    <div class="field">
        <label class="label" :for="id">{{ name }}:</label>
        <div class="control" :class="{'has-icons-left': icon}">
            <input class="input" :class="{'is-danger': hasViolations}" :type="type"
                   :id="id" required="required" :autocomplete="autocomplete" :value="value"
                   :placeholder="name" @input="onInput"/>
            <span v-if="icon" class="icon is-small is-left">
                <i :class="'fas fa-' + icon"></i>
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
        inject: ['formName'],
        props: {
            type: { type: String, required: true },
            name: { type: String, required: true },
            icon: { type: String, default: '' },
            autocomplete: { type: String, default: ''},
            value: { type: String, default: '' },
            violations: { type: Array, default: () => [] }
        },
        computed: {
            id: function () {
                return `${this.formName}_${this.name}_input`;
            },
            hasViolations: function () {
                return this.violations.length > 0;
            }
        },
        methods: {
            onInput(event) {
                this.$emit('input', event.target.value);
                this.hasViolations && this.$emit('reset-violations', this.name);
            }
        }
    }
</script>

