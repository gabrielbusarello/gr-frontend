import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

import { WorkToolService } from '../../services/work-tools.service';
import { UtilsService } from 'src/app/services/utils.service';

import { WorkToolResponse } from 'src/app/shared/work-tool.model';
import { DefaultResponse } from 'src/app/shared/app.model';

@Component({
  selector: 'app-work-tools',
  templateUrl: './work-tools.component.html',
  styleUrls: ['./work-tools.component.sass'],
  providers: [ WorkToolService ]
})
export class WorkToolsComponent implements OnInit {

  public workTools: Array<WorkToolResponse>;

  constructor( private workToolService: WorkToolService, private modalService: NgbModal, private utils: UtilsService ) { }

  ngOnInit() {
    this.getWorkTools();
  }

  private getWorkTools(): void {
    this.workToolService.getWorkTools()
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<Array<WorkToolResponse>>) => {
          this.workTools = response.data;

          if (response.status !== 1) {
            this.utils.showToast(response.status, response.mensagem);
            this.workTools = [];
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
        this.workToolService.deleteWorkTool(id)
          .subscribe(
            (response: DefaultResponse<WorkToolResponse>) => {
              this.utils.showToast(response.status, response.mensagem);
              this.getWorkTools();
            },
            (err: HttpErrorResponse) => {
              this.utils.showToast(err.error.status, err.error.mensagem || err.message);
            }
          );
      }
    }, () => {});
  }

}
