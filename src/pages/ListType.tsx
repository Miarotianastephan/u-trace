import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, themeState } from '../utils/redux';
import { color, motion } from 'framer-motion'
import { ListComp } from '../component/component';
import { useEffect, useState } from 'react';
import { colisT, listTypeT } from '../utils/type';
import { IoMdAdd } from "react-icons/io";
import colisService from '../services/colisService';


const ListType: React.FC = () => {
    const dispatch = useDispatch()
    const theme = useSelector(themeState)
    // default types (will be replaced with API response when available)
    const defaultTypes: listTypeT[] = [
        { nom: 'Express', code: 'express' },
        { nom: 'Standard', code: 'standard' },
        { nom: 'Fragile', code: 'fragile' },
        { nom: 'International', code: 'international' }
    ]
    const [list, setList] = useState<listTypeT[]>(defaultTypes)
    
    useEffect(() => {
        const fetchColisType = async () => {
            try {
                const data = await colisService.findAllColisType();
                // data might be array of objects with fields: type_id, type_key, type_label, description
                if (Array.isArray(data)) {
                    const mapped = data.map((t: any) => ({ nom: t.type_label ?? t.type_key, code: t.type_key ?? String(t.type_id) }))
                    setList(mapped)
                } else if (data && Array.isArray(data.payload)) {
                    const mapped = data.payload.map((t: any) => ({ nom: t.type_label ?? t.type_key, code: t.type_key ?? String(t.type_id) }))
                    setList(mapped)
                } else {
                    console.warn('Unexpected colis type response format, keeping defaults', data)
                }
                console.log('Colis type fetched: ', data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchColisType();
    },[])

    const handleChange = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(changeTheme(!theme))
    }

    const checkF = (n: number) => {
        console.log(n)
        // setList(p => p.map((k, i) => i === n ? { ...k, status: !k.status } : { ...k }))
    }
    return (
        <IonPage>
            <main className='bg-neutral-200 justify-center flex h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
                <div className='mt-[15%] px-[1.5em] h-fit w-full  flex flex-col'>
                    <div className='grid gap-1 font-bold text-2xl'>
                        <p className=''>Type List</p>
                    </div>
                    <div className='flex flex-col gap-4'>

                        <div className='grid gap-[1em]'>
                            <ListComp checkF={checkF} type={2} title='List des colis' tabList={list} />
                        </div>
                        <span className='w-[2.5em] text-neutral-200 flex relative justify-center items-center rounded-lg bg-sky-700 h-[2.5em]'>
                            <IonButton fill='clear' routerLink='/home/newType' className='absolute h-full'>
                                <IoMdAdd size={'1.5em'} color='white' />
                            </IonButton>
                        </span>
                    </div>
                </div>
            </main>
        </IonPage>
    );
};

export default ListType;
