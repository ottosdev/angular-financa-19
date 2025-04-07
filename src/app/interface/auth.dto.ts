export interface ILoginDTO {
  cpf: string;
  senha: string;
}

export interface IAuthResponse {
  nome: string;
  token: string;
}

export interface IRegisterDTO {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
}
