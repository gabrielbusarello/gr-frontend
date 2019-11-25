import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import Chat from '../shared/chat.model';

@Injectable()
export class ChatService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Authorization', localStorage.getItem('token'));

    /**
     * getMessages
     */
    public getMessages(idSchedule: number): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/mensagem?idAgenda=${idSchedule}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * sendMessage
     */
    public sendMessage(chat: Chat): Observable<any> {
        return this.http.post(
            `${environment.urlApi}/mensagem`,
            JSON.stringify(chat),
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
