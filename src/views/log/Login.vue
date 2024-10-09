<template src="./Login.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import UT from '@/shared/utils/ut';
import BCheckboxGroup from '@/components/BCheckboxGroup.vue';

export default defineComponent({
    name: "Login",
    components: { BCheckboxGroup },
    data() {
        return {
            email: "",
            password: ""
        }
    },

    mounted() {
        UT.setValidate(this, {
            email: {
                conditions: [
                    {
                        check: () => {
                            return this.email == "";
                        },
                        message: "Email is invalid.",
                    },
                ],
            },
        });
    },

    methods: {

        onClickSubmit(){
            const validate = UT.getValidate(this);

            if (!validate) {
                return;
            }
        }
    }
});
</script>