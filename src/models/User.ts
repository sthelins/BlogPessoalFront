/* utilizada para fazer o componente de cadastro*/

interface User{
  id: number,
  nome: string,
  usuario: string,
  foto?: string | null,
  senha: string
}

export default User