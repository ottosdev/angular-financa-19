export interface IClientDTO {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: {
    id: string;
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
}


