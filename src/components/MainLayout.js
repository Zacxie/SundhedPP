import Navbar from '../components/navbar/Navbar'
import Nav from './Nav';
import Dashboard from './Dashboard';
import Footer from './Footer'

import '../main/webapp/styling/reset.css';
import '../main/webapp/styling/MainLayout.css';
import Header from "./Header";

const MainLayout = ({overlay}) => {
    return (

        <div className="rootLayout">
            <Header></Header>
            <Nav />
            <Dashboard />
            <Footer />
            {overlay}
        </div>
    )
}

export default MainLayout
