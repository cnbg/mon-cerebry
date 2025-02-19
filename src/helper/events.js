export function toastEvent(severity, summary, detail = '', life = 4000) {
  document.dispatchEvent(
    new CustomEvent('show-toast', {
      detail: {
        severity: severity,
        summary: summary,
        detail: detail,
        life: life,
      },
    }),
  )
}

export function toggleDrawer() {
  document.dispatchEvent(
    new CustomEvent('toggle-drawer', {}),
  )
}
