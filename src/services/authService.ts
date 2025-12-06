import api, { setAuthToken } from '../utils/api'

type LoginPayload = { email: string; password: string }
type RegisterPayload = {name: string; email: string; phone: string; password: string}

const register = async (payload: RegisterPayload, confPassword: string) => {
    const { name, email, password} = payload
    if (password !== confPassword) {
        const msg = 'Les mots de passe ne correspondent pas'
        console.warn(msg)
        throw new Error(msg)
    }
    if (!email || !password || !name) {
        const msg = 'Veuillez renseigner email, mot de passe et votre nom'
        console.warn(msg)
        throw new Error(msg)
    }
    const { data } = await api.post('/auth/register', payload)
    if (data?.token) setAuthToken(data.token)
    return data
}

const login = async (payload: LoginPayload) => {
    const { email, password } = payload
    if (!email || !password) {
        const msg = 'Veuillez renseigner email et mot de passe'
        console.warn(msg)
        throw new Error(msg)
    }
    const { data } = await api.post('/auth/login', payload)
    if (data?.token) setAuthToken(data.token)
    return data
}

const logout = () => {
  setAuthToken(null)
}


export default { register, login, logout }
