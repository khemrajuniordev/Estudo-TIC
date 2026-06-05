<template>
  <router-view />
  <Toast position="top-right" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from 'primevue/toast';

export default defineComponent({
  name: 'App',
  components: { Toast },
});
</script>
