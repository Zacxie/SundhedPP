import Prescription from "./prescriptions/Prescription";
import PrescriptionsTable from "./prescriptions/PrescriptionsTable";
import {HashRouter, Switch, Route} from "react-router-dom";
import CreatePatient from "./CreatePatient";

import '../styling/Dashboard.css'

const Dashboard = () => {
    return (
        <div id="dashboard__main">
            <h3>Dashboard</h3>
            {/*<Search />*/}
            <HashRouter>
                <Switch>
                    <Route path="/create-patient" component={CreatePatient}/>
                    <Route path="/prescription/:id" component={Prescription}/>
                    <Route path="/" component={PrescriptionsTable}/>
                </Switch>
            </HashRouter>
        </div>
    )
}

export default Dashboard
