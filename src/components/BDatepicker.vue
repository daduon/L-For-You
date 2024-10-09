<template src="./BDatePicker.html"></template>

<script lang="ts">
import { defineComponent } from "vue";
import { DATE } from "../shared/utils";

export default defineComponent({
    name:"BDatePicker",
    props: {
        value: {
            type: String,
            default: "",
        }
    },
    emits: ["update:value"],
    computed: {
        formateDate(){
            return DATE.setDateFormat(this.value, "YYYY-MM-DD");
        }
    },
    methods: {
        onChangeDatePicker(event: any) {
            const target = event.target as HTMLInputElement;
            const selectedDate = target.value; 
            this.$emit("update:value", DATE.getDateFormatToString(selectedDate));
        }
    }
})

</script>