export function isValidEmail(email) {
  // Simple RFC 5322-ish pattern; good enough for client-side validation
  const re = /^[\w.!#$%&’*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/
  return re.test(String(email).toLowerCase())
}

export function isValidPassword(password) {
  // Min 6 chars for demo; adjust as needed
  return typeof password === 'string' && password.length >= 6
}
