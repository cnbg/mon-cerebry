<script setup>
import { windowTo } from '@/helper'

setTimeout(function () {
  windowTo('/')
}, 10000)
</script>

<template>
  <div class="flex items-center justify-center flex-col gap-5 h-full min-h-32 p-2 text-center">
    <div class="uppercase">{{ $t('server-not-responding') }}</div>
    <Button outlined severity="contrast" @click="windowTo('/')">
      <div class="flex items-center gap-3 p-1">
        <i class="pi pi-spin pi-spinner"></i>
        <span>{{ $t('try-again') }}</span>
      </div>
    </Button>
  </div>
</template>
