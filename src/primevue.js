import app from './createapp'
import { defineAsyncComponent } from 'vue'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
})

app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

import Tooltip from 'primevue/tooltip'

app.directive('ripple', defineAsyncComponent(() => import('primevue/ripple')))
app.directive('tooltip', Tooltip)
app.directive('focustrap', defineAsyncComponent(() => import('primevue/focustrap')))
app.directive('styleclass', defineAsyncComponent(() => import('primevue/styleclass')))

app.component('Avatar', defineAsyncComponent(() => import('primevue/avatar')))
app.component('Badge', defineAsyncComponent(() => import('primevue/badge')))
app.component('Button', defineAsyncComponent(() => import('primevue/button')))
app.component('Calendar', defineAsyncComponent(() => import('primevue/calendar')))
app.component('Card', defineAsyncComponent(() => import('primevue/card')))
app.component('Column', defineAsyncComponent(() => import('primevue/column')))
app.component('ConfirmDialog', defineAsyncComponent(() => import('primevue/confirmdialog')))
app.component('DataTable', defineAsyncComponent(() => import('primevue/datatable')))
app.component('InputGroup', defineAsyncComponent(() => import('primevue/inputgroup')))
app.component('InputGroupAddon', defineAsyncComponent(() => import('primevue/inputgroupaddon')))
app.component('InputText', defineAsyncComponent(() => import('primevue/inputtext')))
app.component('Message', defineAsyncComponent(() => import('primevue/message')))
app.component('Password', defineAsyncComponent(() => import('primevue/password')))
app.component('Select', defineAsyncComponent(() => import('primevue/select')))
app.component('SelectButton', defineAsyncComponent(() => import('primevue/selectbutton')))
app.component('Tab', defineAsyncComponent(() => import('primevue/tab')))
app.component('TabList', defineAsyncComponent(() => import('primevue/tablist')))
app.component('TabPanel', defineAsyncComponent(() => import('primevue/tabpanel')))
app.component('TabPanels', defineAsyncComponent(() => import('primevue/tabpanels')))
app.component('Tabs', defineAsyncComponent(() => import('primevue/tabs')))
app.component('Toast', defineAsyncComponent(() => import('primevue/toast')))
app.component('ToggleSwitch', defineAsyncComponent(() => import('primevue/toggleswitch')))

export default app
