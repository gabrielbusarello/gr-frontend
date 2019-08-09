import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import ServiceType from '../shared/service-type.model';

@Injectable()
export class ServiceTypeService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Authorization', localStorage.getItem('token'));

    /**
     * getServiceTypes
     */
    public getServiceTypes(): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/tipo-servico`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * getServiceTypeById
     * @param id: number
     */
    public getServiceTypeById(id: number): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/tipo-servico/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * sendServiceType
     * @param serviceType: ServiceType
     * @param id?: number
     */
    public sendServiceType(serviceType: ServiceType, id?: number): Observable<any> {
        if (id) {
            return this.http.put(
                `${environment.urlApi}/tipo-servico/${id}`,
                JSON.stringify(serviceType),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        } else {
            return this.http.post(
                `${environment.urlApi}/tipo-servico`,
                JSON.stringify(serviceType),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        }
    }

    /**
     * deleteServiceType
     * @param id: number
     */
    public deleteServiceType(id: number): Observable<any> {
        return this.http.delete(
            `${environment.urlApi}/tipo-servico/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
