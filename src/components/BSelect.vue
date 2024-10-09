<template src="./BSelect.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BSelect",
    props: {
        value: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [{ code: "", value: "select" }],
        },
    },
    emits:["update:value"],
    methods: {
        onChangeSelect(event: any){
            this.$emit("update:value", event.target.value);
        }
    }
})

</script>