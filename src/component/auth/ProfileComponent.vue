<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/store'
import { isValidEmail } from '../../helper/index.js'

const {t} = useI18n()
const router = useRouter()
const config = useConfigStore()
const loading = ref(false)

const logout = () => {
  if (confirm(t('are-you-sure'))) {
    router.push({name: 'login'})
  }
}
</script>

<template>
  <div>
    <div class="max-w-screen-sm card flex flex-col align-center mx-auto gap-8">
      <div class="flex justify-between items-start">
        <Avatar icon="pi pi-user" size="xlarge" />
        <Button icon="pi pi-sign-out" :label="$t('logout')" @click="logout" outlined severity="secondary" />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-32">{{ $t('language') }}</span>
        <Button v-for="locale in config.locales" :key="locale.key" :label="locale.name"
                @click="$i18n.locale = locale.key; config.setLocale(locale.key, false)"
                :severity="$i18n.locale === locale.key ? 'success' : 'secondary'"
                outlined :icon="$i18n.locale === locale.key ? 'pi pi-check' : ''"
                class="min-w-18 sm:min-w-32" size="small" />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-32">{{ $t('night-mode') }}</span>
        <ToggleSwitch v-model="config.darkMode" @change="config.toggleDarkMode()" />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-32">{{ $t('name') }}</span>
        <span>{{ config.lastName }} {{ config.firstName }}</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-32">{{ $t('grade') }}</span>
        <span>{{ config.grade }}-{{ config.letter }}</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-32">{{ $t('email') }}</span>
        <span>{{ isValidEmail(config.email) ? config.email : '-' }}</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-32">{{ $t('school') }}</span>
        <span>{{ config.schoolName }}</span>
      </div>
    </div>
  </div>
</template>

<style>

</style>
