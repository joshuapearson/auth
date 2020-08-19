import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { 
  Account, AccountCreate, Authenticate, Deauthenticate, Error, Header, Loading, Welcome 
} from './components'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Switch>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/accountCreate">
              <AccountCreate />
            </Route>
            <Route path="/authenticate">
              <Authenticate />
            </Route>
            <Route path="/deauthenticate">
              <Deauthenticate />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route>
              <Welcome />
            </Route>
          </Switch>
        </main>
        <Loading />
      </Router>
    </div>
  );
}

export default App;
