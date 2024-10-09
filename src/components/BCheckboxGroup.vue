<template src="./BCheckboxGroup.html"></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BCheckboxGroup",
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        options: {
            type: Array,
            default: () => [],
        },
    },

    emits: ["update:value"],

    data() {
        return {
            internalValue: [...this.value],
        };
    },

    methods: {
        updateValue() {
            this.$emit("update:value", this.internalValue);
        },
    },
});
</script>