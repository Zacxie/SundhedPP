import Dashboard from './Dashboard';
import Footer from './Footer'

import '../styling/reset.css';
import '../styling/MainLayout.css';
import Header from "./Header";

const MainLayout = ({overlay} , select) => {
    return (

        <div className="rootLayout">
            <Header/>
            <Dashboard select={select}/>
            <Footer/>
            {overlay}
        </div>
    )
}

export default MainLayout
