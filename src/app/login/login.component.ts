import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { DefaultResponse } from '../shared/app.model';
import { UserResponse } from '../shared/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    cpf: new FormControl(null, [ Validators.required ]),
    pass: new FormControl(null, [ Validators.required ])
  });

  public mensagemErro: string;
  private blockSend: boolean;

  constructor( private userService: UserService, private router: Router, private utils: UtilsService ) { }

  ngOnInit() {
  }

  public login() {
    this.blockSend = true;
    this.userService.authUser(this.form.controls.cpf.value, this.form.controls.pass.value).subscribe(
      (response: DefaultResponse<UserResponse>) => {
        localStorage.setItem('idUsuario', response.data.id.toString());
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        this.utils.showToast(3, err.message);
        this.blockSend = false;
      }
    );
  }

}
