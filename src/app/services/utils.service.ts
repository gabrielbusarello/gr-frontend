import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilsService {

    constructor( private toastr: ToastrService ) { }

    /**
     * showToast - Método para disparar os toasts na tela.
     * @param code: number
     * @param message: string
     */
    public showToast(code: number, message: string): void {
        switch (code) {
            case 1:
                this.toastr.success(message, `Sucesso`);
                break;
            case 2:
                this.toastr.info(message, `Informação`);
                break;
            case 3:
                this.toastr.error(message, `Erro`);
                break;
            default:
                this.toastr.warning(message, `Atenção`);
        }
    }

}
