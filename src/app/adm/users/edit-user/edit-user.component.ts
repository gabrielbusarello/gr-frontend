import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { UserService } from 'src/app/services/user.service';
import User, { UserResponse } from 'src/app/shared/user.model';
import { DefaultResponse } from 'src/app/shared/app.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass'],
  providers: [ UserService ]
})
export class EditUserComponent implements OnInit, OnDestroy {

  public permissions: Array<{ id: string, value: string }> = [
    { id: 'I', value: 'Interno' },
    { id: 'P', value: 'Prestador' },
    { id: 'C', value: 'Cliente' }
  ];

  public form: FormGroup = new FormGroup({
    id:         new FormControl({ value: null, disabled: true }),
    cpf:        new FormControl(null, [ Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]*') ]),
    name:       new FormControl(null, [ Validators.required, Validators.maxLength(100) ]),
    email:      new FormControl(null, [ Validators.required, Validators.email, Validators.maxLength(70) ]),
    password:   new FormControl(null, [ Validators.required, Validators.maxLength(20) ]),
    phone:      new FormControl(null, [ Validators.maxLength(11) ]),
    permission: new FormControl(null, [ Validators.required ])
  });

  private subRoute: Subscription;
  public new: boolean;
  public blockSend: boolean;

  constructor( private route: ActivatedRoute, private userService: UserService, private router: Router, private utils: UtilsService ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.new = false;
        this.form.controls.id.setValue(param.id, {onlySelf: true});
        this.form.controls.cpf.disable();
        this.form.controls.password.setValidators([]);
        this.getUserById(param.id);
      } else {
        this.new = true;
      }
    });
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  private getUserById(id: number): void {
    this.userService.getUserById(id)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<UserResponse>) => {
          if (response.status === 1) {
            this.form.controls.id.setValue(response.data.id, { onlySelf: true });
            this.form.controls.cpf.setValue(response.data.cpf, { onlySelf: true });
            this.form.controls.name.setValue(response.data.nome, { onlySelf: true });
            this.form.controls.email.setValue(response.data.email, { onlySelf: true });
            this.form.controls.phone.setValue(response.data.telefone, { onlySelf: true });
            this.form.controls.permission.setValue(response.data.permissao, { onlySelf: true });
          } else {
            this.utils.showToast(response.status, response.mensagem);
            this.router.navigate(['/usuarios']);
          }
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
          this.router.navigate(['/usuarios']);
        }
      );
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const user: User = new User(
      this.new ? this.form.controls.cpf.value : null,
      this.form.controls.name.value,
      this.form.controls.email.value,
      this.new ? this.form.controls.password.value : null,
      this.form.controls.phone.value,
      this.form.controls.permission.value
    );

    this.userService.sendUser(user, this.form.controls.id.value)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<UserResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.router.navigate(['/usuarios']);
        },
        (err: HttpErrorResponse) => {
          this.blockSend = false;
          this.utils.showToast(err.error.status, err.error.mensagem || err.message);
        }
      );
  }

}
