<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { toastEvent } from '@/helper'
import { useConfigStore } from '@/store'
import { demoUserInfo } from '@/store/config'
import MainLayout from '@/component/layout/MainLayout.vue'
import ProfileComponent from '@/component/auth/ProfileComponent.vue'

const config = useConfigStore()
const loading = ref(false)

const cerebry = async () => {
  loading.value = true
  await axios.get(import.meta.env.VITE_PISA_API_URL + `/cerebry/${config.user?.studentId}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': import.meta.env.VITE_PISA_API_TOKEN,
        },
      })
      .then(resp => {
        const token = resp.data?.token || ''
        if(token.startsWith('ey')) {
          window.location.replace('https://student.cerebry.co/?auth_tok=' + token)
        } else {
          toastEvent('error', 'dont-have-access', 'please-contact-your-teacher', 6000)
        }
      })
      .catch(err => {
        toastEvent('error', 'error', 'please-contact-your-teacher', 4000)
      })
      .finally(() => loading.value = false)
}
</script>

<template>
  <MainLayout>
    <Message severity="warn"
              v-if="config.pin === demoUserInfo.info?.pin"
             class="max-w-screen-sm card flex flex-col align-center mx-auto gap-8 mt-1 mb-5">
      {{ $t('demo-mode') }}
    </Message>
    <ProfileComponent />
    <div class="max-w-screen-sm card flex flex-col align-center mx-auto gap-8 mt-8"
         v-show="config.user?.studentId">
      <hr>
      <Button :label="$t('go-to-pisa-test')" @click="cerebry" outlined severity="contrast"
              icon="pi pi-external-link" :disabled="loading" />
    </div>
  </MainLayout>
</template>

<style>

</style>
