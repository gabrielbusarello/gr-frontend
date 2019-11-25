import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { ScheduleService } from 'src/app/services/schedule.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ScheduleResponse, AdmitSchedule } from 'src/app/shared/schedule.model';
import { DefaultResponse, DefaultId } from 'src/app/shared/app.model';
import { ChatComponent } from '../chat/chat.component';

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
    A: 'Assumido',
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
   * admit
   * @param id: number
   */
  public admit(id: number) {
    const scheduleId: DefaultId = new DefaultId(
      Number.parseInt(localStorage.getItem('idUsuario'), 10)
    );
    const admit: AdmitSchedule = new AdmitSchedule(
      'A',
      scheduleId
    );

    this.scheduleService.admitSchedule(id, admit)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<ScheduleResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.getSchedules();
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
          this.getSchedules();
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

  /**
   * chat
   * @param id: number
   */
  public chat(id: number) {
    const modal = this.modalService.open(ChatComponent, { centered: true, size: 'lg' });
    modal.componentInstance.idSchedule = id;
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
