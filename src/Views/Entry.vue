<script setup lang="ts">
import Test from './Test.vue'

const openPopup = () => {
  window.$popup.open({

  }, {
    component: Test,
    props: {},
  });
}


</script>

<template>
  <div class="entry">
    <button @click="openPopup">Open Popup</button>
  </div>
</template>

<style scoped>
.entry {
  width: 100%;
  height: 100%;
}
</style>