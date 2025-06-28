<template>
    <div class="popcontainer">
        <Motion v-show="visible" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
            :transition="{ duration: 0.3, ease: 'easeInOut' }" @click.self="closePopup()"
            :style="{ zIndex: (style?.zIndex ?? 1000), position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(24, 24, 24, 0.52)', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <Motion :initial="{ opacity: 0, y: 60, scale: 0.9 }" :animate="{ opacity: 1, y: 0, scale: 1 }"
                :exit="{ opacity: 0, y: 60, scale: 0.9 }" :transition="{ duration: 0.3, ease: 'easeInOut' }"
                class="main" :style="{
                    width: '80%',
                    height: '80%',
                    backgroundColor: '#36373A',
                    borderRadius: '12px',
                    padding: '20px',
                    boxSizing: 'border-box',
                    zIndex: (style?.zIndex ?? 1000) + 1,
                    ...style,
                }">
                <slot></slot>
            </Motion>
        </Motion>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue"
import { CloseBold } from "@element-plus/icons-vue"
import { Motion } from "motion-v"

const showDriverDetail = ref(false)
const propData = ref({})

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    style: Object,
    showCloseBtn: {
        type: Boolean,
        default: true,
    },
    closePopup: Function,
})
</script>

<style lang="scss" scoped>
.popcontainer {
    width: 100%;
    height: 100%;
}
</style>
