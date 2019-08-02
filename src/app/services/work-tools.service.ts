import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import WorkTool from '../shared/work-tool.model';

@Injectable()
export class WorkToolService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Authorization', localStorage.getItem('token'));

    /**
     * getWorkTools
     */
    public getWorkTools(): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/ferramenta`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * getWorkToolById
     * @param id: number
     */
    public getWorkToolById(id: number): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/ferramenta/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * sendWorkTool
     * @param workTool: WorkTool
     * @param id?: number
     */
    public sendWorkTool(workTool: WorkTool, id?: number): Observable<any> {
        if (id) {
            return this.http.put(
                `${environment.urlApi}/ferramenta/${id}`,
                JSON.stringify(workTool),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        } else {
            return this.http.post(
                `${environment.urlApi}/ferramenta`,
                JSON.stringify(workTool),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        }
    }

    /**
     * deleteWorkTool
     * @param id: number
     */
    public deleteWorkTool(id: number): Observable<any> {
        return this.http.delete(
            `${environment.urlApi}/ferramenta/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
