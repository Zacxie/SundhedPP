import Search from '../pages/Search'
import Prescription from "./prescriptions/Prescription";
import PrescriptionsTable from "./prescriptions/PrescriptionsTable";
import {HashRouter, Switch, Route} from "react-router-dom";

import '../styling/Dashboard.css'

const Dashboard = () => {
    return (
        <div id="dashboard__main">
            <h3>Dashboard</h3>
            {/*<Search />*/}
            <HashRouter>
                <Switch>
                    <Route path="/prescription/:id" component={Prescription} />
                    <Route path="/" component={PrescriptionsTable} />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default Dashboard
