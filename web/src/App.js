  import React from 'react';
  import './App.css';
  import LoginPage from "./loginPage";
  import MainLayout from './components/MainLayout'
  import {HashRouter, Route, Switch, Redirect, useHistory} from "react-router-dom";
  import {userStore} from "./stores/UserStore";


  function App() {

      return (
          <div className="App">
            <header className="App-header">
                <HashRouter>
                    <Switch>
                        <Route exact path="/login">
                            <LoginPage/>
                        </Route>

                        <Route exact path="/"
                            render={() => (
                                userStore.state ? (
                                    <div className="container">
                                        <MainLayout />
                                    </div>
                            ) : (
                                    <Redirect to="/login"/>
                            )
                        )}/>

                    </Switch>
                </HashRouter>
            </header>
        </div>

    );
}

export default App;
