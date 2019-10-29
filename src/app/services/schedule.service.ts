import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import Schedule, { AdmitSchedule, ScheduleFilter } from '../shared/schedule.model';

@Injectable()
export class ScheduleService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Authorization', localStorage.getItem('token'));

    /**
     * getSchedules
     * @param filter?: ScheduleFilter
     */
    public getSchedules(filter?: ScheduleFilter): Observable<any> {
        let filterS = '';
        if (filter) {
            for (const key of Object.keys(filter)) {
                if (filter[key]) {
                    filterS += filterS === '' ? `?${key}=${filter[key]}` : `&${key}=${filter[key]}`;
                }
            }
        }
        return this.http.get(
            `${environment.urlApi}/agenda${filterS}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * getScheduleById
     * @param id: number
     */
    public getScheduleById(id: number): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/agenda/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * admitSchedule
     * @param id: number
     */
    public admitSchedule(id: number, admit: AdmitSchedule): Observable<any> {
        return this.http.patch(
            `${environment.urlApi}/agenda/${id}`,
            JSON.stringify(admit),
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * sendSchedule
     * @param schedule: Schedule
     * @param id?: number
     */
    public sendSchedule(schedule: Schedule, id?: number): Observable<any> {
        if (id) {
            return this.http.put(
                `${environment.urlApi}/agenda/${id}`,
                JSON.stringify(schedule),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        } else {
            return this.http.post(
                `${environment.urlApi}/agenda`,
                JSON.stringify(schedule),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        }
    }

    /**
     * deleteSchedule
     * @param id: number
     */
    public deleteSchedule(id: number): Observable<any> {
        return this.http.delete(
            `${environment.urlApi}/agenda/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
