import { defineStore } from 'pinia'
import http from '@/plugin/axios'
import { toastEvent } from '@/helper'
import dayjs from 'dayjs'

export const useConfigStore = defineStore('config', {
  state: () => ({
    locales: [
      {key: 'kg', name: 'кыргызча'},
      {key: 'ru', name: 'русский'},
      {key: 'en', name: 'english'},
    ],
    locale: localStorage.getItem('locale') ?? 'kg',
    darkMode: localStorage.getItem('darkMode') ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    user: null,
    pin: localStorage.getItem('pin') ?? '',
    token: localStorage.getItem('token') ?? '',
    loading: false,
    status: '',
    message: '',
    errors: {},
  }),
  getters: {
    success: state => state.status === 'success',
    error: state => state.status === 'error',
  },
  actions: {
    async sync(data = null) {
      this.user = data
      await this.setPin(data?.pin)
      await this.setLocale(data?.locale)
      await this.setDarkMode(data?.darkMode)
    },
    async syncWithServer() {
      this.loading = true
      if(window.location.pathname.includes('/login')) {
        await this.sync()
        await this.logout()
        this.loading = false
      } else {
        await http.post('auth/profileStudent')
          .then(resp => {
            if(resp.data?.resultCode === 0) {
              this.setSuccess({message: resp.data?.resultMessage}, false)
              this.sync(resp.data?.actionResult ?? {})
            } else {
              this.setError({message: resp.data?.resultMessage})
              this.sync()
            }
          })
          .catch(err => this.sync())
          .finally(() => this.loading = false)
      }
    },
    async setPin(pin = null) {
      this.pin = pin ?? localStorage.getItem('pin') ?? this.pin
      await localStorage.setItem('pin', this.pin)
    },
    async setLocale(locale = null, sync = false) {
      this.locale = locale ?? localStorage.getItem('locale') ?? this.locale
      await localStorage.setItem('locale', this.locale)

      if(sync) await this.updateProfile({locale: this.locale})
    },
    async toggleDarkMode() {
      await this.setDarkMode(this.darkMode)
    },
    async setDarkMode(darkMode = null) {
      this.darkMode = [true, 'true'].includes(darkMode ?? localStorage.getItem('darkMode') ?? this.darkMode)
      await localStorage.setItem('darkMode', this.darkMode)

      const html = document.querySelector('html')
      this.darkMode ? html.classList.add('p-dark') : html.classList.remove('p-dark')
    },
    async setToken(token = null) {
      this.token = token || localStorage.getItem('token') || this.token
      await localStorage.setItem('token', this.token)
    },
    async clearToken() {
      this.token = ''
      await localStorage.setItem('token', '')
    },
    async updateProfile(data) {
      this.loading = true
      await http.put('profile/update', data)
        .then(resp => {
          this.setSuccess(resp.data)
        })
        .catch(err => this.setError(err))
        .finally(() => this.loading = false)
    },
    async login(username, password, device = 'web') {
      username = username.replace(/\D/g, '')
      if(username.length !== 14 || !['1', '2'].includes(username[0])) {
        this.setError({message: 'check-pin-validity'})
        return
      }
      if(password.length < 5) {
        this.setError({message: 'password-length-min'})
        return
      }
      this.loading = true
      await http.post('auth/loginStudent', {
          username: username,
          password: password,
          device: device,
        })
        .then(resp => {
          if(resp.data?.token?.startsWith('ey')) {
            const date = dayjs(resp.data?.birthdate)
            if(date.year() === 2009) {
              this.setSuccess(resp.data, false)
              this.setToken(resp.data?.token)
              this.sync(resp.data || {})
            } else {
              this.setError({message: 'dont-have-access'})
            }
          } else {
            this.setError({message: resp.data?.resultMessage || 'error'})
          }
        })
        .catch(err => this.setError(err))
        .finally(() => this.loading = false)
    },
    can(...permissions) {
      return permissions.some(perm => this.role?.permissions?.filter(p => p.name === perm).length > 0)
    },
    async logout() {
      await this.clearToken()
      this.user = {}
    },
    setSuccess(resp, toast = true) {
      this.status = 'success'
      this.message = resp.message || 'action-successful'
      this.errors = {}
      if(toast) {
        toastEvent('success', this.message)
      }
    },
    setError(resp) {
      this.status = 'error'
      this.message = resp.message || 'error'
      this.errors = resp.errors || {}
    },
  },
})
