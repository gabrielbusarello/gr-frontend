import { UserResponse } from './user.model';

export default class ServiceType {
    constructor(
        private nome: string,
        private descricao: string,
        private valorEstimado: number
    ) { }
}

export interface ServiceTypeResponse {
    id: number;
    nome: string;
    descricao: string;
    valorEstimado: number;
    criacao: string;
    alteracao: string;
    usuario: UserResponse;
}
