<template src="./BInput.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"BInput",
    inject: ["formItem"],
    props: {
        value: {
            type: [String, Number],
            default: "",
        },

        pattern: {
            type: String,
            default: "",
        },
    },

    emits: ["update:value"],

    data() {
        return {
            // 
        };
    },

    computed: {
        formattedValue(): any {
            if (!this.pattern) {
                return this.value; 
            }
            const formatted = this.value;
            return formatted;
        },
    },

    methods: {
        onInput(event: any) {
            this.$emit("update:value", event.target.value);
        },
    }
})

</script>