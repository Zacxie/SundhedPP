import Header from './Header';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Footer from './Footer'

import '../styling/reset.css';
import '../styling/MainLayout.css';

const MainLayout = ({overlay}) => {
    return (
        <div className="rootLayout">
            <Header />
            <Nav />
            <Dashboard />
            <Footer />
            {overlay}
        </div>
    )
}

export default MainLayout
