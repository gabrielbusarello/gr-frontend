import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilsService {

    constructor( private toastr: ToastrService, private router: Router ) { }

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
            case 400:
            case 401:
            case 403:
                this.toastr.error(message, `Erro`);
                localStorage.clear();
                this.router.navigate(['/login']);
                break;
            default:
                this.toastr.warning(message, `Atenção`);
        }
    }

}
