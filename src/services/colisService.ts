import api, { setAuthToken } from '../utils/api'
import { getToken, throwIfNotAuthenticated } from '../utils/auth'
type Colis = {
    name: string; 
    tracking_number: string; 
    type_label: string; 
    weight: number; 
    price: number; 
    user_id: number
}

const findAllColisType = async () => {
    throwIfNotAuthenticated()
    setAuthToken(getToken())
    const { data } = await api.get('/colis-types')
    console.log('findAllColis type data : ', data)
    return data
}

const findAllColis = async () => {
    throwIfNotAuthenticated()
    setAuthToken(getToken())
    const { data } = await api.get('/colis')
    console.log('findAllColis data : ', data)
    return data
}

// createColis implementation below

const findAllClientsUsers = async () => {
    // fetch list of users/clients
    throwIfNotAuthenticated()
    setAuthToken(getToken())
    const { data } = await api.get('/auth/clients')
    console.log('findAllClients data : ', data.clients)
    return data.clients
}

const createColis = async (payload: { name: string; tracking_number: string; type_id: number; weight: number | string; price: number | string; user_id: number }) => {
    throwIfNotAuthenticated()
    setAuthToken(getToken())
    const { data } = await api.post('/colis', payload)
    console.log('createColis response : ', data)
    return data
}

export default { findAllColis, findAllColisType, findAllClientsUsers, createColis }