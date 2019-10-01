import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import Schedule, { ScheduleResponse } from 'src/app/shared/schedule.model';
import { DefaultResponse } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePickerFormatter } from 'src/app/shared/date-picker-formatter.util';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.sass'],
  providers: [ ScheduleService ]
})
export class EditScheduleComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({
    id:           new FormControl({ value: null, disabled: true }),
    description:  new FormControl(null, [ Validators.required, Validators.maxLength(1000) ]),
    date:         new FormControl(null, [ Validators.required, Validators.maxLength(10) ]),
    hour:         new FormControl(null, [ Validators.required, Validators.maxLength(8) ]),
    address:      new FormControl(null, [ Validators.required ])
  });

  private subRoute: Subscription;
  public new: boolean;
  public blockSend: boolean;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private router: Router,
    private utils: UtilsService,
    private datePickerFormatter: DatePickerFormatter
  ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.new = false;
        this.getScheduleById(param.id);
      } else {
        this.new = true;
      }
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  /**
   * getScheduleById
   * @param id: number
   */
  private getScheduleById(id: number): void {
    this.scheduleService.getScheduleById(id)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ScheduleResponse>) => {
          if (response.status === 1) {
            this.form.controls.id.setValue(response.data.id, { onlySelf: true });
            this.form.controls.description.setValue(response.data.descricao, { onlySelf: true });
            this.form.controls.date.setValue(
              this.datePickerFormatter.parseFromAPI(response.data.data.split('T')[0]),
              { onlySelf: true }
            );
            this.form.controls.hour.setValue(response.data.hora, { onlySelf: true });
            this.form.controls.address.setValue(response.data.endereco.id, { onlySelf: true });
          } else {
            this.utils.showToast(response.status, response.mensagem);
            this.router.navigate(['/agendamento']);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
          this.router.navigate(['/agendamento']);
        }
      );
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const schedule: Schedule = new Schedule(
      this.form.controls.description.value,
      this.datePickerFormatter.formatToAPI(this.form.controls.date.value),
      this.form.controls.hour.value,
      'P',
      this.form.controls.address.value
    );

    this.scheduleService.sendSchedule(schedule, this.form.controls.id.value)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ScheduleResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.router.navigate(['/agendamento']);
        },
        (err: HttpErrorResponse) => {
          this.blockSend = false;
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

}
