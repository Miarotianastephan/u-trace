import { IonContent, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, themeState } from '../utils/redux';
import { motion } from 'framer-motion'

const NewType: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useSelector(themeState)

  const handleChange = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(changeTheme(!theme))
  }

  return (
    <IonPage>
        <main className='bg-neutral-200 justify-center flex h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
          <div className='mt-[6em] px-[2em] h-fit w-full  flex flex-col gap-6'>
            <div className='grid gap-1 font-bold text-2xl'>
              <p className=''>Entrer un</p>
              <p>Nouveau type</p>
            </div>
            <div className='grid gap-[1em]'>
              <input className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Nom"></input>
              <input className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Code"></input>
            </div>
            <button className='mt-4 bg-violet-900 rounded-full py-5'>Enregistrer</button>
          </div>
        </main>
    </IonPage>
  );
};

export default NewType;
