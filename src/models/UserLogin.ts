/* usada para fazer a conexão com login*/

interface UserLogin {
  id: number
  usuario: string
  senha: string
  token?: string | null
}

export default UserLogin
