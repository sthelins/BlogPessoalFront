import React, { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent
} from '@material-ui/core'
import './DeletarPostagem.css'
import Postagem from '../../../models/Postagem'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { buscaId, deleteId } from '../../../services/Service'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokenReducer'

function DeletarPostagem() {
  let navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const token = useSelector<TokenState, TokenState['tokens']>(
    state => state.tokens
  )

  const [postagem, setPostagem] = useState<Postagem>()

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

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  async function findById(id: string) {
    buscaId(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token
      }
    })
  }

  function sim() {
    navigate('/postagens') /*rota do front*/
    deleteId(`/postagens/${id}`, {
      /*rota do back*/
      headers: {
        Authorization: token
      }
    })
    toast.success('Postagem deletada com sucesso', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: 'dark',
      progress: undefined
    })
  }

  function nao() {
    navigate('/postagens') /*rota do front*/
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary">{postagem?.titulo}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="btnSim"
                  size="large"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  className="btnNao"
                >
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}
export default DeletarPostagem
