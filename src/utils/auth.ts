export const AUTH_TOKEN_KEY = 'auth_token'

export const isAuthenticated = (): boolean => {
  try {
    const t = localStorage.getItem(AUTH_TOKEN_KEY)
    return !!t
  } catch (e) {
    return false
  }
}

export const throwIfNotAuthenticated = () => {
    if(!isAuthenticated()) {
        const msg = 'Utilisateur non authentifié. Token manquant.'
        console.warn(msg)
        throw new Error(msg)
    }
}

export const getToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  } catch (e) {
    return null
  }
}

export const clearAuth = () => {
  try { localStorage.removeItem(AUTH_TOKEN_KEY) } catch(e){}
}

export default { isAuthenticated, getToken, clearAuth }
