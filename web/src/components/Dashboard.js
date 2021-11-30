
import newPrescriptionsTable from "./prescriptions/newPrescriptionTable";
import {Route} from "react-router-dom";

import '../styling/Dashboard.css'

const Dashboard = () => {
    return (
        <div id="dashboard__main">

            <Route path="/" component={newPrescriptionsTable}/>

        </div>
    )
}

export default Dashboard
