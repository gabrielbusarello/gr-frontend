import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { ServiceTypeService } from '../../services/service-type.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ServiceTypeResponse } from 'src/app/shared/service-type.model';
import { DefaultResponse } from 'src/app/shared/app.model';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.sass'],
  providers: [ ServiceTypeService ]
})
export class ServiceTypeComponent implements OnInit {

  public serviceTypes: Array<ServiceTypeResponse>;

  constructor( private serviceTypeService: ServiceTypeService, private modalService: NgbModal, private utils: UtilsService ) { }

  ngOnInit() {
    this.getServiceTypes();
  }

  private getServiceTypes(): void {
    this.serviceTypeService.getServiceTypes()
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<ServiceTypeResponse>>) => {
          this.serviceTypes = response.data;

          if (response.status !== 1) {
            this.utils.showToast(response.status, response.mensagem);
            this.serviceTypes = [];
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
        this.serviceTypeService.deleteServiceType(id)
          .subscribe(
            (response: DefaultResponse<ServiceTypeResponse>) => {
              this.utils.showToast(response.status, response.mensagem);
              this.getServiceTypes();
            },
            (err: HttpErrorResponse) => {
              this.utils.showToast(err.error.status, err.error.mensagem || err.message);
            }
          );
      }
    }, () => {});
  }

}
