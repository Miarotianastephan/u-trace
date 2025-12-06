import { IonButton, IonContent, IonNavLink, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, themeState } from '../utils/redux';
import { motion } from 'framer-motion'
import { Header } from '../component/component';
import { useHistory } from 'react-router';
import { useRef } from 'react';
import authService from '../services/authService';

const Register: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useSelector(themeState)
  // REFS FOR INPUT FIELDS
  const mailRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const passConfirmRef = useRef<HTMLInputElement>(null)
  const history = useHistory()
  
  const handleRegister = async(e?: React.MouseEvent) => {
    if (e) e.preventDefault()

    const email = mailRef.current?.value?.trim() || ''
    const name = nameRef.current?.value || ''
    const phone = phoneRef.current?.value || ''
    const password = passRef.current?.value || ''
    const confPassword = passConfirmRef.current?.value || ''
    try {
      const res = await authService.register({ name, email, phone, password }, confPassword)
      console.log('Register response : ', res)
      history.push('/home/admin')
    } catch (err: any) {
      console.error('Register error', err)
      alert(err?.response?.data?.message || err?.message || 'Erreur lors de la connexion')
    }
  }

  const handleChange = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(changeTheme(!theme))
  }
const headerF = () => {
    history.goBack()
}
  return (
    <IonPage>
        <main className='bg-neutral-200 flex-col flex h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
        <Header headerF={headerF}/>
          <div className='mt-[3em] px-[2em] h-fit w-full  flex flex-col gap-6'>
            <div className='grid gap-1 font-bold text-2xl text-brand-head'>
              <p className=''>Inscrivez vous</p>
              <p>pour suivre vos colis</p>
            </div>
            <div className='grid gap-[1em]'>
              <input ref={mailRef} className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Email"></input>
              <input ref={nameRef} className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Nom"></input>
              <input ref={phoneRef} className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Phone (is optionnal)"></input>
              <input ref={passRef} className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Mot de passe"></input>
              <input ref={passConfirmRef} className='p-4 border w-full outline-none border-neutral-400 rounded-lg' placeholder="Confirmation"></input>
            </div>
            <IonButton fill='clear' className='text-beige mt-8 bg-brand-primary-dark rounded-full btn-h' onClick={handleRegister}>Connexion</IonButton>
            <IonButton fill='clear' className='font-bold text-sm text-violet-dark'  onClick={() => history.push('/login')}>Se connecter</IonButton>
          </div>
        </main>
    </IonPage>
  );
};

export default Register;
