import React from 'react';
import '../src/styling/App.css';
import LoginPage from "./components/loginPage";
import MainLayout from './components/MainLayout'
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import {userStore} from "./stores/UserStore";
import Error from "./Error";
import CreatePrescription from "./components/CreatePrescription";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HashRouter>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
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
                        <Route path="/patients" component={CreatePatient}/>
                        <Route path="/prescriptions" component={CreatePrescription}/>
                        <Route component={Error}/>
                    </Switch>
                </HashRouter>
            </header>
        </div>
    );
}


export default App;
