import { IonContent, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, themeState } from '../utils/redux';
import { motion } from 'framer-motion'
import { Button, ListComp } from '../component/component';
import { useEffect, useState } from 'react';
import { colisT, listTypeT } from '../utils/type';
import { IoMdAdd } from "react-icons/io";
import colisService from '../services/colisService'

type listColisT = {
    status: boolean,
    date: string,
    nom: string,
    track: string,
    pds: number,
    prix: number
}

const Admin: React.FC = () => {
    const dispatch = useDispatch()
    const theme = useSelector(themeState)
    type ColisAPI = {
        package_id: number,
        name: string,
        tracking_number: string,
        type_id: number,
        weight: string,
        price: string,
        status: string,
        user_id: number,
        ColisType?: { type_key: string, type_label: string, description?: string },
        User?: { user_id: number, name: string, email?: string }
    }

    const [colis, setColis] = useState<ColisAPI[]>([])
    const [list, setList] = useState<listTypeT[]>([{ nom: 'Consommable', code: 'CSM' }])
    
    useEffect(() => {
        const fetchColis = async () => {
            try {
                const data = await colisService.findAllColis();
                setColis(data.colis)
                console.log('Colis fetched: ', data.colis);
            } catch (err) {
                console.error(err);
            }
        }
        fetchColis();
    },[])

    const buttonF = () => {

    }
    const listType = ['ID', 'Nom', 'Tracking', 'Type', 'Poids', 'Prix', 'Status', 'Utilisateur']
    const colisTl = (n: number) => {
        switch (n) {
            case 0: return 'w-[5em]'
            case 1: return 'w-[14em]'
            case 2: return 'w-[14em]'
            case 3: return 'w-[10em]'
            case 4: return 'w-[8em]'
            case 5: return 'w-[8em]'
            case 6: return 'w-[8em]'
            default: return 'w-[12em]'
        }
    }
    // tabList replaced by fetched `colis` state

    return (
        <IonPage>
            <main className='bg-neutral-200 justify-center flex h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
                <div className='mt-[15%] px-[1.5em] h-fit w-full  flex flex-col'>
                    <p className='font-bold text-2xl'>Liste des colis</p>
                    <div className='flex flex-col gap-4'>
                        <div className='grid gap-[1em]'>
                            <div className='mt-[1em] flex-1 flex flex-col gap-2'>
                                <div className='relative h-[25em] overflow-x-auto'>
                                    <div className='absolute mt-[.5em] flex flex-col flex-1 rounded-lg border-2 border-neutral-200/15'>
                                        <ul className='h-[3.5em] px-1 bg-neutral-200/15 text-center items-center text-[.8em] flex'>
                                            {listType.map((p, i) => <li key={i} className={colisTl(i)}>
                                                {p}
                                            </li>
                                            )}
                                        </ul>
                                        <div className="h-[20em] relative overflow-y-auto overflow-x-hidden">
                                            <ul className="absolute px-1 text-[.8em] text-center flex flex-col p-1 gap-1">
                                                {colis.length === 0 ? (
                                                    <li className="h-[3.5em] px-2 items-center flex bg-neutral-800 text-sm">Aucun colis trouvé</li>
                                                ) : (
                                                    colis.map((p, i) => (
                                                        <li key={i} className="h-[3.5em] px-2 items-center flex">
                                                            <p className={colisTl(0)}>{p.package_id}</p>
                                                            <p className={colisTl(1)}>{p.name}</p>
                                                            <p className={colisTl(2)}>{p.tracking_number}</p>
                                                            <p className={colisTl(3)}>{p.ColisType?.type_label ?? '-'}</p>
                                                            <p className={colisTl(4)}>{p.weight} kg</p>
                                                            <p className={colisTl(5)}>{p.price} Ar</p>
                                                            <p className={colisTl(6)}>
                                                                <span className={`${(p.status === 'delivered' || p.status === 'received') ? 'bg-emerald-400/45' : 'bg-red-500/35'}  rounded-xl py-1 px-2`}>{p.status}</span>
                                                            </p>
                                                            <p className={colisTl(7)}>{p.User?.name ?? '-'}</p>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <Button title='Valider' buttonF={buttonF} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </IonPage>
    );
};

export default Admin;
