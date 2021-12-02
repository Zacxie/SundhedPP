import React from 'react';
import '../src/styling/App.css';
import LoginPage from "./components/loginPage";
import MainLayout from './components/MainLayout'
import {HashRouter, Route, Switch} from "react-router-dom";
import CreatePatient from "./components/CreatePatient";
import Error from "./Error";
import CreatePrescription from "./components/CreatePrescription";
import ProtectedRoute from "./components/ProtectedRoute";
import ValidateToken from "./components/ValidateToken";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HashRouter>
                    <Switch>
                        <Route path="/auth" component={ValidateToken}/>
                        <Route path="/login"  component={LoginPage}/>
                        <ProtectedRoute exact path="/patients" component={CreatePatient}/>
                        <ProtectedRoute exact path="/prescriptions" component={CreatePrescription}/>
                        <ProtectedRoute exact path="/"  component={MainLayout}/>
                        <Route component={Error}/>
                    </Switch>
                </HashRouter>
            </header>
        </div>
    );
}


export default App;
