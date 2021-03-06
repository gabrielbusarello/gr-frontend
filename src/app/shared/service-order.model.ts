import { UserResponse } from './user.model';
import { DefaultId } from './app.model';
import { ScheduleResponse } from './schedule.model';
import { ServiceTypeResponse } from './service-type.model';

export default class ServiceOrder {
    constructor(
        private maoDeObra: number,
        private descricao: string,
        private data: string,
        private hora: string,
        private status: string,
        private agenda: DefaultId,
        private produto: Array<Product>,
        private servico: Array<Service>
    ) { }
}

export class Product {
    constructor(
        private nome: string,
        private valor: number,
        private quantidade: number
    ) { }
}

export class Service {
    constructor(
        private descricao: string,
        private tempoGasto: string,
        private tipoServico: DefaultId
    ) { }
}

export interface ServiceOrderResponse {
    id: number;
    maoDeObra: number;
    descricao: string;
    data: string;
    hora: string;
    status: string;
    criacao: string;
    alteracao: string;
    agenda: ScheduleResponse;
    produto: Array<ProductResponse>;
    servico: Array<ServiceResponse>;
    prestador: UserResponse;
}

export interface ProductResponse {
    id: number;
    nome: string;
    valor: number;
    quantidade: number;
    criacao: string;
    alteracao: string;
}

export interface ServiceResponse {
    id: number;
    descricao: string;
    tempoGasto: string;
    criacao: string;
    alteracao: string;
    tipoServico: ServiceTypeResponse;
}
