import { defineStore } from 'pinia'
import http from '@/plugin/axios'
import { parseJwt, toastEvent } from '@/helper'
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
    type: localStorage.getItem('type') ?? 'student',
    pin: localStorage.getItem('pin') ?? '',
    firstName: localStorage.getItem('firstname') ?? '',
    lastName: localStorage.getItem('lastname') ?? '',
    email: localStorage.getItem('email') ?? '',
    phone: localStorage.getItem('phone') ?? '',
    birthdate: localStorage.getItem('birthdate') ?? '',
    studentId: localStorage.getItem('studentid') ?? '',
    token: localStorage.getItem('token') ?? '',
    okpo: localStorage.getItem('okpo') ?? '',
    schoolName: localStorage.getItem('schoolname') ?? '',
    grade: localStorage.getItem('grade') ?? '',
    letter: localStorage.getItem('letter') ?? '',
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
    async sync(data = {}) {
      const claims = parseJwt(data?.token ?? this.token ?? null)
      await this.setProfile(data)
      await this.setLocale(data?.locale)
      await this.setDarkMode(data?.darkMode)
    },
    async syncWithServer() {
      this.loading = true
      if (window.location.pathname.includes('/login')) {
        await this.sync()
        await this.logout()
        this.loading = false
      } else {
        await http.get('auth/profile')
          .then(resp => {
            this.setSuccess(resp.data, false)
            this.sync(resp.data ?? {})
          })
          .catch(err => this.sync())
          .finally(() => this.loading = false)
      }
    },
    async setLocale(locale = null, sync = false) {
      this.locale = locale ?? localStorage.getItem('locale') ?? this.locale
      await localStorage.setItem('locale', this.locale)

      if (sync) await this.updateProfile({locale: this.locale})
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
    async setProfile(data) {
      this.pin = data?.pin ?? localStorage.getItem('pin') ?? this.pin
      this.firstName = data?.first_name ?? localStorage.getItem('firstname') ?? this.firstName
      this.lastName = data?.last_name ?? localStorage.getItem('lastname') ?? this.lastName
      this.email = data?.email ?? localStorage.getItem('email') ?? this.email
      this.phone = data?.phone ?? localStorage.getItem('phone') ?? this.phone
      this.birthdate = data?.birthdate ?? localStorage.getItem('birthdate') ?? this.birthdate
      this.studentId = data?.studentId ?? localStorage.getItem('studentid') ?? this.studentId
      this.okpo = data?.okpo ?? localStorage.getItem('okpo') ?? this.okpo
      this.schoolName = data?.school?.name ?? localStorage.getItem('schoolname') ?? this.schoolName
      this.grade = data?.grade ?? localStorage.getItem('grade') ?? this.grade
      this.letter = data?.letter ?? localStorage.getItem('letter') ?? this.letter

      await localStorage.setItem('pin', this.pin)
      await localStorage.setItem('firstname', this.firstName)
      await localStorage.setItem('lastname', this.lastName)
      await localStorage.setItem('email', this.email)
      await localStorage.setItem('phone', this.phone)
      await localStorage.setItem('birthdate', this.birthdate)
      await localStorage.setItem('studentid', this.studentId)
      await localStorage.setItem('okpo', this.okpo)
      await localStorage.setItem('schoolname', this.schoolName)
      await localStorage.setItem('grade', this.grade)
      await localStorage.setItem('letter', this.letter)
    },
    async clearProfile() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
      this.birthdate = ''
      this.studentId = ''
      this.okpo = ''
      this.schoolName = ''
      this.grade = ''
      this.letter = ''

      await localStorage.setItem('firstname', '')
      await localStorage.setItem('lastname', '')
      await localStorage.setItem('email', '')
      await localStorage.setItem('phone', '')
      await localStorage.setItem('birthdate', '')
      await localStorage.setItem('studentid', '')
      await localStorage.setItem('okpo', '')
      await localStorage.setItem('schoolname', '')
      await localStorage.setItem('grade', '')
      await localStorage.setItem('letter', '')
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
      if (username.length !== 14 || !['1', '2'].includes(username[0])) {
        this.setError({message: 'check-pin-validity'})
        return
      }
      if (password.length < 5) {
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
      await this.clearProfile()
    },
    setSuccess(resp, toast = true) {
      this.status = 'success'
      this.message = resp.message || 'action-successful'
      this.errors = {}
      if (toast) {
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
