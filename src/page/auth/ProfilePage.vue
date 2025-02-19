<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/store'
import MainLayout from '@/component/layout/MainLayout.vue'

const {t} = useI18n()
const router = useRouter()
const config = useConfigStore()

const logout = () => {
  if (confirm(t('are-you-sure'))) {
    router.push({name: 'login'})
  }
}
</script>

<template>
  <MainLayout>
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
        <span class="w-32">{{ $t('email') }}</span>
        <span>{{ config.email }}</span>
      </div>
    </div>
  </MainLayout>
</template>

<style>

</style>
