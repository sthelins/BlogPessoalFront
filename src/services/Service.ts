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

  export const busca = async(url: any, setDado: any, header: any) => {
    const resposta = await api.get(url, header)
    setDado(resposta.data)
}

export const buscaId = async(url: any,setDado: any, header: any) => { 
    const resposta = await api.get(url,header)
    setDado(resposta.data)
}

export const post = async(url: any, dados: any, setDado: any, header: any) => { 
    const resposta = await api.post(url,dados,header)
    setDado(resposta.data)
}

export const put = async(url: any, dados: any, setDado: any, header: any) => { 
    const resposta = await api.put(url,dados,header)
    setDado(resposta.data)
}

export const deleteId = async(url: any,header: any) => { 
    await api.delete(url,header)
}