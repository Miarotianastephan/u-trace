import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import { ListComp, StatusChoice } from '../component/component';
import { colisT } from '../utils/type';
import { IoSearchOutline } from "react-icons/io5";

const ColisRecus: React.FC = () => {
    
    const [act,setAct] = useState(1)
    const list:colisT[] = [
        { status:false,qnt: 12, track: '0802 1125 4956', pds: 1, prix: 120000 }
    ]
    
    const choiceF = (n:number) => {
        setAct(n)
    }

    const SearchComp = () => {
        return (
            <label htmlFor='search' className='mt-[.8em] gap-2 flex border border-neutral-200/15 rounded-2xl'>
                <input id='search' placeholder='Tracking number/code client /...' className='w-full px-2 h-[3em] outline-none'></input>
                <span className='mr-2 h-full aspect-square flex items-center justify-center'>
                    <IoSearchOutline size={'1.5em'}/>
                </span>
            </label>
        )
    }
    return (
        <IonPage>
            <main className='w-full bg-neutral-200 flex flex-col h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
                <div className='flex-1 flex flex-col gap-[2em] p-[.9em]'>
                   <SearchComp/>
                   <div className='px-4'>
                    <StatusChoice act={act} choiceF={choiceF} />

                   </div>
                    <div className='flex flex-col flex-1 gap-[1.2em] border border-neutral-200/15 p-[.9em] rounded-2xl'>
                        <ListComp title='List des colis recus' tabList={list} />
                    </div>
                </div>
            </main>
        </IonPage>
    );
};

export default ColisRecus;
