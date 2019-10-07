import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UtilsService } from '../services/utils.service';
import { DefaultResponse } from '../shared/app.model';
import { AuthResponse } from '../shared/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    cpf: new FormControl(null, [ Validators.required ]),
    pass: new FormControl(null, [ Validators.required ])
  });

  public mensagemErro: string;
  public blockSend: boolean;

  constructor( private authenticationService: AuthenticationService, private router: Router, private utils: UtilsService ) { }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  public login() {
    this.blockSend = true;
    this.authenticationService.authUser(this.form.controls.cpf.value, this.form.controls.pass.value)
      .pipe(take(1))
      .subscribe(
        (response: DefaultResponse<AuthResponse>) => {
          localStorage.setItem('token', 'Bearer ' + response.data.token);
          localStorage.setItem('idUsuario', response.data.usuario.id.toString());
          localStorage.setItem('nomeUsuario', response.data.usuario.nome);
          localStorage.setItem('emailUsuario', response.data.usuario.email);
          localStorage.setItem('cpf', response.data.usuario.cpf);
          localStorage.setItem('permissao', response.data.usuario.permissao);
          localStorage.setItem('endereco', JSON.stringify(response.data.usuario.endereco));
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.utils.showToast(3, 'Usuário ou senha incorretos');
          this.blockSend = false;
        }
      );
  }

}
