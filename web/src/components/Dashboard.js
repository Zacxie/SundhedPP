import Prescription from "./prescriptions/Prescription";
import newPrescriptionsTable from "./prescriptions/newPrescriptionTable";
import {HashRouter, Route, Switch} from "react-router-dom";

import '../styling/Dashboard.css'

const Dashboard = () => {
    return (
        <div id="dashboard__main">

            <Route path="/" component={newPrescriptionsTable}/>

        </div>
    )
}

export default Dashboard
