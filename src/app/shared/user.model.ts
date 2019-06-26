export default class User {
    constructor(
        private matricula: string,
        private cpf: string,
        private nome: string,
        private email: string,
        private senha: string,
        private telefone: string,
        private permissao: string
    ) { }
}

export interface UserResponse {
    id: number;
    matricula: string;
    cpf: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    permissao: string;
    criacao: string;
    alteracao: string;
}
