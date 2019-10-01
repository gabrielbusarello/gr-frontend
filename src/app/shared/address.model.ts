export default class Address {
    constructor(
        private id?: number,
        private cep?: string,
        private logradouro?: string,
        private numero?: string,
        private complemento?: string,
        private bairro?: string,
        private cidade?: string,
        private estado?: string
    ) { }
}

export interface AddressResponse {
    id: number;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    criacao: string;
    alteracao: string;
}
