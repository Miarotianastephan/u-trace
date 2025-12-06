import { IonContent, IonHeader, IonPage, IonRouterOutlet } from "@ionic/react"
import { Route, useHistory } from "react-router"
import Colis from "./NewColis"
import Recherches from "./Recherches"
import ColisRecus from "./ColisRecus"
import Recuperer from "./Recuperer"
import Register from "./Register"
import NewType from "./NewType"
import { Footer, Header } from "../component/component"
import ListType from "./ListType"
import Admin from "./admin"
import Profile from './Profile'

const Home = () => {
    const history = useHistory()

    const headerF = () => {
        history.goBack()
    }
    const FooterF = (n:number) => {
        
    }
    return (
        <IonPage>
            <main className="flex h-full flex-col">
                <Header headerF={headerF} />
                <section className="flex-1 relative">
                    <IonRouterOutlet>
                        <Route exact path={'/home/colisRecus'}><ColisRecus /></Route>
                        <Route exact path={'/home/colis'}><Colis /></Route>
                        <Route exact path={'/home/recherche'}><Recherches /></Route>
                        <Route exact path={'/home/recuperer'}><Recuperer /></Route>
                        
                        <Route exact path={'/home/listType'}><ListType /></Route>
                        <Route exact path={'/home/newType'}><NewType /></Route>
                        <Route exact path={'/home/admin'}><Admin /></Route>
                        <Route exact path={'/home/profile'}><Profile /></Route>
                        <Route exact path='/home'><IonPage>Home</IonPage></Route>
                    </IonRouterOutlet>
                </section>
                <Footer fotterF={FooterF}></Footer>
            </main>
        </IonPage>
    )
}
export default Home