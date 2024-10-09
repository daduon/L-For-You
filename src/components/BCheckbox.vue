<template src="./BCheckbox.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BCheckbox",
    props: {
        value:{
            type: Boolean,
            default: false
        }
    },
    emits:["update:value"],
    methods: {
        onChangeCheckbox(event: any){
            this.$emit("update:value", event.target.value);
        }
    }
})

</script>