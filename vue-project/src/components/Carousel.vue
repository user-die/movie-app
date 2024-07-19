<template>
  <article class="d-flex align-items-center justify-content-center gap-2 my-3">
    <button @click="x -= 600" class="btn btn-danger rounded-5">
      <Left />
    </button>

    <div ref="carousel" class="rounded-5 d-flex gap-3 overflow-hidden h400">
      <slot></slot>
    </div>

    <button @click="x += 600" class="btn btn-danger rounded-5">
      <Right />
    </button>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
import Left from '~icons/bi/caret-left-fill'
import Right from '~icons/bi/caret-right-fill'

var carousel = ref(null)

const behavior = 'smooth'
const { x } = useScroll(carousel, { behavior })
</script>
