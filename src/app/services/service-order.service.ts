import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import ServiceOrder from '../shared/service-order.model';

@Injectable()
export class ServiceOrderService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Authorization', localStorage.getItem('token'));

    /**
     * getServiceOrders
     */
    public getServiceOrders(): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/ordem-servico`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * getServiceOrderById
     * @param id: number
     */
    public getServiceOrderById(id: number): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/ordem-servico/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * sendServiceOrder
     * @param serviceOrder: ServiceOrder
     * @param id?: number
     */
    public sendServiceOrder(serviceOrder: ServiceOrder, id?: number): Observable<any> {
        if (id) {
            return this.http.put(
                `${environment.urlApi}/ordem-servico/${id}`,
                JSON.stringify(serviceOrder),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        } else {
            return this.http.post(
                `${environment.urlApi}/ordem-servico`,
                JSON.stringify(serviceOrder),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        }
    }

    /**
     * deleteServiceOrder
     * @param id: number
     */
    public deleteServiceOrder(id: number): Observable<any> {
        return this.http.delete(
            `${environment.urlApi}/ordem-servico/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
