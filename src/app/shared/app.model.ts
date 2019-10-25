export interface DefaultResponse<T> {
    status: number;
    data: T;
    mensagem: string;
}

export class DefaultId {
    constructor(
        private id: number
    ) { }
}

// '[0-9]*(,[0-9]{2})?'
export const PRICE_REGEXP: RegExp = /^\d*(,\d{2})?$/;
