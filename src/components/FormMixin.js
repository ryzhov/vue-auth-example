
export default {

    props: {
        name: { type: String, required: true },
    },

    provide() {
        return {
            formName: this.name
        };
    },

    data() {
        return {
            violations: [],
            mutation: false,
        };
    },

    computed: {
        readyForSubmit() {
            return !this.mutation && 0 === this.violations.length;
        },
    },

    filters: {
        getByProperty(violations, property) {
            return violations.filter(violation => property === violation.propertyPath);
        }
    },

    methods: {
        onResetViolations(name) {
            this.violations = this.violations.filter(violation => name !== violation.propertyPath);
        }
    },
};