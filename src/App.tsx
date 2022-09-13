import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Footer from './componentes/estaticos/footer/Footer'
import Navbar from './componentes/estaticos/navbar/Navbar'
import CadastroPost from './componentes/postagens/deletarPostagem/DeletarPostagem'
import DeletarPostagem from './componentes/postagens/deletarPostagem/DeletarPostagem'
import ListaPostagem from './componentes/postagens/listapostagem/ListaPostagem'
import CadastroTema from './componentes/temas/cadastroTema/CadastroTema'
import DeletarTema from './componentes/temas/deletarTema/DeletarTema'
import ListaTema from './componentes/temas/listatema/ListaTema'
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario'
import Home from './paginas/home/Home'
import Login from './paginas/login/Login'
import { Provider } from 'react-redux'
import store from './store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/logar" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrar" element={<CadastroUsuario />} />
            <Route path="/tema" element={<ListaTema />} />
            <Route path="/postagens" element={<ListaPostagem />} />
            <Route
              /*exact*/ path="/formularioPostagem"
              element={<CadastroPost />}
            />
            <Route
              /*exact*/ path="/formularioPostagem/:id"
              element={<CadastroPost />}
            />
            <Route
              /*exact*/ path="/formularioTema"
              element={<CadastroTema />}
            />
            <Route
              /*exact*/ path="/formularioTema/:id"
              element={<CadastroTema />}
            />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
