<script lang="ts" setup>
import { onMounted, ref, markRaw, nextTick } from 'vue';
import { Motion } from 'motion-v';
import { House, Folder, User, Money, VideoCamera, DataBoard } from '@element-plus/icons-vue';
import { eventBus } from '../../Utils/EventBus';

interface TabChild {
    title: string;
    status: string;
}

interface TabItem {
    title: string;
    fold: boolean;
    icon: any;
    children: TabChild[];
}

interface PSC {
    "In Progress": string;
    "Pending": string;
    "Checking": string;
}

interface PBC {
    Super: PBCC;
    Develop: PBCC;
    HR: PBCC
}

interface PBCC {
    bg: string;
    text: string;
}

const projectStatusColor: PSC = {
    "In Progress": "#c299fc",
    "Pending": "#ffe066",
    "Checking": "#f9f871"
}

const permissionBgColor: PBC = {
    Super: {
        bg: "rgba(#FFE3CA, 0.63)",
        text: "#FFE5C9"
    },
    Develop: {
        bg: "rgba(#FFE3CA, 0.63)",
        text: "#FFE5C9"
    },
    HR: {
        bg: "rgba(#FFE3CA, 0.63)",
        text: "#FFE5C9"
    }
}

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
            <span></span>
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
                                        @keyup.esc="() => cancelAddChild(tab)"
                                        class="add-child-input-box"
                                        placeholder="输入项目名称，回车确认"
                                        :ref="el => inputRefs[tab.title] = el as HTMLInputElement" />
                                </Motion>
                            </div>
                        </div>
                    </Motion>
                </Motion>
            </div>
        </div>
        <div class="tab-foot"></div>
    </div>
</template>

<style lang="scss" scoped>
.tab-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: rgba(37, 37, 37, 0.49);

    .tab-head {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid rgba($color: #595959, $alpha: 0.4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }

    .tab-list {
        flex: 1;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .tab-item {
            background: #353535;
            border-radius: 8px;
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.10);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(.4, 0, .2, 1);
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 48px;

            .tab-content {
                width: 100%;
                display: flex;
                flex-direction: column;

                .tab-header {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 10px;
                    width: 100%;
                    min-height: 40px;

                    .tab-icon {
                        font-size: 18px;
                        color: #bdbdbd;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .tab-title {
                        font-weight: 700;
                        font-size: 12px;
                        letter-spacing: 0.5px;
                        color: #eaeaea;
                        text-shadow: 0 2px 8px #00000022;
                        flex: 1;
                        display: flex;
                        align-items: center;
                    }

                    .fold-icon {
                        color: #bdbdbd;
                        transition: transform 0.2s cubic-bezier(.4, 0, .2, 1);
                        cursor: pointer;
                        padding: 2px;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        flex-shrink: 0;

                        &.folded {
                            transform: rotate(-90deg);
                        }

                        svg {
                            display: block;
                        }
                    }
                }

                .children-container {
                    overflow: hidden;
                    margin-top: 4px;
                    width: 100%;
                    padding: 8px;
                    box-sizing: border-box;

                    .children-list {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        padding-left: 4px;

                        .child-item {
                            border-radius: 8px;
                            cursor: pointer;
                            transition: all 0.2s cubic-bezier(.4, 0, .2, 1);
                            font-size: 11px;
                            color: #eaeaea;
                            font-weight: 600;
                            text-shadow: 0 2px 8px #00000022;
                            display: flex;
                            align-items: center;
                            min-height: 28px;
                            padding: 0 6px;

                            &.active {
                                color: #ffe066;
                                text-shadow: 0 2px 8px #ffe06699;
                            }

                            .child-content {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                gap: 8px;
                                width: 100%;

                                .child-title {
                                    flex: 1;
                                    display: flex;
                                    align-items: center;
                                }

                                .status-dot {
                                    width: 5px;
                                    height: 5px;
                                    border-radius: 50%;
                                    flex-shrink: 0;
                                    box-shadow: 0 2px 8px 0 #00000033;
                                }
                            }
                        }
                    }
                }
            }

            &.active {
                .tab-content .tab-title {
                    color: #ffe066;
                    text-shadow: 0 2px 8px #ffe06699;
                }
            }
        }
    }

    .tab-foot {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
    }
}

.add-project {
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: transparent;
    border: 1px dashed #595959;
    color: #ffe066;
    margin-top: 10px;

    .add-content {
        display: flex;
        align-items: center;
        gap: 8px;

        .tab-icon {
            font-size: 18px;
            font-weight: bold;
        }

        .tab-title {
            font-size: 12px;
            font-weight: 700;
        }
    }

    &:hover {
        background: #353535;
    }
}

.add-child {
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    background: transparent;
    color: #ffe066;

    .child-title {
        font-size: 11px;
        font-weight: 700;
    }
}

.add-child-input {
    display: flex;
    align-items: center;

    .add-child-input-box {
        width: 100%;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid #595959;
        outline: none;
        background: transparent;
        color: #ffffff;
    }
}
</style>