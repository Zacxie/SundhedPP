  import React from 'react';
  import './App.css';
  import LoginPage from "./loginPage";
  import MainLayout from './components/MainLayout'
  import {HashRouter, Route, Switch} from "react-router-dom";
  import CreatePatient from "./components/CreatePatient";

  function App() {
      return (
          <div className="App">
            <header className="App-header">
                <HashRouter>
                    <Switch>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/patients">
                            <CreatePatient/>
                        </Route>
                        <Route path="/">
                        <div className="container">
                           <MainLayout />
                        </div>
                        </Route>
                    </Switch>
                </HashRouter>
            </header>
        </div>

    );
}


export default App;
