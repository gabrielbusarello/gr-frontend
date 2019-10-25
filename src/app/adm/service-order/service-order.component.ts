import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { ServiceOrderService } from 'src/app/services/service-order.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ServiceOrderResponse } from 'src/app/shared/service-order.model';
import { DefaultResponse } from 'src/app/shared/app.model';

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.sass'],
  providers: [ ServiceOrderService ]
})
export class ServiceOrderComponent implements OnInit {

  public serviceOrders: Array<ServiceOrderResponse>;

  constructor( private serviceOrderService: ServiceOrderService, private modalService: NgbModal, private utils: UtilsService ) { }

  public status: any = {
    P: 'Pendente',
    F: 'Finalizado',
    C: 'Cancelado'
  };

  ngOnInit() {
    this.getServiceOrder();
  }

  /**
   * getServiceOrder
   */
  private getServiceOrder(): void {
    this.serviceOrderService.getServiceOrders()
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<ServiceOrderResponse>>) => {
          this.serviceOrders = response.data;

          if (response.status !== 1) {
            this.utils.showToast(response.status, response.mensagem);
            this.serviceOrders = [];
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

  /**
   * delete
   * @param id: number
   * @param name: string
   */
  public delete(id: number, name: string) {
    const modal = this.modalService.open(DeleteComponent, { centered: true });
    modal.componentInstance.name = name;
    modal.result.then(resultado => {
      if (resultado.status) {
        this.serviceOrderService.deleteServiceOrder(id)
          .subscribe(
            (response: DefaultResponse<ServiceOrderResponse>) => {
              this.utils.showToast(response.status, response.mensagem);
              this.getServiceOrder();
            },
            (err: HttpErrorResponse) => {
              this.utils.showToast(err.error.status, err.error.mensagem || err.message);
            }
          );
      }
    }, () => {});
  }

}
