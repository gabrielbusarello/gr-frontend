import { UserResponse } from './user.model';

export default class Schedule {
    constructor(
        private descricao: string,
        private data: string,
        private hora: number,
        private status: string
    ) { }
}

export interface ScheduleResponse {
    id: number;
    nome: string;
    descricao: string;
    valorEstimado: number;
    criacao: string;
    alteracao: string;
    usuario: UserResponse;
}
