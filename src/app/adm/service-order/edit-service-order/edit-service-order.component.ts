import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ServiceOrderService } from 'src/app/services/service-order.service';
import ServiceOrder, { Product, Service, ServiceOrderResponse, ProductResponse, ServiceResponse } from 'src/app/shared/service-order.model';
import { DefaultResponse, PRICE_REGEXP, DefaultId } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePickerFormatter } from 'src/app/shared/date-picker-formatter.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleFilter, ScheduleResponse } from 'src/app/shared/schedule.model';
import { ServiceTypeResponse } from 'src/app/shared/service-type.model';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-edit-service-order',
  templateUrl: './edit-service-order.component.html',
  styleUrls: ['./edit-service-order.component.sass'],
  providers: [ ServiceOrderService, ScheduleService, ServiceTypeService ]
})
export class EditServiceOrderComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({
    id:           new FormControl({ value: null, disabled: true }),
    schedule:     new FormControl(null, [ Validators.required ]),
    labor:        new FormControl(null, [ Validators.required, Validators.maxLength(10), Validators.pattern(PRICE_REGEXP)]),
    description:  new FormControl(null, [ Validators.required, Validators.maxLength(1000) ]),
    date:         new FormControl(null, [ Validators.required, Validators.maxLength(10) ]),
    hour:         new FormControl(null, [ Validators.required, Validators.maxLength(8) ]),
    products:     new FormArray([]),
    services:     new FormArray([])
  });

  private subRoute: Subscription;
  public new: boolean;
  public blockSend: boolean;

  public schedules: Array<ScheduleResponse>;
  public serviceTypes: Array<ServiceTypeResponse>;

  constructor(
    private route: ActivatedRoute,
    private serviceOrderService: ServiceOrderService,
    private scheduleService: ScheduleService,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
    private utils: UtilsService,
    private datePickerFormatter: DatePickerFormatter
  ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.new = false;
        this.getServiceOrderById(param.id);
      } else {
        this.new = true;
      }
    });
    const filter: ScheduleFilter = new ScheduleFilter(
      'A',
      Number.parseInt(localStorage.getItem('idUsuario'), 10)
    );
    this.scheduleService.getSchedules(filter)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<ScheduleResponse>>) => {
          if (response.status === 1) {
            this.schedules = response.data;
          } else {
            this.utils.showToast(response.status, response.mensagem);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
    this.serviceTypeService.getServiceTypes()
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<ServiceTypeResponse>>) => {
          if (response.status === 1) {
            this.serviceTypes = response.data;
          } else {
            this.utils.showToast(response.status, response.mensagem);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  /**
   * getServiceOrderById
   * @param id: number
   */
  private getServiceOrderById(id: number): void {
    this.serviceOrderService.getServiceOrderById(id)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ServiceOrderResponse>) => {
          if (response.status === 1) {
            this.form.controls.id.setValue(response.data.id, { onlySelf: true });
            this.form.controls.schedule.setValue(response.data.agenda.id, { onlySelf: true });
            this.form.controls.labor.setValue(response.data.maoDeObra.toFixed(2).replace('.', ','));
            this.form.controls.description.setValue(response.data.descricao, { onlySelf: true });
            this.form.controls.date.setValue(
              this.datePickerFormatter.parseFromAPI(response.data.data.split('T')[0]),
              { onlySelf: true }
            );
            this.form.controls.hour.setValue(response.data.hora, { onlySelf: true });

            for (const produto of response.data.produto) {
              this.addProduct(produto);
            }

            for (const servico of response.data.servico) {
              this.addService(servico);
            }
          } else {
            this.utils.showToast(response.status, response.mensagem);
            this.router.navigate(['/ordem-servico']);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
          this.router.navigate(['/ordem-servico']);
        }
      );
  }

  /**
   * addProduct
   * @param product?: ProductResponse
   */
  public addProduct(product?: ProductResponse): void {
    (this.form.controls.products as FormArray).push(this.createProduct(product));
  }

  /**
   * removeProduct
   * @param index: number
   */
  public removeProduct(index: number): void {
    (this.form.controls.products as FormArray).removeAt(index);
  }

  /**
   * createProduct
   * @param product?: ProductResponse
   */
  private createProduct(product?: ProductResponse): FormGroup {
    return new FormGroup({
      name:     new FormControl(product ? product.nome : null, [ Validators.required, Validators.maxLength(100) ]),
      value:    new FormControl(
        product ? product.valor.toFixed(2).replace('.', ',') : null,
        [ Validators.required, Validators.maxLength(10), Validators.pattern(PRICE_REGEXP)]
      ),
      quantity: new FormControl(
        product ? product.quantidade : null,
        [ Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]*') ]
      )
    });
  }

  /**
   * addService
   * @param service?: ServiceResponse
   */
  public addService(service?: ServiceResponse): void {
    (this.form.controls.services as FormArray).push(this.createService(service));
  }

  /**
   * removeService
   * @param index: number
   */
  public removeService(index: number): void {
    (this.form.controls.services as FormArray).removeAt(index);
  }

  /**
   * createService
   * @param service?: ServiceResponse
   */
  private createService(service?: ServiceResponse): FormGroup {
    return new FormGroup({
      serviceType:  new FormControl(service ? service.tipoServico.id : null, [ Validators.required ]),
      name:         new FormControl(service ? service.descricao : null, [ Validators.required, Validators.maxLength(100) ]),
      timeSpent:    new FormControl(service ? service.tempoGasto : null, [ Validators.required, Validators.maxLength(8) ]),
    });
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const products: Array<Product> = new Array();
    const services: Array<Service> = new Array();
    const scheduleId: DefaultId = new DefaultId(
      this.form.controls.schedule.value
    );
    for (const product of this.form.controls.products.value) {
      products.push(new Product(
        product.name,
        product.value.replace(',', '.'),
        product.quantity
      ));
    }
    for (const service of this.form.controls.services.value) {
      services.push(new Service(
        service.name,
        service.timeSpent,
        new DefaultId(
          service.serviceType
        )
      ));
    }
    const serviceOrder: ServiceOrder = new ServiceOrder(
      this.form.controls.labor.value.replace(',', '.'),
      this.form.controls.description.value,
      this.datePickerFormatter.formatToAPI(this.form.controls.date.value),
      this.form.controls.hour.value,
      'P',
      scheduleId,
      products,
      services
    );

    this.serviceOrderService.sendServiceOrder(serviceOrder, this.form.controls.id.value)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ServiceOrderResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.router.navigate(['/ordem-servico']);
        },
        (err: HttpErrorResponse) => {
          this.blockSend = false;
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

}
