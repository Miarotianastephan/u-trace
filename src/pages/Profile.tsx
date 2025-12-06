import { IonButton, IonPage } from '@ionic/react'
import { useHistory } from 'react-router'
import { Header } from '../component/component'
import authService from '../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme, themeState } from '../utils/redux'

const Profile: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useSelector(themeState)

  const handleLogout = () => {
    try {
      authService.logout()
    } finally {
      history.push('/login')
    }
  }

  const headerF = () => {
    history.goBack()
  }

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(changeTheme(!theme))
  }

  return (
    <IonPage>
      <main className='bg-neutral-200 flex-col flex h-full text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 '>
        <Header headerF={headerF} />
        <div className='mt-[2em] px-[2em]'>
          <h2 className='text-2xl font-bold'>Profil</h2>
          <p className='mt-4'>Ici, vous pouvez gérer votre compte et paramètres.</p>
          <div className='mt-6 flex flex-col gap-4'>
            <IonButton onClick={toggleTheme} fill='clear' className='bg-gray-600 text-neutral-200'>Basculer le thème</IonButton>
            <IonButton onClick={handleLogout} fill='clear' className='bg-red-00 text-red-200'>Se déconnecter</IonButton>
          </div>
        </div>
      </main>
    </IonPage>
  )
}

export default Profile
