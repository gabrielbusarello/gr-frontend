import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { ScheduleService } from 'src/app/services/schedule.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ScheduleResponse } from 'src/app/shared/schedule.model';
import { DefaultResponse } from 'src/app/shared/app.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass'],
  providers: [ ScheduleService ]
})
export class ScheduleComponent implements OnInit {

  public schedules: Array<ScheduleResponse>;

  constructor( private scheduleService: ScheduleService, private modalService: NgbModal, private utils: UtilsService ) { }

  public status: any = {
    P: 'Pendente',
    F: 'Finalizado',
    C: 'Cancelado'
  };

  ngOnInit() {
    this.getSchedules();
  }

  /**
   * getSchedules
   */
  private getSchedules(): void {
    this.scheduleService.getSchedules()
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<ScheduleResponse>>) => {
          this.schedules = response.data;

          if (response.status !== 1) {
            this.utils.showToast(response.status, response.mensagem);
            this.schedules = [];
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
        this.scheduleService.deleteSchedule(id)
          .subscribe(
            (response: DefaultResponse<ScheduleResponse>) => {
              this.utils.showToast(response.status, response.mensagem);
              this.getSchedules();
            },
            (err: HttpErrorResponse) => {
              this.utils.showToast(err.error.status, err.error.mensagem || err.message);
            }
          );
      }
    }, () => {});
  }

}
