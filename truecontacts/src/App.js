import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import routes from './routes/routes';
import { GlobalProvider } from './contexts/Provider';
import isAuthenticated from './utils/isAuthenticated';
import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense, useState } from 'react';
import UserLeaveConfirmation from './components/UserLeaveConfirmation';

const RenderRoute = (route) => {
  const history = useHistory();
  // const {authState: {isAuthenticated}} = useContext(GlobalContext);
  // console.log('authState', isAuthenticated);

  if(route.needsAuth && !isAuthenticated()){
    history.push("/login");
  }
  return(
    <Route
      path={route.path} 
      exact 
      render={(props) => <route.components {...props}/>}
    />
  );
}

function App() {
  const[confirmOpen, setConfirmOpen] = useState(true);
  return (
    <GlobalProvider>
      <Router getUserConfirmation={(message, callback) => {
          return UserLeaveConfirmation(
            message, 
            callback,
            confirmOpen,
            setConfirmOpen
          );
        }}
      >
        <div className="App">
          <Suspense fallback={<p>Loading</p>}>
            <Switch>
              {
                routes.map((route, index) => (
                  <RenderRoute {...route} key={index}/>
                ))
              }
            </Switch>
          </Suspense>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
