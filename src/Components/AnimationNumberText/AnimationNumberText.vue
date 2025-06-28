<script setup lang="ts">
import { RowValue, animate, useMotionValue, useTransform } from 'motion-v'
import { onUnmounted, watchEffect } from 'vue'

const AnimationNumberTextProps = defineProps({
  value: {
    type: Number,
    default: 0
  },
  style: {
    type: Object,
    default: {}
  }
})

const count = useMotionValue(0)
const rounded = useTransform(() => Math.round(count.get()))

let controls: any

watchEffect((cleanup) => {
  controls = animate(count, AnimationNumberTextProps.value, { duration: 1 })
  cleanup(() => {
    controls?.stop()
  })
})

onUnmounted(() => {
  controls?.stop()
})
</script>

<template>
  <pre class="!bg-transparent flex items-center justify-center" :style="{
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
    ...style
  }">
    <RowValue :value="rounded" />
  </pre>
</template>
