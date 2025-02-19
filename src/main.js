import app from './primevue'

const dm = [true, 'true'].includes(localStorage.getItem('darkMode'))

const html = document.querySelector('html')
dm ? html.classList.add('p-dark') : html.classList.remove('p-dark')

app.mount('#app')
