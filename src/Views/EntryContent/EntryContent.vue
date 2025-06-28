<script lang="ts" setup>
import { onMounted ,ref} from 'vue';
import { eventBus } from '../../Utils/EventBus';
import Home from '../Home/Home.vue';

const tabName = ref<string>('');
const childName = ref<string>('');

onMounted(() => {
    eventBus.on("changeTab", (tab) => {
        childName.value = ''
        tabName.value = tab;
    })

    eventBus.on("changeChild", (child) => {
        tabName.value = ''
        childName.value = child;
    })
    
    // 初始化时显示Home页面
    tabName.value = 'Home';
})
</script>


<template>
    <Home v-if="tabName == 'Home'"/>
</template>

<style lang="scss" scoped></style>