import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import { ListComp, StatusChoice } from '../component/component';
import { colisT } from '../utils/type';

const Recuperer: React.FC = () => {
    const [act,setAct] = useState(1)
    const [list,setList] = useState<colisT[]>([{ status:false,qnt: 12, track: '0802 1125 4956', pds: 1, prix: 120000 }])
  
    
    const choiceF = (n:number) => {
        setAct(n)
    }
    const checkF = (n:number) => {
        console.log(n)
        setList(p => p.map((k,i) => i === n ? {...k,status:!k.status} : {...k}))
    }

    return (
        <IonPage>
            <main className='relative overflow-y-auto w-full bg-neutral-200 flex flex-col h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
                <div className='absolute w-full'>

                <div className='flex-1 flex flex-col gap-[2em] p-[.9em]'>
                    <span className='mt-[.8em] gap-2 grid'>
                        <p className='text-3xl font-bold'>Recherches</p>
                        <input placeholder='Tracking number/code client /...' className='border border-neutral-200/15 w-full px-2 h-[3em] outline-none rounded-2xl'></input>
                    </span>
                    <div className='flex flex-col flex-1 gap-[1.2em] border border-neutral-200/15 p-[.9em] rounded-2xl'>
                        <div className='flex flex-col gap-2'>
                            <p>Filtres</p>
                            <label className='bg-neutral-100/15 h-[3em] rounded-lg flex items-center px-2'>
                                <input className='w-full outline-none' placeholder='Date'></input>
                            </label>
                            <label className='bg-neutral-100/15 h-[3em] rounded-lg flex items-center px-2'>
                                <input className='w-full outline-none' placeholder='Nom du clients'></input>
                            </label>
                        </div>
                        <StatusChoice act={act} choiceF={choiceF}/>
                        <ListComp checkF={checkF} type={1} title='List des colis' tabList={list}/>
                    </div>
                    <button className='p-5 rounded-full bg-violet-800 font-bold'>Recuperer</button>
                </div>
                </div>
            </main>
        </IonPage>
    );
};

export default Recuperer;
