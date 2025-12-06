import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react'
import colisService from '../services/colisService'
import { useHistory } from 'react-router'

const NewColis: React.FC = () => {

    const history = useHistory()

    const [name, setName] = useState('')
    const [tracking, setTracking] = useState('')
    const [weight, setWeight] = useState('')
    const [price, setPrice] = useState('')
    const [typeId, setTypeId] = useState<number | null>(null)
    const [userId, setUserId] = useState<number | null>(null)

    const [types, setTypes] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const t = await colisService.findAllColisType()
                // map response to array
                const typeArr = Array.isArray(t) ? t : (t && Array.isArray(t.payload) ? t.payload : [])
                setTypes(typeArr)
                if (typeArr.length && typeId === null) setTypeId(typeArr[0].type_id ?? null)

                const u = await colisService.findAllClientsUsers()
                console.log('Users fetched for colis creation: ', u)
                const usersArr = Array.isArray(u) ? u : (u && Array.isArray(u.payload) ? u.payload : [])
                setUsers(usersArr)
                if (usersArr.length && userId === null) setUserId(usersArr[0].user_id ?? usersArr[0].id ?? null)
            } catch (e) {
                console.error(e)
            }
        }
        load()
    }, [])

    const handleSave = async () => {
        if (!name || !tracking || !weight || !price || !typeId || !userId) {
            alert('Veuillez remplir tous les champs')
            return
        }
        setLoading(true)
        try {
            const payload = {
                name,
                tracking_number: tracking,
                type_id: typeId,
                weight,
                price,
                user_id: userId
            }
            await colisService.createColis(payload)
            alert('Colis créé')
            history.push('/home/admin')
        } catch (e) {
            console.error(e)
            alert('Erreur lors de la création du colis')
        } finally {
            setLoading(false)
        }
    }

    return (
        <IonPage>
                <main className='w-full overflow-auto bg-neutral-200 flex flex-col text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
                    <div className='flex-1 flex flex-col gap-[2em] p-[2em]'>
                        <span className='text-3xl font-semibold'>
                            <p className=' '>Entrer un</p>
                            <p className=''>Nouveau colis</p>
                        </span>
                        <div className='grid gap-[1.2em]'>
                            <input value={name} onChange={e=>setName(e.target.value)} className='p-3 border w-full outline-none border-brand-btn-dark rounded-lg' placeholder="Nom"></input>
                            <input value={tracking} onChange={e=>setTracking(e.target.value)} className='p-3 border w-full outline-none border-brand-btn-dark rounded-lg' placeholder="Tracking number"></input>
                            <input value={weight} onChange={e=>setWeight(e.target.value)} className='p-3 border w-full outline-none border-brand-btn-dark rounded-lg' placeholder="Poids"></input>
                            <select value={typeId ?? ''} onChange={e=>setTypeId(Number(e.target.value))} className='p-3 border w-full outline-none border-brand-btn-dark rounded-lg'>
                                <option value=''>Sélectionner le type</option>
                                {types.map((t:any) => <option key={t.type_id ?? t.id ?? t.type_key} value={t.type_id ?? t.id ?? t.type_key}>{t.type_label ?? t.type_key}</option>)}
                            </select>
                            <input value={price} onChange={e=>setPrice(e.target.value)} className='p-3 border w-full outline-none border-brand-btn-dark rounded-lg' placeholder="Prix"></input>
                            <select value={userId ?? ''} onChange={e=>setUserId(Number(e.target.value))} className='p-3 border w-full outline-none border-brand-btn-dark rounded-lg'>
                                <option value=''>Sélectionner le client</option>
                                {users.map((u:any) => <option key={u.user_id ?? u.id} value={u.user_id ?? u.id}>{u.name ?? u.username ?? u.email}</option>)}
                            </select>
                        </div>
                        <button disabled={loading} onClick={handleSave} className='text-beige bg-brand-primary-dark btn-h rounded-full'>{loading ? 'En cours...' : 'Enregistrer'}</button>
                    </div>
                </main>
        </IonPage>
    );
};

export default NewColis;
