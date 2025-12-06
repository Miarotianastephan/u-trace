import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { Provider } from 'react-redux';
import { store } from './utils/redux';
import Colis from './pages/NewColis';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { PublicRoute, PrivateRoute } from './components/RouteGuards';

setupIonicReact();

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <PublicRoute exact path="/login" restricted component={Login} />
          <PrivateRoute path="/home" component={Home} />
          <PublicRoute exact path={'/register'} restricted component={Register} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
