<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { eventBus } from '../../Utils/EventBus';
import Home from '../Home/Home.vue';
import DashBoard from '../DashBoard/DashBoard.vue';
import Project from '../Project/Project.vue';
import Staff from '../Staff/Staff.vue';
import Finance from '../Finance/Finance.vue';
import Video from '../Video/Video.vue';
import { motion } from 'motion-v';

const tabName = ref<string>('');
const projectId = ref<string>('');

onMounted(() => {
  eventBus.on("changeTab", (tab) => {
    projectId.value = ''
    tabName.value = tab;
  })

  eventBus.on("changeProject", (project) => {
    console.log("changeProject", project)
    tabName.value = ''
    projectId.value = project;
  })

  tabName.value = 'Home';
})
</script>


<template>
    <motion.div
        class="entry-content"
        :key="tabName"
        :initial="{ x: 10, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :exit="{ x: -10, opacity: 0 }"
        :transition="{ duration: 0.7, ease: 'easeInOut' }"
        v-if="tabName"
    >
        <Home v-if="tabName == 'Home'" />
        <Staff v-else-if="tabName == 'Staff'" />
        <Finance v-else-if="tabName == 'Finance'" />
        <Video v-else-if="tabName == 'Video'" />
        <DashBoard v-else-if="tabName == 'DashBoard'" />
    </motion.div>
    <motion.div
        class="entry-content"
        :key="projectId"
        :initial="{ x: 10, opacity: 0 }"
        :animate="{ x: 0, opacity: 1 }"
        :exit="{ x: -10, opacity: 0 }"
        :transition="{ duration: 0.7, ease: 'easeInOut' }"
        v-if="projectId"
    >
        <Project v-if="projectId" :projectId="projectId" />
    </motion.div>
</template>

<style scoped>
.entry-content {
  width: 100%;
  height: 100%;
}
</style>