<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { focusElement } from '@/helper'
import { useConfigStore } from '@/store'

const router = useRouter()
const config = useConfigStore()
config.logout()

const username = ref(config.pin)
const password = ref('')

const login = async () => {
  await config.login(username.value, password.value)
  if (config.success) {
    await router.push({name: 'home'})
  }
}

const updateUsername = () => {
  username.value = username.value.replace(/\D/g, '')
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center p-2" style="min-height: 220px">
    <div class="w-96">
      <div class="flex flex-col gap-3">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-user"></i></InputGroupAddon>
          <InputText v-model.trim="username" :placeholder="$t('enter-your-pin')" autofocus fluid
                     maxlength="14" tabindex="0" @keyup="updateUsername"
                     @keyup.enter.native="focusElement('password-input')" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon><i class="pi pi-key"></i></InputGroupAddon>
          <Password v-model.trim="password" :feedback="false" :placeholder="$t('enter-your-password')" input-id="password-input"
                    tabindex="1" toggleMask @keyup.enter.native="login" />
        </InputGroup>
        <Button :disabled="config.loading" :label="$t('login')" severity="contrast" @click="login" />
        <Message v-if="config.error" severity="error">{{ $t(config.message) }}</Message>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
