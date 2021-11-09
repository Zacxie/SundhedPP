  import React from 'react';
  import './App.css';
  import LoginPage from "./loginPage";
  import MainLayout from './components/MainLayout'
  import {HashRouter, Route, Switch} from "react-router-dom";
  
  function App() {
      return (
          <div className="App">
            <header className="App-header">
                <HashRouter>
                    <Switch>
                        <Route path="/login">
                            <LoginPage/>
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
