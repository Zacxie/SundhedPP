import Prescription from "./prescriptions/Prescription";
import {HashRouter, Route, Switch} from "react-router-dom";
import NewPrescriptionTable from './prescriptions/newPrescriptionTable'

import '../styling/Dashboard.css'

const Dashboard = () => {
    return (
        <div id="dashboard__main">
            {/*<Search />*/}
            <NewPrescriptionTable/>
        </div>
    )
}

export default Dashboard
