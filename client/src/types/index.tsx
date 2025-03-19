export type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  disponivel: boolean;
  promocao: boolean;
  desconto: number;
  validoAte: string;
  ativa: boolean;
  qtdPessoas: number;
  mesa: string;
  status: string;
  horario: string;
  data: string;
  nomeCliente: string;
  telefoneCliente: string;
  emailCliente: string;
  observacoes: string;
  pagamento: string;
  formaPagamento: string;
  valorTotal: number;
  valorFinal: number;
  statusPagamento: string;
  statusPedido: string;
  tipoPagamento: string;
};

export type Promocao = {
  id: number;
  titulo: string;
  descricao: string;
  desconto: number;
  validoAte: string;
  ativa: boolean;
};

export type Reserva = {
  id: number;
  nome: string;
  data: string;
  horario: string;
  mesa: string;
  status: string;
};

export type Pedido = {
  id: number;
  nome: string;
  data: string;
  horario: string;
  mesa: string;
  status: string;
};

   // types.ts
   export interface Vaga {
    id: number;
    titulo: string;
    tipo: string;
    local: string;
    descricao: string;
    requisitos: string[];
    beneficios: string[];
}
export interface Horario {
  hora: string;
  disponivel: boolean;
}

export interface Mesa {
  horarios: Horario[]; // Ensure this is defined
  id: number;
  numero: string;
  status: 'disponivel' | 'ocupada' | 'selecionada';
  posicao: {
    x: number;
    y: number;
  };
  capacidade: number;
};


