import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import Address from '../shared/address.model';

@Injectable()
export class AddressService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Authorization', localStorage.getItem('token'));

    /**
     * getAddress
     */
    public getAddress(): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/endereco`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
