import { DefaultId } from './app.model';
import { UserResponse } from './user.model';
import { ScheduleResponse } from './schedule.model';

export default class Chat {
    constructor(
        private mensagem: string,
        private agenda: DefaultId
    ) { }
}

export interface ChatResponse {
    id: number;
    mensagem: string;
    criacao: string;
    usuario: UserResponse;
    Agenda: ScheduleResponse;
}
