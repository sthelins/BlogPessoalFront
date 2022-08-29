import React from 'react';
import Navbar from './componentes/estaticos/navbar/Navbar'
import Footer from './componentes/estaticos/footer/Footer'
import {Grid} from '@material-ui/core';
import logo from './logo.svg';
import Home from './paginas/home/Home'
import './App.css';

function App() {
  return (
      <>
          <Navbar />
          <Home />
          <Footer />
      </>
    );
}

export default App;
