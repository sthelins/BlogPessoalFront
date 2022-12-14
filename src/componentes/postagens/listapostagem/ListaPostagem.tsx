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
import './ListaPostagem.css'
import Postagem from '../../../models/Postagem'
import { busca } from '../../../services/Service'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokenReducer'
import { toast } from 'react-toastify'

function ListaPostagem() {
  const [postagens, setPostagens] = useState<Postagem[]>([])
  let navigate = useNavigate()

  const token = useSelector<TokenState, TokenState['tokens']>(
    state => state.tokens
  )

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logado', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'dark',
        progress: undefined
      })
      navigate('/logar')
    }
  }, [token])

  async function getPostagens() {
    await busca('/postagens', setPostagens, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getPostagens()
  }, [postagens.length])

  return (
    <>
      {postagens.map(postagens => (
        <Box m={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Postagem
              </Typography>
              <Typography variant="h5" component="h2">
                {postagens.titulo}
              </Typography>
              <Typography variant="body2" component="p">
                {postagens.texto}
              </Typography>
              <Typography variant="body2" component="p">
                {postagens.tema?.descricao}
              </Typography>
            </CardContent>

            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/formularioPostagem/${postagens.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      size="small"
                      className="btnAtualizar"
                    >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarPostagem/${postagens.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      size="small"
                      className="btnDeletar"
                    >
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

export default ListaPostagem
