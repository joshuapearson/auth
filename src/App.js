import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Account,
  AccountCreate,
  Authenticate,
  Deauthenticate,
  Error,
  Header,
  Loading,
  Organization,
  Welcome
} from './components';
import { checkAuthStatus, startLoading, stopLoading } from './redux/actions';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    const { isCheckingStatus } = this.props;

    if (isCheckingStatus) {
      this.props.showLoading();
    } else {
      this.props.hideLoading();
    }

    return (
      <div className="App">
        <Router>
          <Header />
          <main className="App-main">
            {isCheckingStatus ? null : (
              <Switch>
                <Route path="/account">
                  <Account />
                </Route>
                <Route path="/deauthenticate">
                  <Deauthenticate />
                </Route>
                <Route path="/accountCreate">
                  <AccountCreate />
                </Route>
                <Route path="/authenticate">
                  <Authenticate />
                </Route>
                <Route path="/organization">
                  <Organization />
                </Route>
                <Route path="/error">
                  <Error />
                </Route>
                <Route>
                  <Welcome />
                </Route>
              </Switch>
            )}
          </main>
          <Loading />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  ...auth
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuthStatus()),
    showLoading: () => dispatch(startLoading()),
    hideLoading: () => dispatch(stopLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
