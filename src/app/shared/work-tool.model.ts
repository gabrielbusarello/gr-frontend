import { UserResponse } from './user.model';

export default class WorkTool {
    constructor(
        private nome: string,
        private dtUltimoReparo: string,
        private proximoReparo: number
    ) { }
}

export interface WorkToolResponse {
    id: number;
    nome: string;
    dtUltimoReparo: string;
    proximoReparo: number;
    criacao: string;
    alteracao: string;
    usuario: UserResponse;
}
