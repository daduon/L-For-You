<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DATE } from './shared/utils';
import Dashboard from './components/dashboard/Dashboard.vue';

export default defineComponent({
  name: "App",
  components: { Dashboard },
  data() {
    return {
      // 
    }
  },
  mounted() {
    // 
  },
  methods: {
    formatDate(date: string) {
      console.log(date);
      return DATE.getDateFormatToString(date);
    }
  }
})
</script>
