import Search from '../pages/Search'
import PrescriptionsTable from "./prescriptions/PrescriptionsTable";
import '../styling/Dashboard.css'

const Dashboard = () => {
    return (
        <div id="dashboard__main">
            <h3>Dashboard</h3>
            {/*<Search />*/}
            <PrescriptionsTable />
        </div>
    )
}

export default Dashboard
