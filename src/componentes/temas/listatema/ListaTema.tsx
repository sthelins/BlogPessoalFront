import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import { Box } from '@mui/material'
import './ListaTema.css'
import { busca } from '../../../services/Service'
import useLocalStorage from 'react-use-localstorage'
import Tema from '../../../models/Tema'
import { toast } from 'react-toastify'

function ListaTema() {
  const [tema, setTema] = useState<Tema[]>([])
  const [token, setToken] = useLocalStorage('token')
  let navigate = useNavigate()

  useEffect(() => {
    if (token === '') {
      toast.error('Você precisa estar logado', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined
      })
      navigate('/logar')
    }
  }, [token])

  async function getTema() {
    await busca('/tema', setTema, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [tema.length])

  return (
    <>
      {tema.map(tema => (
        <Box m={2} key={tema.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tema
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/formularioTema/${tema.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="marginLeft"
                      size="small"
                      color="primary"
                    >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarTema/${tema.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button variant="contained" size="small" color="secondary">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  )
}
export default ListaTema
