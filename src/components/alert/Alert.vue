<template src="./Alert.html"></template>

<script lang="ts">
import { defineComponent } from "vue";
import { POPUP } from "../../shared/utils";

export default defineComponent({
    name: "Alert",
    methods: {
        onClickBtnClose(){
            POPUP.closePopupCancel(this, {});
        },

        onClickBtnOk(){
            POPUP.closePopup(this, {});
        }
    }
});
</script>