export type Action = {type: 'ADD_TOKEN'; payload: string}; 
/* 1º propriedade é o tipo da Action/ação*/
/* 2º propriedade é informação que a action ta enviando*/

export const addToken = (token: string): Action => ({
  type: "ADD_TOKEN",
  payload: token,
}); /*ela que vai enviar a ação*/
