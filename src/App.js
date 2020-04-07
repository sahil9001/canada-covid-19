import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Graph from './Components/Graph/Graph';
import Navbar from './Components/NavBar/Navbar'
function App() {
  return (
    <div>
        <Navbar/>
        <Dashboard/>
    </div>
  );
}

export default App;
