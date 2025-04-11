export interface ITransacaoDTO {
  transacoes: {
    id: string;
    nome: string;
    categoria: {
      id: string;
      tipo: string;
    };
    valor: number;
    dataTransacao: string;
  }[];
  receitas: number;
  despesas: number;
  total: number;
}


export interface ITransacaoTable {
  id: string;
  nome: string;
  tipoCategoria: string;
  valor: number;
  dataTransacao: string;
}

export interface ITransacaoRequest {
  nome: string;
  categoriaId: string;
  clienteId: string;
  valor: number;
  dataTransacao: string;
}