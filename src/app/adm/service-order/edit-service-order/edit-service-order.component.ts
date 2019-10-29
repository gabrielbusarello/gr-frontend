import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ServiceOrderService } from 'src/app/services/service-order.service';
import ServiceOrder, { Product, Service, ServiceOrderResponse } from 'src/app/shared/service-order.model';
import { DefaultResponse, PRICE_REGEXP, DefaultId } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePickerFormatter } from 'src/app/shared/date-picker-formatter.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleFilter, ScheduleResponse } from 'src/app/shared/schedule.model';

@Component({
  selector: 'app-edit-service-order',
  templateUrl: './edit-service-order.component.html',
  styleUrls: ['./edit-service-order.component.sass'],
  providers: [ ServiceOrderService, ScheduleService ]
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

  constructor(
    private route: ActivatedRoute,
    private serviceOrderService: ServiceOrderService,
    private scheduleService: ScheduleService,
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
            this.form.controls.labor.setValue(response.data.maoDeObra);
            this.form.controls.description.setValue(response.data.descricao, { onlySelf: true });
            this.form.controls.date.setValue(
              this.datePickerFormatter.parseFromAPI(response.data.data.split('T')[0]),
              { onlySelf: true }
            );
            this.form.controls.hour.setValue(response.data.hora, { onlySelf: true });
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
   * send
   */
  public send(): void {
    this.blockSend = true;
    const products: Array<Product> = new Array();
    const services: Array<Service> = new Array();
    const scheduleId: DefaultId = new DefaultId(
      this.form.controls.schedule.value
    );
    // const product: Product = new Product(

    // );
    // const service: Service = new Service(

    // );
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
