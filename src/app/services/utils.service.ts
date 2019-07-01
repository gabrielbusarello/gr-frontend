import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilsService {

    constructor( private toastr: ToastrService ) { }

    public showToast(code: number, message: string): void {
        switch (code) {
            case 1:
                this.toastr.success(`Sucesso`, message);
                break;
            case 2:
                this.toastr.info(`Informação`, message);
                break;
            case 3:
                this.toastr.error(`Erro`, message);
                break;
            default:
                this.toastr.warning(`Atenção`, message);
        }
    }

}
