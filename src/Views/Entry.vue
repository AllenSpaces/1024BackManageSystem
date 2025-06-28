<script setup lang="ts">
import Tab from './Tab/Tab.vue';
import EntryContent from './EntryContent/EntryContent.vue';
</script>

<template>
  <div class="entry">
    <div class="tab">
      <Tab />
    </div>
    <div class="entry-content">
      <EntryContent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entry {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;

  .tab {
    width: 14%;
    height: 100%;
    background-color: rgba($color: #252525, $alpha: 0.49);
    border-radius: 8px;
    margin-right: 15px;
  }

  .entry-content {
    flex: 1;
    border-radius: 8px;
  }
}
</style>