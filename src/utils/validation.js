export function isValidEmail(email) {
    const re = /^[\w.!#$%&’*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/
    return re.test(String(email).toLowerCase())
}

export function isValidPassword(password) {
    return typeof password === 'string' && password.length >= 6
}