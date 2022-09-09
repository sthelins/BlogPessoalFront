import { Action } from './actions';

export interface TokenState {
  tokens: string
}

const initialState = {
  tokens: "" //valor inicial vazio
}
                             //vazia tbm
export const tokenReducer = (state: TokenState = initialState, action : Action) => {
  switch(action.type) {
    case "ADD_TOKEN" : {
      return {tokens: action.payload} //chamada a de action.ts - o token em si
    }

    default:
      return state //retorna o estado original q é vazio
  }
}