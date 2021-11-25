import React from 'react';
import '../src/styling/App.css';
import LoginPage from "./components/loginPage";
import MainLayout from './components/MainLayout'
import {HashRouter, Route, Switch} from "react-router-dom";
import CreatePatient from "./components/CreatePatient";
import Error from "./Error";
import CreatePrescription from "./components/CreatePrescription";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HashRouter>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/patients" component={CreatePatient}/>
                        <Route path="/prescriptions" component={CreatePrescription}/>
                        <Route exact path="/" component={MainLayout}/>
                        <Route component={Error}/>
                    </Switch>
                </HashRouter>
            </header>
        </div>
    );
}


export default App;
