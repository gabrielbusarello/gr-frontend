import { UserResponse } from './user.model';
import Address, { AddressResponse } from './address.model';
import { DefaultId } from './app.model';

export default class Schedule {
    constructor(
        private descricao: string,
        private data: string,
        private hora: number,
        private status: string,
        private endereco: Address
    ) { }
}

export class ScheduleFilter {
    constructor(
        private status?: string,
        private idPrestador?: number
    ) { }
}

export class AdmitSchedule {
    constructor(
        private status: string,
        private prestador: DefaultId
    ) { }
}

export interface ScheduleResponse {
    id: number;
    descricao: string;
    data: string;
    hora: string;
    status: string;
    criacao: string;
    alteracao: string;
    usuario: UserResponse;
    endereco: AddressResponse;
}
