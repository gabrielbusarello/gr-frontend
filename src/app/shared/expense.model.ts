import { UserResponse } from './user.model';

export default class Expense {
    constructor(
        private nome: string,
        private descricao: string,
        private data: string,
        private hora: string,
        private valor: number
    ) { }
}

export interface ExpenseResponse {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    data: string;
    hora: string;
    criacao: string;
    alteracao: string;
    usuario: UserResponse;
}
