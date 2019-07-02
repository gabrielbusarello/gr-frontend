export interface DefaultResponse<T> {
    status: number;
    data: T;
    mensagem: string;
}
