import React from 'react';
import Navbar from './componentes/estaticos/navbar/Navbar'
import Footer from './componentes/estaticos/footer/Footer'
import {Grid} from '@material-ui/core';
import logo from './logo.svg';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
      <>
      <Router> {/* Satélite */}
          <Navbar />
          <div style={{ minHeight: '100vh' }}>
            <Routes> {/* GPS */}

                 <Route path="/" element={<Login />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/home" element={<Home />} />
              {/*<Route path="/cadastro" element={<CadastroUsuario />} />*/}
            </Routes>
            </div>
          
          <Footer />
      </Router>
          
      </>
    );
}

export default App;
