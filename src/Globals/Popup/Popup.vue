<template>
    <div class="popcontainer">
        <div v-show="visible" @click.self="closePopup()"
            :style="{ zIndex: (style?.zIndex ?? 1000), position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(24, 24, 24, 0.52)', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <div class="main" :style="{
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue"
import { CloseBold } from "@element-plus/icons-vue"

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
