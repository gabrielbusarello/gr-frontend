import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import ServiceType, { ServiceTypeResponse } from 'src/app/shared/service-type.model';
import { DefaultResponse, PRICE_REGEXP } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-service-type',
  templateUrl: './edit-service-type.component.html',
  styleUrls: ['./edit-service-type.component.sass'],
  providers: [ ServiceTypeService ]
})
export class EditServiceTypeComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({
    id:             new FormControl({ value: null, disabled: true }),
    name:           new FormControl(null, [ Validators.required, Validators.maxLength(80) ]),
    description:    new FormControl(null, [ Validators.maxLength(1000) ]),
    estimatedPrice: new FormControl(null, [ Validators.required, Validators.maxLength(8), Validators.pattern(PRICE_REGEXP) ])
  });

  private subRoute: Subscription;
  public new: boolean;
  public blockSend: boolean;

  constructor(
    private route: ActivatedRoute,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.new = false;
        this.getServiceTypeById(param.id);
      } else {
        this.new = true;
      }
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  private getServiceTypeById(id: number): void {
    this.serviceTypeService.getServiceTypeById(id)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ServiceTypeResponse>) => {
          if (response.status === 1) {
            this.form.controls.id.setValue(response.data.id, { onlySelf: true });
            this.form.controls.name.setValue(response.data.nome, { onlySelf: true });
            this.form.controls.description.setValue(response.data.descricao, { onlySelf: true });
            this.form.controls.estimatedPrice.setValue(response.data.valorEstimado.toString().replace('.', ','), { onlySelf: true });
          } else {
            this.utils.showToast(response.status, response.mensagem);
            this.router.navigate(['/tipo-servico']);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
          this.router.navigate(['/tipo-servico']);
        }
      );
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const serviceType: ServiceType = new ServiceType(
      this.form.controls.name.value,
      this.form.controls.description.value,
      this.form.controls.estimatedPrice.value.replace(',', '.')
    );

    this.serviceTypeService.sendServiceType(serviceType, this.form.controls.id.value)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ServiceTypeResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.router.navigate(['/tipo-servico']);
        },
        (err: HttpErrorResponse) => {
          this.blockSend = false;
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

}
