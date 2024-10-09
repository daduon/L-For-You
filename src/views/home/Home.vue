<template src="./Home.html"></template>

<script lang="ts">
import { defineComponent } from "vue";
import { POPUP } from "../../shared/utils";

export default defineComponent({
    name: "Home",
    data(){
        return {
            // 
        }
    },

    methods: {
        onClickBtnCancel(){
            POPUP.closePopupCancel(this,{});
        }
    }
});

</script>