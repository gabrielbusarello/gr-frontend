import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import User from '../shared/user.model';

@Injectable()
export class AuthenticationService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*');

    /**
     * registerUser
     * @param user: User
     * @param id?: number
     */
    public registerUser(user: User): Observable<any> {
        return this.http.post(
            `${environment.urlApi}/register`,
            JSON.stringify(user),
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * authUser
     * @param username: string
     * @param password: string
     */
    public authUser(username: string, password: string): Observable<any> {
        const auth: { username: string, password: string } = {
            username,
            password
        };
        return this.http.post(
            `${environment.urlApi}/authenticate`,
            JSON.stringify(auth),
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * isAuthenticated
     */
    public isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}
