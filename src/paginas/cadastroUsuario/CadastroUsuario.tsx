import React, { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import User from '../../models/User'
import { cadastroUsuario } from '../../services/Service'
import './CadastroUsuario.css'

import { Grid, Typography, TextField, Button } from '@material-ui/core'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function CadastroUsuario() {
  let navigate = useNavigate()

  const [confirmarSenha, setConfirmarSenha] = useState<String>('')
  const [user, setUser] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    /* foto: null,*/
    senha: ''
  })

  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    /*foto: null,*/
    senha: ''
  })

  useEffect(() => {
    if (userResult.id !== 0) {
      navigate('/logar')
    }
  }, [userResult])

  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (confirmarSenha === user.senha) {
      cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
      console.log(JSON.stringify(userResult))
      toast.success('Usuário cadastrado com sucesso', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'dark',
        progress: undefined
      })
    } else {
      toast.error(
        'Dados inconsistentes. Por favor verificar as informações de cadastro',
        {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
          progress: undefined
        }
      )
    }
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6} className="imagem2"></Grid>
      <Grid item xs={6} alignItems="center">
        <Box paddingX={10}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textos2"
            >
              Cadastrar
            </Typography>
            <TextField
              value={user.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="nome"
              label="nome"
              variant="outlined"
              name="nome"
              margin="normal"
              fullWidth
            />
            <TextField
              value={user.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="usuário"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              value={user.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              type={'password'}
              margin="normal"
              fullWidth
            />
            <TextField
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                confirmarSenhaHandle(e)
              }
              id="confirmarSenha"
              label="confirmar senha"
              variant="outlined"
              name="confirmarSenha"
              type={'password'}
              margin="normal"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Link to="/logar" className="text-decorator-none">
                <Button variant="contained" className="btnCancelar">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                className="btnCadastrar"
              >
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CadastroUsuario
