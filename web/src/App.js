import React from 'react';
import './App.css';
import LoginPage from "./loginPage";
import MainLayout from './components/MainLayout'
import {HashRouter, Route, Switch} from "react-router-dom";
import CreatePatient from "./components/CreatePatient";
import Error from "./Error";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HashRouter>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/patients" component={CreatePatient}/>
                        <Route exact path="/" component={MainLayout}/>
                        <Route component={Error}/>
                    </Switch>
                </HashRouter>
            </header>
        </div>
    );
}


export default App;
