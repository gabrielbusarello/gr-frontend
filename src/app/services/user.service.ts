import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import User from '../shared/user.model';

@Injectable()
export class UserService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*');

    /**
     * getUsers
     */
    public getUsers(): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/usuario`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * getUserById
     * @param id: number
     */
    public getUserById(id: number): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/usuario/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * sendUser
     * @param user: User
     * @param id?: number
     */
    public sendUser(user: User, id?: number): Observable<any> {
        if (id) {
            return this.http.put(
                `${environment.urlApi}/usuario/${id}`,
                JSON.stringify(user),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        } else {
            return this.http.post(
                `${environment.urlApi}/usuario`,
                JSON.stringify(user),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        }
    }

    public deleteUser(id: number): Observable<any> {
        return this.http.delete(
            `${environment.urlApi}/usuario/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
