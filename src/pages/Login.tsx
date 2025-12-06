import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, themeState } from '../utils/redux';
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react';
import { URLHOST } from '../utils/conf';
import axios from 'axios';
import datas from './data_test.json'
import { useHistory } from 'react-router-dom'
import authService from '../services/authService'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useSelector(themeState)
  const nameRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const handleLogin = async(e?: React.MouseEvent) => {
    if (e) e.preventDefault()

    const email = nameRef.current?.value?.trim() || ''
    const password = passRef.current?.value || ''
    try {
      const res = await authService.login({ email, password })
      console.log('login response : ', res)
      history.push('/home/admin')
    } catch (err: any) {
      console.error('Login error', err)
      alert(err?.response?.data?.message || err?.message || 'Erreur lors de la connexion')
    }
  }
  

  return (
    <IonPage>
      <main className='bg-neutral-200 flex flex-col h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'>
        <div className='flex-1 items-center flex justify-center'>
          <span className='bg-brand-primary py-[1em] px-[1em] rounded-4xl'>
            <p className='text-[4em] font-[londrina]'>UTrace</p>
          </span>
        </div>
        <div className='px-[2em] flex flex-col gap-6 flex-[2.5]'>
          <div className='grid gap-1'>
            <p className='font-bold text-2xl text-brand-head'>Se connecter</p>
            <p className='text-brand-option'>Veuillez entrer vos donnes de connection</p>
          </div>
          <div className='grid gap-[1.5em]'>
            <input ref={nameRef} className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Nom d'utilisateur"></input>
            <input ref={passRef} className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Entrez votre mots de passe"></input>
          </div>
          <IonButton fill='clear' className='text-beige mt-8 bg-brand-primary-dark rounded-full btn-h' onClick={handleLogin}>Connexion</IonButton>
          <span className='mt-2 justify-center text-sm flex items-center'>
            <p className='text-brand-option text-sm' >Mots de passe oublié ?</p>
            <IonButton fill='clear' routerLink='/register' className='font-bold text-sm text-violet-dark'>Créer un compte</IonButton>
          </span>
        </div>
      </main>
    </IonPage>
  );
};

export default Login;
