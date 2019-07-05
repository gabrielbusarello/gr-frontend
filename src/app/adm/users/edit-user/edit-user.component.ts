import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import User, { UserResponse } from 'src/app/shared/user.model';
import { DefaultResponse } from 'src/app/shared/app.model';

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

  constructor( private route: ActivatedRoute, private userService: UserService, private router: Router ) { }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.new = false;
        this.form.controls.id.setValue(param.id, {onlySelf: true});
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
    this.userService.getUserById(id).subscribe(
      (response: DefaultResponse<UserResponse>) => {
        this.form.controls.id.setValue(response.data.id, { onlySelf: true });
        this.form.controls.cpf.setValue(response.data.cpf, { onlySelf: true });
        this.form.controls.name.setValue(response.data.nome, { onlySelf: true });
        this.form.controls.email.setValue(response.data.email, { onlySelf: true });
        this.form.controls.password.setValue(response.data.senha, { onlySelf: true });
        this.form.controls.phone.setValue(response.data.telefone, { onlySelf: true });
        this.form.controls.permission.setValue(response.data.permissao, { onlySelf: true });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /**
   * send
   */
  public send(): void {
    this.blockSend = true;
    const user: User = new User(
      this.form.controls.cpf.value,
      this.form.controls.name.value,
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.form.controls.phone.value,
      this.form.controls.permission.value
    );

    this.userService.sendUser(user, this.form.controls.id.value).subscribe(
      (response: UserResponse) => {
        console.log(response);
        this.router.navigate(['/usuarios']);
      },
      (err: any) => {
        this.blockSend = false;
        console.log(err);
      }
    );
  }

}
