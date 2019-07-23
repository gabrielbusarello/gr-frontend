import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DatePickerFormatter extends NgbDateParserFormatter  {

    /**
     * padNumber
     * @param value: number
     */
    private padNumber(value: number) {
        if (this.isNumber(value)) {
            return `0${value}`.slice(-2);
        } else {
            return '';
        }
    }

    /**
     * isNumber
     * @param value: any
     */
    private isNumber(value: any): boolean {
        return !Number.isNaN(this.toInteger(value));
    }

    /**
     * toInteger
     * @param value: string
     */
    private toInteger(value: string): number {
        return Number.parseInt(`${value}`, 10);
    }

    /**
     * dateMask
     * @param date: string
     */
    private dateMask(date: string): string {
        let formatedDate: string;
        formatedDate = date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        return formatedDate;
    }

    /**
     * parse
     * @param value: string
     */
    public parse(value: string): NgbDateStruct {
        if (value) {
            value = this.dateMask(value);
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
                return {year: this.toInteger(dateParts[0]), month: null, day: null};
            } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
                return {year: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), day: null};
            } else if (
                dateParts.length === 3 &&
                this.isNumber(dateParts[0]) &&
                this.isNumber(dateParts[1]) &&
                this.isNumber(dateParts[2])
            ) {
                return {year: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), day: this.toInteger(dateParts[0])};
            }
        }
        return null;
    }

    /**
     * parseFromAPI
     * @param value: string
     */
    public parseFromAPI(value: string): NgbDateStruct {
        if (value) {
            const dateS: Array<string> = value.split('-');
            const dateBR = dateS[2] + '/' + dateS[1] + '/' + dateS[0];
            return this.parse(dateBR);
        }
        return null;
    }

    /**
     * format
     * @param date: NgbDateStruct
     */
    public format(date: NgbDateStruct): string {
        let stringDate = '';
        if (date) {
            stringDate += this.isNumber(date.day) ? this.padNumber(date.day) + '/' : '';
            stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + '/' : '';
            stringDate += date.year;
        }
        return stringDate;
    }

    /**
     * format
     * @param date: NgbDateStruct
     */
    public formatToAPI(date: NgbDateStruct): string {
        let stringDate = '';
        if (date) {
            stringDate += this.isNumber(date.year) ? date.year + '-' : '';
            stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + '-' : '';
            stringDate += this.isNumber(date.day) ? this.padNumber(date.day) : '';
        }
        return stringDate;
    }
}
