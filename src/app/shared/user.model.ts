import Address, { AddressResponse } from './address.model';

export default class User {
    constructor(
        private cpf: string,
        private nome: string,
        private email: string,
        private senha: string,
        private telefone: string,
        private permissao: string,
        private endereco?: Address
    ) { }
}

export interface UserResponse {
    id: number;
    cpf: string;
    nome: string;
    email: string;
    telefone: string;
    permissao: string;
    criacao: string;
    alteracao: string;
    endereco: AddressResponse;
}

export interface AuthResponse {
    token: string;
    usuario: UserResponse;
}
