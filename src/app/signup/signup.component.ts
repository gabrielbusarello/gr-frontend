import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import User, { UserResponse } from '../shared/user.model';
import { UtilsService } from '../services/utils.service';
import { DefaultResponse } from '../shared/app.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public permissions: Array<{ id: string, value: string }> = [
    { id: 'P', value: 'Prestador' },
    { id: 'C', value: 'Cliente' }
  ];

  public form: FormGroup = new FormGroup({
    cpf:        new FormControl(null, [ Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]*') ]),
    name:       new FormControl(null, [ Validators.required, Validators.maxLength(100) ]),
    email:      new FormControl(null, [ Validators.required, Validators.email, Validators.maxLength(70) ]),
    password:   new FormControl(null, [ Validators.required, Validators.maxLength(20) ]),
    phone:      new FormControl(null, [ Validators.maxLength(11) ]),
    permission: new FormControl(null, [ Validators.required ])
  });

  public blockSend: boolean;

  constructor( private authenticationService: AuthenticationService, private router: Router, private utils: UtilsService ) { }

  ngOnInit() {
  }

  public signup(): void {
    this.blockSend = true;
    const user: User = new User(
      this.form.controls.cpf.value,
      this.form.controls.name.value,
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.form.controls.phone.value,
      this.form.controls.permission.value
    );

    this.authenticationService.registerUser(user)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<UserResponse>) => {
          this.utils.showToast(response.status, response.mensagem);
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(3, err.message);
          this.blockSend = false;
        }
      );
  }

}
