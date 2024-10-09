<template src="./Sidebar.html"></template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "Sidebar",
        data(){
            return {
                // 
            }
        },
        
        methods: {
            goScreen(route: string){
                this.$router.push(route);
            }
        }
    });
</script>