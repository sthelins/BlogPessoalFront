//regras de negocios
//onde iremos fazer as requisições no back end

import axios from "axios";

export const api = axios.create({
    baseURL: 'https://bloggpessoalspring.herokuapp.com/' //base(unica) url, url do meu backend do blog
})

  export const cadastroUsuario = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
  }

  //url seria o /usuario/login
  //dados do usuario na interface

  export const login = async(url: any, dados: any, setDados: any) => {
      const resposta = await api.post(url, dados)
      setDados(resposta.data.token)
  }