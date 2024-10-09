<template src="./BRadio.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BRadio",
    props: {
        value: {
            type: Boolean,
            default: false,
        }
    },
    emits:["update:value"],
    methods: {
        onChangeRadio(event: any){
            this.$emit("update:value", event.target.value);
        }
    }
})

</script>