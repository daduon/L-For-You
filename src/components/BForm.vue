<template src="./BForm.html"></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BForm",
    inject: ["formItem"],
    provide() {
        return {
            formItem: this, // Provide formItem to child components
        };
    },
    props: {
        label: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            msg: "",
        };
    },

    methods: {
        setMessage(msg: string) {
            this.msg = msg;
        },
        getMessage() {
            return this.msg || "";
        },
    },
});
</script>
