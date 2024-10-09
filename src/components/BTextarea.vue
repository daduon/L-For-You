<template src="./BTextarea.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"BTextarea",
    props: {
        value: {
            type: String,
            default: "",
        }
    },
    emits: ["update:value"],
    methods: {
        onInput(event: any) {
            this.$emit("update:value", event.target.value);
        }
    }
})

</script>