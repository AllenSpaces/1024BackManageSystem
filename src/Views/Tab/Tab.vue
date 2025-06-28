<script lang="ts" setup>
import "./Tab.scss"
import { onMounted, ref, markRaw, nextTick } from 'vue';
import { Motion } from 'motion-v';
import { House, Folder, User, Money, VideoCamera, DataBoard } from '@element-plus/icons-vue';
import { eventBus } from '../../Utils/EventBus';
import { permissionBgColor, projectStatusColor } from "./Config";
import AnimationNumberText from "../../Components/AnimationNumberText/AnimationNumberText.vue";

const tabList = ref<TabItem[]>([
    {
        title: 'Home',
        fold: false,
        icon: markRaw(House),
        children: []
    },
    {
        title: 'Project',
        fold: true,
        icon: markRaw(Folder),
        children: [
            {
                title: 'Project 1',
                status: 'In Progress'
            },
            {
                title: 'Project 2',
                status: 'Pending'
            },
            {
                title: 'Project 3',
                status: 'Checking'
            }
        ]
    },
    {
        title: 'Staff',
        fold: false,
        icon: markRaw(User),
        children: []
    },
    {
        title: 'Finance',
        fold: false,
        icon: markRaw(Money),
        children: []
    },
    {
        title: 'Video',
        fold: false,
        icon: markRaw(VideoCamera),
        children: []
    },
    {
        title: 'DashBoard',
        fold: false,
        icon: markRaw(DataBoard),
        children: []
    },
]);

const selectedTab = ref<string>('Home');
const selectedChild = ref<string>('');

const addingChildMap = ref<Record<string, boolean>>({});
const newChildNameMap = ref<Record<string, string>>({});

const inputRefs = ref<Record<string, HTMLInputElement | null>>({});

const toggleFold = (tab: TabItem) => {
    if (tab.children.length > 0) {
        tab.fold = !tab.fold;
    }
};

const selectTab = (title: string) => {
    if (title == "Project") return;
    selectedTab.value = title;
    selectedChild.value = '';
    eventBus.emit("changeTab", title)
};

const selectChild = (childTitle: string) => {
    selectedTab.value = ''
    selectedChild.value = childTitle;
    eventBus.emit("changeChild", childTitle)
};

const showAddChildInput = (tab: TabItem) => {
    addingChildMap.value[tab.title] = true;
    newChildNameMap.value[tab.title] = '';
    nextTick(() => {
        if (inputRefs.value[tab.title]) {
            inputRefs.value[tab.title]?.focus();
        }
    });
};

const handleAddChildInput = (tab: TabItem) => {
    const name = newChildNameMap.value[tab.title]?.trim();
    if (name) {
        tab.children.push({
            title: name,
            status: 'In Progress'
        });
        addingChildMap.value[tab.title] = false;
        newChildNameMap.value[tab.title] = '';
    }
};

const cancelAddChild = (tab: TabItem) => {
    addingChildMap.value[tab.title] = false;
    newChildNameMap.value[tab.title] = '';
};

onMounted(() => {
    eventBus.emit("changeTab", selectedTab.value);
    eventBus.emit("changeChild", selectedChild.value)
});
</script>

<template>
    <div class="tab-container">
        <div class="tab-head">
            <div class="logo">
                <img src="" alt="">
            </div>
            <span>壹零贰肆</span>
            <div class="permission"
                :style="{ backgroundColor: permissionBgColor.Super.bg, display: 'flex', justifyContent: 'center', alignContent: 'center', padding: '4px 6px', borderRadius: '5px' }">
                <span :style="{ color: permissionBgColor.Super.text, fontSize: '12px' }">Super</span>
            </div>
        </div>
        <div class="tab-list">
            <div v-for="tab in tabList" :key="tab.title" class="tab-item"
                :class="{ 'active': selectedTab === tab.title && tab.title !== 'Project', 'has-children': tab.children.length > 0 }"
                @click="selectTab(tab.title)">
                <Motion :initial="{ opacity: 0, x: -20 }" :animate="{ opacity: 1, x: 0 }"
                    :transition="{ duration: 0.3, delay: tabList.indexOf(tab) * 0.1 }" class="tab-content">
                    <div class="tab-header">
                        <span class="tab-icon">
                            <component :is="tab.icon" />
                        </span>
                        <span class="tab-title">{{ tab.title }}</span>
                        <div v-if="tab.children.length > 0" class="fold-icon" :class="{ 'folded': tab.fold }"
                            @click.stop="toggleFold(tab)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2.2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <Motion v-if="tab.children.length > 0" :initial="{ height: 0, opacity: 0, padding: 0 }"
                        :animate="{ height: tab.fold ? 0 : 'auto', opacity: tab.fold ? 0 : 1, padding: tab.fold ? 0 : 8 }"
                        :transition="{ duration: 0.3, ease: 'easeInOut' }" class="children-container">
                        <div class="children-list">
                            <div v-for="child in tab.children" :key="child.title" class="child-item"
                                :class="{ 'active': selectedChild === child.title }"
                                @click.stop="selectChild(child.title)">
                                <Motion :initial="{ opacity: 0, x: -10 }" :animate="{ opacity: 1, x: 0 }"
                                    :transition="{ duration: 0.2, delay: tab.children.indexOf(child) * 0.05 }"
                                    class="child-content">
                                    <span class="child-title">{{
                                        child.title }}</span>
                                    <div class="status-dot"
                                        :style="{ backgroundColor: projectStatusColor[child.status as keyof typeof projectStatusColor] }"
                                        :title="child.status"></div>
                                </Motion>
                            </div>
                            <div v-if="tab.title.startsWith('Project')">
                                <Motion v-if="!addingChildMap[tab.title]" :initial="{ opacity: 0, y: -5 }"
                                    :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -5 }"
                                    :transition="{ duration: 0.2 }" class="child-item add-child"
                                    @click.stop="showAddChildInput(tab)">
                                    <span class="child-title">+ Add New Project</span>
                                </Motion>
                                <Motion v-else :initial="{ opacity: 0, y: -5 }" :animate="{ opacity: 1, y: 0 }"
                                    :exit="{ opacity: 0, y: -5 }" class="child-item add-child-input"
                                    :transition="{ duration: 0.2 }">
                                    <input v-model="newChildNameMap[tab.title]"
                                        @keyup.enter="() => handleAddChildInput(tab)"
                                        @keyup.esc="() => cancelAddChild(tab)" class="add-child-input-box"
                                        @blur="cancelAddChild(tab)" placeholder="输入项目名称，回车确认"
                                        :ref="el => inputRefs[tab.title] = el as HTMLInputElement" />
                                </Motion>
                            </div>
                        </div>
                    </Motion>
                </Motion>
            </div>
        </div>
        <div class="tab-foot">
            <AnimationNumberText :value="100" style="font-size: 14px; color: #fff; margin-right: 10px;" />
        </div>
    </div>
</template>