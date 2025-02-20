<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useConfigStore } from '@/store'

const {t} = useI18n()
const toast = useToast()
const config = useConfigStore()

document.addEventListener('show-toast', function (e) {
  toast.add({
    severity: e.detail?.severity,
    summary: t(e.detail?.summary),
    detail: e.detail?.detail ? t(e.detail?.detail) : '',
    life: e.detail?.life,
  })
})

const dev = import.meta.env.DEV

onMounted(() => {
  config.syncWithServer()
})
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <Toast position="top-right" />
    <ConfirmDialog />
    <div v-if="dev" class="flex items-center gap-3 bottom-8 left-7 fixed z-50">
      <SelectButton v-model="$i18n.locale" :allow-empty="false"
                    :options="['kg', 'ru', 'en']" @change="config.setLocale($i18n.locale, false)" />
      <ToggleSwitch v-model="config.darkMode" @change="config.toggleDarkMode()" />
    </div>
  </Teleport>
</template>
