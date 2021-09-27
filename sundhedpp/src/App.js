import MainLayout from './components/MainLayout'
import './styling/App.css';
import React from 'react';
import Navbar from "./components/navbar/Navbar";

function App() {


  return (
    <div className="container">
        <Navbar></Navbar>
      <MainLayout />
    </div>
  );
}

export default App;
