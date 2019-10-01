import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { WorkToolService } from 'src/app/services/work-tools.service';
import WorkTool, { WorkToolResponse } from 'src/app/shared/work-tool.model';
import { DefaultResponse } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePickerFormatter } from 'src/app/shared/date-picker-formatter.util';

@Component({
  selector: 'app-edit-wt',
  templateUrl: './edit-wt.component.html',
  styleUrls: ['./edit-wt.component.sass'],
  providers: [ WorkToolService ]
})
export class EditWtComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({
    id:           new FormControl({ value: null, disabled: true }),
    name:         new FormControl(null, [ Validators.required, Validators.maxLength(100) ]),
    dtLastRepair: new FormControl(null, [ Validators.required, Validators.maxLength(10) ]),
    nextRepair:   new FormControl(null, [ Validators.required, Validators.maxLength(5) ]),
  });

  private subRoute: Subscription;
  public new: boolean;
  public blockSend: boolean;

  constructor(
    private route: ActivatedRoute,
    private workToolService: WorkToolService,
    private router: Router,
    private utils: UtilsService,
    private datePickerFormatter: DatePickerFormatter
  ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.new = false;
        this.getWorkToolById(param.id);
      } else {
        this.new = true;
      }
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  /**
   * getWorkToolById
   * @param id: number
   */
  private getWorkToolById(id: number): void {
    this.workToolService.getWorkToolById(id)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<WorkToolResponse>) => {
          if (response.status === 1) {
            this.form.controls.id.setValue(response.data.id, { onlySelf: true });
            this.form.controls.name.setValue(response.data.nome, { onlySelf: true });
            this.form.controls.dtLastRepair.setValue(
              this.datePickerFormatter.parseFromAPI(response.data.dtUltimoReparo.split('T')[0]),
              { onlySelf: true }
            );
            this.form.controls.nextRepair.setValue(response.data.proximoReparo, { onlySelf: true });
          } else {
            this.utils.showToast(response.status, response.mensagem);
            this.router.navigate(['/ferramentas']);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
          this.router.navigate(['/ferramentas']);
        }
      );
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const workTool: WorkTool = new WorkTool(
      this.form.controls.name.value,
      this.datePickerFormatter.formatToAPI(this.form.controls.dtLastRepair.value),
      this.form.controls.nextRepair.value,
    );

    this.workToolService.sendWorkTool(workTool, this.form.controls.id.value)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<WorkToolResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.router.navigate(['/ferramentas']);
        },
        (err: HttpErrorResponse) => {
          this.blockSend = false;
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

}
