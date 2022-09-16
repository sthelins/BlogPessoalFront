import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import Tema from '../../../models/Tema'
import Postagem from '../../../models/Postagem'
import { busca, buscaId, post, put } from '../../../services/Service'
import './CadastroPostagem.css'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokenReducer'

function CadastroPostagem() {
  let navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [temas, setTemas] = useState<Tema[]>([])

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
        theme: 'colored',
        progress: undefined
      })
      navigate('/logar')
    }
  }, [token])

  /* armazernar um tema especifico*/
  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  })
  /*efetuar o cadastro das postagens*/
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    tema: null,
    usuario: {
      id: 1,
      nome: '',
      usuario: '',
      senha: ''
    }
  })

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema
    })
  }, [tema])

  useEffect(() => {
    getTemas()
    if (id !== undefined) {
      findByIdPostagem(id)
    }
  }, [id])

  async function getTemas() {
    await busca('/tema', setTemas, {
      headers: {
        Authorization: token
      }
    })
  }

  async function findByIdPostagem(id: string) {
    await buscaId(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token
      }
    })
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    // Se o ID for diferente de indefinido tente Atualizar
    if (id !== undefined) {
      // TRY: Tenta executar a atualização
      try {
        await put(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })

        toast.success('Postagem atualizada com sucesso', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: 'colored',
          progress: undefined
        })

        // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
      } catch (error) {
        console.log(`Error: ${error}`)
        toast.warning(
          'Erro, por favor verifique a quantidade minima de caracteres',
          {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'colored',
            progress: undefined
          }
        )
      }

      // Se o ID for indefinido, tente Cadastrar
    } else {
      // TRY: Tenta executar o cadastro
      try {
        await post(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })

        toast.success('Postagem cadastrada com sucesso', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: 'colored',
          progress: undefined
        })

        // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
      } catch (error) {
        console.log(`Error: ${error}`)
        toast.warning(
          'Erro, por favor verifique a quantidade minima de caracteres',
          {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'colored',
            progress: undefined
          }
        )
      }
    }

    back()
  }

  function back() {
    navigate('/postagens')
  }

  return (
    <Container maxWidth="sm" className="topo">
      <form onSubmit={onSubmit}>
        <Typography
          variant="h3"
          color="textSecondary"
          component="h1"
          align="center"
        >
          Formulário de cadastro postagem
        </Typography>
        <TextField
          value={postagem.titulo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
          id="titulo"
          label="titulo"
          variant="outlined"
          name="titulo"
          margin="normal"
          fullWidth
        />
        <TextField
          value={postagem.texto}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
          id="texto"
          label="texto"
          name="texto"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={e =>
              buscaId(`/tema/${e.target.value}`, setTema, {
                headers: {
                  Authorization: token
                }
              })
            }
          >
            {temas.map(tema => (
              <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Escolha um tema para a postagem</FormHelperText>
          <Button type="submit" variant="contained" color="primary">
            Finalizar
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}
export default CadastroPostagem
