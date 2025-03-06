export function focusElement(elementId) {
  document.querySelector(`#${elementId}`)?.focus()
}

export function parseDate(date, defaultValue = '') {
  try {
    return (new Date(date)).toLocaleDateString()
  } catch (error) {
    return defaultValue
  }
}

export function hasError(errors, attr) {
  return Object.hasOwn(errors, attr)
}

export function getError(errors, attr) {
  if (hasError(errors, attr)) {
    const err = errors[attr]
    return Array.isArray(err) ? err[0] : err
  }
  return ''
}

export function windowTo(path) {
  window.location.href = path.startsWith('/') ? path : `/${path}`
}

export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null
  }
}
