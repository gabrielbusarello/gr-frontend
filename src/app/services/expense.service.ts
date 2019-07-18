import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import Expense from '../shared/expense.model';

@Injectable()
export class ExpenseService {
    constructor( private http: HttpClient ) { }

    private headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Authorization', localStorage.getItem('token'));

    /**
     * getExpenses
     */
    public getExpenses(): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/despesa`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * getExpenseById
     * @param id: number
     */
    public getExpenseById(id: number): Observable<any> {
        return this.http.get(
            `${environment.urlApi}/despesa/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }

    /**
     * sendExpense
     * @param expense: Expense
     * @param id?: number
     */
    public sendExpense(expense: Expense, id?: number): Observable<any> {
        if (id) {
            return this.http.put(
                `${environment.urlApi}/despesa/${id}`,
                JSON.stringify(expense),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        } else {
            return this.http.post(
                `${environment.urlApi}/despesa`,
                JSON.stringify(expense),
                { headers: this.headers }
            ).pipe(
                map((response: HttpResponse<Observable<any>>) => response)
            );
        }
    }

    /**
     * deleteExpense
     * @param id: number
     */
    public deleteExpense(id: number): Observable<any> {
        return this.http.delete(
            `${environment.urlApi}/despesa/${id}`,
            { headers: this.headers }
        ).pipe(
            map((response: HttpResponse<Observable<any>>) => response)
        );
    }
}
